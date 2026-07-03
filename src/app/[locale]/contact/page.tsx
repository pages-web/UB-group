"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { useMutation } from "@apollo/client/react";
import { useTranslations } from "next-intl";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  User,
  FileText,
  Send,
  Check,
  AlertCircle,
  Loader2,
} from "lucide-react";
import { CmsContent } from "@/components/common/CmsContent";
import { useContactInfo } from "@/hooks/useContactInfo";
import { usePageBySlug } from "@/hooks/usePageBySlug";
import { WIDGETS_LEAD_CONNECT, WIDGETS_SAVE_LEAD } from "@/app/gql/mutations";

const getLink = (url?: string) =>
  url?.startsWith("http") ? url : url ? `https://${url}` : "#";

function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ---------------------------------------------------------------------------
// erxes lead-form wiring for the contact form — same pattern as the job
// application form, using the real IDs pulled from the formDetail query
// for the contact information form.
// ---------------------------------------------------------------------------
const CONTACT_FORM_CODE = "NG--el";
const CONTACT_CHANNEL_ID = "NacImkee_2sr0fDAf-Q85";
const FALLBACK_CONTACT_FORM_ID = "R0i1zq8Osp9t_PKxSJ1G6";

const CONTACT_FIELD_IDS = {
  name: "FmMtG_RcEkf6T4YeKelGk",
  email: "XGzlxkwgoBJ5FMcqTc1fv",
  phone: "Jmrisr738SJFVPEkhZWP3",
  subject: "E3qmHUAFq-xm5SELh-9ob",
  message: "QUCTki0WXM43nihef0Ljw",
} as const;

interface FormField {
  _id: string;
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
  _id: string;
  type: string;
  text: string;
  value: unknown;
}

function ContactFormWidget() {
  const t = useTranslations("contact");
  const [sent, setSent] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [connectForm, { data: connectData }] =
    useMutation<LeadConnectData>(WIDGETS_LEAD_CONNECT);
  const [saveLead, { loading: saving }] =
    useMutation<SaveLeadData>(WIDGETS_SAVE_LEAD);

  useEffect(() => {
    connectForm({
      variables: {
        channelId: CONTACT_CHANNEL_ID,
        formCode: CONTACT_FORM_CODE,
      },
    }).catch(() => undefined);
  }, [connectForm]);

  const erxesForm = connectData?.widgetsLeadConnect?.form;
  const erxesFields: FormField[] = useMemo(
    () => erxesForm?.fields ?? [],
    [erxesForm?.fields],
  );

  const updateField = (key: keyof typeof form, value: string) => {
    setForm((current) => ({ ...current, [key]: value }));
  };

  const getField = (
    id: string,
    fallbackText: string,
    fallbackType = "text",
  ) => {
    const field = erxesFields.find((item) => item._id === id);
    return {
      _id: field?._id ?? id,
      text: field?.text?.trim() || fallbackText,
      type: field?.type || fallbackType,
    };
  };

  const createSubmission = (
    id: string,
    fallbackText: string,
    value: unknown,
    fallbackType = "text",
  ): FieldValueInput => {
    const field = getField(id, fallbackText, fallbackType);
    return {
      _id: field._id,
      type: field.type,
      text: field.text,
      value,
    };
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitError("");

    try {
      const result = await saveLead({
        variables: {
          formId: erxesForm?._id ?? FALLBACK_CONTACT_FORM_ID,
          submissions: [
            createSubmission(
              CONTACT_FIELD_IDS.name,
              t("form.name"),
              form.name,
            ),
            createSubmission(
              CONTACT_FIELD_IDS.email,
              t("form.email"),
              form.email,
            ),
            createSubmission(
              CONTACT_FIELD_IDS.phone,
              t("form.phone"),
              form.phone,
            ),
            createSubmission(
              CONTACT_FIELD_IDS.subject,
              t("form.subject"),
              form.subject,
            ),
            createSubmission(
              CONTACT_FIELD_IDS.message,
              t("form.message"),
              form.message,
              "textarea",
            ),
          ],
          browserInfo: {
            url: window.location.pathname + window.location.search,
            hostname: window.location.origin,
            language: navigator.language,
            userAgent: navigator.userAgent,
          },
        },
      });

      const response = result.data?.widgetsSaveLead;
      if (response?.status === "error") {
        setSubmitError(
          response.errors?.[0]?.text ||
            t("sendError"),
        );
        return;
      }

      setSent(true);
    } catch {
      setSubmitError(t("sendError"));
    }
  };

  return (
    <div className="bg-[#F0F4F8] border border-[#E2E8F0] rounded-2xl p-5 lg:p-4 shadow-sm">
      {sent ? (
        <div className="flex flex-col items-center py-12 text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#EC6707]/10">
            <Check className="h-8 w-8 text-[#EC6707]" />
          </div>
          <p className="mt-4 font-medium text-[#000000]">{t("sent")}</p>
          <p className="text-sm text-[#64748B]">
            {t("weWillContact")}
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-sm text-[#64748B] mb-2 block">
                {t("form.name")}
              </label>
              <div className="relative">
                <User
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-[#94A3B8]"
                />
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => updateField("name", e.target.value)}
                  placeholder={t("form.namePlaceholder")}
                  className="w-full pl-11 pr-4 py-3 bg-white border border-[#E2E8F0] rounded-lg focus:outline-none focus:border-[#EC6707] text-[15px]"
                />
              </div>
            </div>
            <div>
              <label className="text-sm text-[#64748B] mb-2 block">
                {t("form.email")}
              </label>
              <div className="relative">
                <Mail
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-[#94A3B8]"
                />
                <input
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => updateField("email", e.target.value)}
                  placeholder={t("form.emailPlaceholder")}
                  className="w-full pl-11 pr-4 py-3 bg-white border border-[#E2E8F0] rounded-lg focus:outline-none focus:border-[#EC6707] text-[15px]"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-sm text-[#64748B] mb-2 block">
                {t("form.phone")}
              </label>
              <div className="relative">
                <Phone
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-[#94A3B8]"
                />
                <input
                  type="tel"
                  required
                  value={form.phone}
                  onChange={(e) => updateField("phone", e.target.value)}
                  placeholder={t("form.phonePlaceholder")}
                  className="w-full pl-11 pr-4 py-3 bg-white border border-[#E2E8F0] rounded-lg focus:outline-none focus:border-[#EC6707] text-[15px]"
                />
              </div>
            </div>
            <div>
              <label className="text-sm text-[#64748B] mb-2 block">
                {t("form.subject")}
              </label>
              <div className="relative">
                <FileText
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-[#94A3B8]"
                />
                <input
                  type="text"
                  required
                  value={form.subject}
                  onChange={(e) => updateField("subject", e.target.value)}
                  placeholder={t("form.subjectPlaceholder")}
                  className="w-full pl-11 pr-4 py-3 bg-white border border-[#E2E8F0] rounded-lg focus:outline-none focus:border-[#EC6707] text-[15px]"
                />
              </div>
            </div>
          </div>

          <div>
            <label className="text-sm text-[#64748B] mb-2 block">
              {t("form.message")}
            </label>
            <textarea
              rows={5}
              required
              value={form.message}
              onChange={(e) => updateField("message", e.target.value)}
              placeholder={t("form.messagePlaceholder")}
              className="w-full px-4 py-3 bg-white border border-[#E2E8F0] rounded-lg focus:outline-none focus:border-[#EC6707] text-[15px] resize-none"
            />
          </div>

          {submitError && (
            <div className="flex items-start gap-2 rounded-lg border border-red-300 bg-red-50 px-3 py-2 text-sm text-red-600">
              <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
              <span>{submitError}</span>
            </div>
          )}

          <button
            type="submit"
            disabled={saving}
            className="w-full flex items-center justify-center gap-2 px-8 py-4 bg-[#EC6707] text-white font-semibold rounded-lg hover:bg-[#B35405] transition-colors disabled:cursor-not-allowed disabled:opacity-70"
          >
            {saving ? (
              <Loader2 size={18} className="animate-spin" />
            ) : (
              <Send size={18} />
            )}
            {t("form.submit")}
          </button>
        </form>
      )}
    </div>
  );
}

export default function ContactPage() {
  const t = useTranslations("contact");
  const commonT = useTranslations("common");
  const { contactInfo } = useContactInfo();
  const { page } = usePageBySlug("contact");
  const noDataText = commonT("noData");

  return (
    <>
      {/* HERO */}
      <section className="relative w-full py-16 lg:py-20 overflow-hidden bg-[#000000]">
        {page?.thumbnail?.url && (
          <div
            className="absolute inset-0 bg-cover bg-center opacity-10"
            style={{ backgroundImage: `url('${page.thumbnail.url}')` }}
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-[#000000]/80 via-[#000000]/60 to-[#000000]/80" />
        <div className="relative mx-auto max-w-7xl px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <h1 className="text-4xl lg:text-6xl font-bold text-white leading-tight mb-6 tracking-tight">
              {page?.name || noDataText}
            </h1>
            <CmsContent
              html={page?.description || noDataText}
              className="mx-auto max-w-xl text-lg text-white/60 [&_p]:text-lg [&_p]:text-white/60 [&_p]:leading-relaxed"
            />
          </motion.div>
        </div>
      </section>

      {/* CONTACT CONTENT */}
      <section className="w-full py-24 bg-[#F0F4F8]">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Info */}
            <Reveal>
              <div className="bg-[#F0F4F8] border border-[#E2E8F0] rounded-2xl p-5 lg:p-4 shadow-sm">
                <div>
                  <span className="text-[11px] font-semibold tracking-[0.2em] text-[#EC6707] uppercase mb-5 block">
                    {t("info")}
                  </span>
                  <p className="text-[15px] text-[#334155] leading-relaxed mb-5">
                    {t("intro")}
                  </p>
                </div>

                <div className="space-y-8">
                  <div className="flex items-start gap-5 p-4 rounded-xl hover:bg-[#E8EEF4] transition-colors duration-300">
                    <div className="w-12 h-12 rounded-xl bg-[#F5F3ED] flex items-center justify-center shrink-0">
                      <Mail
                        className="w-5 h-5 text-[#EC6707]"
                        strokeWidth={1.5}
                      />
                    </div>
                    <div>
                      <p className="text-[11px] text-[#64748B] tracking-wider uppercase mb-2">
                        {t("email")}
                      </p>
                      <p className="text-[#000000] text-[15px]">
                        {contactInfo?.email || noDataText}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-5 p-4 rounded-xl hover:bg-[#E8EEF4] transition-colors duration-300">
                    <div className="w-12 h-12 rounded-xl bg-[#F5F3ED] flex items-center justify-center shrink-0">
                      <Phone
                        className="w-5 h-5 text-[#EC6707]"
                        strokeWidth={1.5}
                      />
                    </div>
                    <div>
                      <p className="text-[11px] text-[#64748B] tracking-wider uppercase mb-2">
                        {t("phone")}
                      </p>
                      <p className="text-[#000000] text-[15px]">
                        {contactInfo?.phone || noDataText}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-5 p-4 rounded-xl hover:bg-[#E8EEF4] transition-colors duration-300">
                    <div className="w-12 h-12 rounded-xl bg-[#F5F3ED] flex items-center justify-center shrink-0">
                      <MapPin
                        className="w-5 h-5 text-[#EC6707]"
                        strokeWidth={1.5}
                      />
                    </div>
                    <div>
                      <p className="text-[11px] text-[#64748B] tracking-wider uppercase mb-2">
                        {t("address")}
                      </p>
                      <p className="text-[#000000] text-[15px]">
                        {contactInfo?.location || noDataText}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-5 p-4 rounded-xl hover:bg-[#E8EEF4] transition-colors duration-300">
                    <div className="w-12 h-12 rounded-xl bg-[#F5F3ED] flex items-center justify-center shrink-0">
                      <Clock
                        className="w-5 h-5 text-[#EC6707]"
                        strokeWidth={1.5}
                      />
                    </div>
                    <div>
                      <p className="text-[11px] text-[#64748B] tracking-wider uppercase mb-2">
                        {t("hours")}
                      </p>
                      <p className="text-[#000000] text-[15px]">
                        {contactInfo?.hours || noDataText}
                      </p>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl hover:bg-[#E8EEF4] transition-colors duration-300">
                    <p className="text-[11px] text-[#64748B] tracking-wider uppercase mb-3">
                      {t("social")}
                    </p>
                    <div className="flex flex-wrap gap-3 text-[15px] text-[#000000]">
                      <a
                        href={getLink(contactInfo?.facebook)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-[#EC6707] transition-colors"
                      >
                        {contactInfo?.facebook || noDataText}
                      </a>
                      <a
                        href={getLink(contactInfo?.instagram)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-[#EC6707] transition-colors"
                      >
                        {contactInfo?.instagram || noDataText}
                      </a>
                      <a
                        href={getLink(contactInfo?.youtube)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-[#EC6707] transition-colors"
                      >
                        {contactInfo?.youtube || noDataText}
                      </a>
                      <a
                        href={getLink(contactInfo?.linkedin)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-[#EC6707] transition-colors"
                      >
                        {contactInfo?.linkedin || noDataText}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>

            {/* Contact Form — migrated from erxes script embed to Apollo useMutation */}
            <Reveal delay={0.2}>
              <ContactFormWidget />
            </Reveal>
          </div>
        </div>
      </section>

      {/* MAP */}
      <section className="w-full py-24 bg-[#E8EEF4]">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <Reveal>
            <div className="relative h-[400px] bg-[#E2E8F0] rounded-xl overflow-hidden">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d21376.48181839523!2d106.9052!3d47.9185!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDfCsDU1JzA2LjYiTiAxMDbCsDU0JzE4LjciRQ!5e0!3m2!1sen!2smn!4v1"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
