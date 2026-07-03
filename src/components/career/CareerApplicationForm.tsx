"use client";

import { ChangeEvent, FormEvent, useEffect, useMemo, useState } from "react";
import { useMutation } from "@apollo/client/react";
import { AlertCircle, Check, Loader2, Upload, ArrowLeft, Send } from "lucide-react";
import { useTranslations } from "next-intl";
import { WIDGETS_LEAD_CONNECT, WIDGETS_SAVE_LEAD } from "@/app/gql/mutations";

// ─── Constants ───────────────────────────────────────────────────────────────

const CAREER_FORM_CODE   = "yW28q4";
const CAREER_CHANNEL_ID  = "aE8EFNS3KqsYLZCoM-_So";
const FALLBACK_FORM_ID   = "TXAVWR-7v28_zenKPMtaA";

const FIELD_IDS = {
  fullName:              "mZ0XF8U_iO7rTP6IiKI5W",
  phone:                 "sBPqMXMZzgXnRt8wT2acH",
  position:              "B3v-c64zeFpX5O3zI2Pd5",
  experience:            "b_Vt6gsPIhLeKWY4tc0e4",
  motivation:            "5Ek64DTqKwer7XV8ZyOkg",
  cv:                    "KQdPC5bQmwivl28_1dsr6",
  companyContext:        "context_company",
  employmentTypeContext: "context_employment_type",
} as const;

// ─── Types ───────────────────────────────────────────────────────────────────

export interface VacancyApplicationContext {
  company:        string;
  position:       string;
  employmentType: string;
}

interface FormField {
  _id:  string;
  text: string;
  type: string;
}

interface LeadConnectData {
  widgetsLeadConnect?: {
    form?: {
      _id: string;
      fields?: FormField[];
    };
  };
}

interface SaveLeadData {
  widgetsSaveLead?: {
    status?: string;
    errors?: { text?: string }[];
  };
}

interface FieldValueInput {
  _id:   string;
  type:  string;
  text:  string;
  value: unknown;
}

// ─── Component ───────────────────────────────────────────────────────────────

interface Props {
  applicationContext: VacancyApplicationContext | null;
  onBack?: () => void;
}

export function CareerApplicationForm({ applicationContext, onBack }: Props) {
  const t = useTranslations("career");
  const [submitted, setSubmitted]       = useState(false);
  const [submitError, setSubmitError]   = useState("");
  const [cvFiles, setCvFiles]           = useState<File[]>([]);
  const [form, setForm] = useState({
    fullName:       "",
    phone:          "",
    experience:     "",
    motivation:     "",
    company:        "",
    position:       "",
    employmentType: "",
  });

  const [connectForm, { data: connectData }] =
    useMutation<LeadConnectData>(WIDGETS_LEAD_CONNECT);
  const [saveLead,    { loading: saving }] =
    useMutation<SaveLeadData>(WIDGETS_SAVE_LEAD);

  // 1️⃣  Handshake — fetch the live erxes form schema once on mount
  useEffect(() => {
    connectForm({
      variables: {
        channelId: CAREER_CHANNEL_ID,
        formCode:  CAREER_FORM_CODE,
      },
    }).catch(() => undefined);
  }, [connectForm]);

  // Pre-fill context fields whenever a job card context changes.
  /* eslint-disable react-hooks/set-state-in-effect */
  useEffect(() => {
    setSubmitted(false);
    setSubmitError("");
    setCvFiles([]);
    setForm((prev) => ({
      ...prev,
      company:        applicationContext?.company        ?? "",
      position:       applicationContext?.position       ?? "",
      employmentType: applicationContext?.employmentType ?? "",
    }));
  }, [applicationContext]);
  /* eslint-enable react-hooks/set-state-in-effect */

  const erxesForm                         = connectData?.widgetsLeadConnect?.form;
  const erxesFields: FormField[]          = useMemo(() => erxesForm?.fields ?? [], [erxesForm]);

  const update = (key: string, value: string) =>
    setForm((f) => ({ ...f, [key]: value }));

  // Resolve a field: use live erxes data when available, fall back to constants
  const getField = (id: string, fallbackText: string, fallbackType = "text") => {
    const found = erxesFields.find((f) => f._id === id);
    return {
      _id:  found?._id  ?? id,
      text: found?.text?.trim() || fallbackText,
      type: found?.type || fallbackType,
    };
  };

  const makeSubmission = (
    id:           string,
    fallbackText: string,
    value:        unknown,
    fallbackType  = "text",
  ): FieldValueInput => {
    const field = getField(id, fallbackText, fallbackType);
    return { _id: field._id, type: field.type, text: field.text, value };
  };

  // 3️⃣  Upload CV files to erxes file endpoint before submitting
  const uploadFiles = async (): Promise<string[]> => {
    if (cvFiles.length === 0) return [];

    const graphqlUrl = process.env.NEXT_PUBLIC_GRAPHQL_URL ?? "/graphql";
    const uploadUrl  = graphqlUrl.replace(/\/graphql$/, "/upload-file");
    const urls: string[] = [];

    for (const file of cvFiles) {
      const body = new FormData();
      body.append("file", file);

      const res = await fetch(
        `${uploadUrl}?kind=main&maxHeight=0&maxWidth=0`,
        { method: "POST", body, credentials: "include" },
      );
      if (!res.ok) throw new Error(t("uploadError"));
      const url = await res.text();
      if (url) urls.push(url);
    }

    return urls;
  };

  // 4️⃣  Build submissions array and call widgetsSaveLead
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitError("");

    try {
      const cvUrls = await uploadFiles();

      const submissions: FieldValueInput[] = [
        makeSubmission(FIELD_IDS.fullName, t("fullName"), form.fullName),
        makeSubmission(FIELD_IDS.phone, t("phone"), form.phone),
        makeSubmission(
          FIELD_IDS.position,
          t("position"),
          form.position || applicationContext?.position || "",
        ),
        makeSubmission(FIELD_IDS.experience, t("experience"), form.experience, "textarea"),
        makeSubmission(FIELD_IDS.motivation, t("motivation"), form.motivation, "textarea"),
        makeSubmission(FIELD_IDS.cv, t("uploadCv"), cvUrls, "file"),
      ];

      if (applicationContext) {
        submissions.push(
          makeSubmission(FIELD_IDS.companyContext, t("company"), form.company),
          makeSubmission(FIELD_IDS.employmentTypeContext, t("employmentType"), form.employmentType),
        );
      }

      const result = await saveLead({
        variables: {
          formId:      erxesForm?._id ?? FALLBACK_FORM_ID,
          submissions,
          browserInfo: {
            url:       window.location.pathname + window.location.search,
            hostname:  window.location.origin,
            language:  navigator.language,
            userAgent: navigator.userAgent,
          },
        },
      });

      const response = result.data?.widgetsSaveLead;
      if (response?.status === "error") {
        setSubmitError(response.errors?.[0]?.text || t("applicationError"));
        return;
      }

      setSubmitted(true);
    } catch {
      setSubmitError(t("applicationError"));
    }
  };

  // ── Success screen ──────────────────────────────────────────────────────────
  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center rounded-2xl bg-[#F0F4F8] border border-[#E2E8F0] p-12 text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100 mb-4">
          <Check className="h-8 w-8 text-green-600" />
        </div>
        <h3 className="text-xl font-bold text-[#000000] mb-2">
          {t("applicationSentWithPunctuation")}
        </h3>
        <p className="text-[#64748B] text-sm">{t("applicationReceived")}</p>
        {onBack && (
          <button
            onClick={onBack}
            className="mt-6 inline-flex items-center gap-2 px-5 py-2.5 bg-[#EC6707] text-white text-sm font-medium rounded-lg hover:bg-[#B35405] transition-colors"
          >
            <ArrowLeft size={15} />
            {t("back")}
          </button>
        )}
      </div>
    );
  }

  // ── Form ────────────────────────────────────────────────────────────────────
  return (
    <form
      onSubmit={handleSubmit}
      className="bg-[#E8EEF4] rounded-2xl p-6 lg:p-8 border border-[#E2E8F0] space-y-5"
    >
      {/* Context fields (read-only) — shown only when a job card is selected */}
      {applicationContext && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="text-sm text-[#64748B] mb-1.5 block font-medium">
              {t("company")}
            </label>
            <input
              readOnly
              value={form.company}
              className="w-full px-4 py-3 bg-[#F0F4F8] border border-[#E2E8F0] rounded-lg text-[#64748B] text-sm outline-none"
            />
          </div>
          <div>
            <label className="text-sm text-[#64748B] mb-1.5 block font-medium">
              {t("employmentType")}
            </label>
            <input
              readOnly
              value={form.employmentType}
              className="w-full px-4 py-3 bg-[#F0F4F8] border border-[#E2E8F0] rounded-lg text-[#64748B] text-sm outline-none"
            />
          </div>
          <div className="sm:col-span-2">
            <label className="text-sm text-[#64748B] mb-1.5 block font-medium">
              {t("position")}
            </label>
            <input
              readOnly
              value={form.position}
              className="w-full px-4 py-3 bg-[#F0F4F8] border border-[#E2E8F0] rounded-lg text-[#64748B] text-sm outline-none"
            />
          </div>
        </div>
      )}

      {/* User fields */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="text-sm text-[#64748B] mb-1.5 block font-medium">
            {t("fullName")} <span className="text-[#EC6707]">*</span>
          </label>
          <input
            type="text"
            required
            value={form.fullName}
            onChange={(e) => update("fullName", e.target.value)}
            placeholder={t("fullNamePlaceholder")}
            className="w-full px-4 py-3 bg-[#F0F4F8] border border-[#E2E8F0] rounded-lg focus:outline-none focus:border-[#EC6707] text-sm"
          />
        </div>
        <div>
          <label className="text-sm text-[#64748B] mb-1.5 block font-medium">
            {t("phone")} <span className="text-[#EC6707]">*</span>
          </label>
          <input
            type="tel"
            required
            value={form.phone}
            onChange={(e) => update("phone", e.target.value)}
            placeholder={t("phonePlaceholder")}
            className="w-full px-4 py-3 bg-[#F0F4F8] border border-[#E2E8F0] rounded-lg focus:outline-none focus:border-[#EC6707] text-sm"
          />
        </div>
      </div>

      <div>
        <label className="text-sm text-[#64748B] mb-1.5 block font-medium">
          {t("experience")}
        </label>
        <textarea
          rows={3}
          value={form.experience}
          onChange={(e) => update("experience", e.target.value)}
          placeholder={t("experiencePlaceholder")}
          className="w-full px-4 py-3 bg-[#F0F4F8] border border-[#E2E8F0] rounded-lg focus:outline-none focus:border-[#EC6707] text-sm resize-none"
        />
      </div>

      <div>
        <label className="text-sm text-[#64748B] mb-1.5 block font-medium">
          {t("motivation")}
        </label>
        <textarea
          rows={3}
          value={form.motivation}
          onChange={(e) => update("motivation", e.target.value)}
          placeholder={t("shortIntroPlaceholder")}
          className="w-full px-4 py-3 bg-[#F0F4F8] border border-[#E2E8F0] rounded-lg focus:outline-none focus:border-[#EC6707] text-sm resize-none"
        />
      </div>

      {/* CV upload */}
      <div>
        <label className="text-sm text-[#64748B] mb-1.5 block font-medium">
          {t("attachCv")} <span className="text-[#EC6707]">*</span>
        </label>
        <label className="flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-[#E2E8F0] bg-[#F0F4F8] py-8 text-center cursor-pointer hover:border-[#EC6707] transition-colors">
          <Upload className="h-7 w-7 text-[#94A3B8] mb-2" />
          <span className="text-sm text-[#64748B]">
            {cvFiles.length > 0
              ? cvFiles.map((f) => f.name).join(", ")
              : t("uploadHint")}
          </span>
          <input
            type="file"
            className="sr-only"
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setCvFiles(Array.from(e.target.files ?? []))
            }
            multiple
          />
        </label>
      </div>

      {/* Error message */}
      {submitError && (
        <div className="flex items-start gap-2 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
          <span>{submitError}</span>
        </div>
      )}

      {/* Action buttons */}
      <div className={`grid gap-3 ${applicationContext && onBack ? "grid-cols-2" : "grid-cols-1"}`}>
        {applicationContext && onBack && (
          <button
            type="button"
            onClick={onBack}
            disabled={saving}
            className="w-full rounded-lg border border-[#E2E8F0] bg-[#F0F4F8] py-3 text-sm font-semibold text-[#334155] hover:bg-white transition-colors flex items-center justify-center gap-2"
          >
            <ArrowLeft size={15} />
            {t("back")}
          </button>
        )}
        <button
          type="submit"
          disabled={saving}
          className="w-full inline-flex items-center justify-center gap-2 rounded-lg bg-[#EC6707] py-3 text-sm font-semibold text-white hover:bg-[#B35405] transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send size={15} />}
          {t("apply")}
        </button>
      </div>
    </form>
  );
}
