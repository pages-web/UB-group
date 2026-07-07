"use client";

import { motion } from "framer-motion";
import { ChangeEvent, FormEvent, useEffect, useMemo, useState } from "react";
import { usePathname } from "next/navigation";
import { useMutation } from "@apollo/client/react";
import { useTranslations } from "next-intl";
import {
  ArrowRight,
  Send,
  Upload,
  MapPin,
  Briefcase,
  Clock,
  DollarSign,
  Calendar,
  User,
  Mail,
  Phone,
  FileText,
  Handshake,
  Check,
  AlertCircle,
  Loader2,
} from "lucide-react";
import {
  CP_CREATE_TICKET,
  WIDGETS_LEAD_CONNECT,
  WIDGETS_SAVE_LEAD,
} from "@/app/gql/mutations";
import { CmsContent } from "@/components/common/CmsContent";
import { useCmsPostsBySlug } from "@/hooks/useCmsPostsBySlug";
import { usePageBySlug } from "@/hooks/usePageBySlug";

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
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

const jobsCategorySlug = "ajlyn-bairuud";
const tendersCategorySlug = "tenderuud";
const APPLICATION_FORM_SECTION_ID = "application-form";
const TENDER_FORM_SECTION_ID = "tender-form";
const APPLICATION_FORM_CODE = "eVBVTM";
const APPLICATION_CHANNEL_ID = "NacImkee_2sr0fDAf-Q85";
const FALLBACK_APPLICATION_FORM_ID = "yjpnLGmwtde7R8en6yINI";

const APPLICATION_FIELD_IDS = {
  name: "UYBphOD2zyK7nPCi1khrb",
  email: "ZtnBsEhMD-OxMdEHRVRAm",
  phone: "67RCBmDiqTaelMdXueG8w",
  position: "olMuGw1h2gY-JpEv3X1Zj",
  message: "Kre8pvK7yY91J9PCCfrkw",
  cv: "aWnKK7-L_Vdu5-sqIKdcO",
} as const;

const TENDER_CHANNEL_ID = "NacImkee_2sr0fDAf-Q85";
const TENDER_PIPELINE_ID = "3TOmZGHrtVkpDr_tKTnnv";
const TENDER_STATUS_ID = "UNPYsbdo-zUL6juW9yb6v";

const formatDate = (date: string | undefined, locale: string, fallback: string) =>
  date
    ? new Date(date).toLocaleDateString(locale === "mn" ? "mn-MN" : "en-US", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      })
    : fallback;

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

interface TicketAttachmentInput {
  name: string;
  url: string;
  size: number;
  type: string;
  duration: number;
}

const createBlockParagraph = (text: string) => ({
  id:
    typeof crypto !== "undefined" && "randomUUID" in crypto
      ? crypto.randomUUID()
      : Math.random().toString(36).slice(2),
  type: "paragraph",
  props: {
    textColor: "default",
    backgroundColor: "default",
    textAlignment: "left",
  },
  content: text ? [{ type: "text", text, styles: {} }] : [],
  children: [],
});

export default function CareerPage() {
  const t = useTranslations("career");
  const commonT = useTranslations("common");
  const pathname = usePathname();
  const locale = pathname.split("/")[1] || "mn";
  const noDataText = commonT("noData");
  const allCompanies = commonT("all");
  const [activeCompany, setActiveCompany] = useState(allCompanies);
  const { page } = usePageBySlug("career");
  const { posts: jobPosts } = useCmsPostsBySlug(jobsCategorySlug);
  const { posts: tenderPosts } = useCmsPostsBySlug(tendersCategorySlug);

  const jobs = useMemo(
    () =>
      jobPosts.map((post) => {
        const jobInformation = post.customFieldsMap?.jobInformation as
          | {
              Company?: string;
              workingType?: string;
              salary?: string;
              ApplicationDeadline?: string;
            }
          | undefined;
        const [, location] = post.excerpt?.split(" · ") || [];

        return {
          id: post._id,
          title: post.title,
          company: jobInformation?.Company || noDataText,
          location: location || noDataText,
          type: jobInformation?.workingType || noDataText,
          salary: jobInformation?.salary || noDataText,
          deadline: formatDate(
            jobInformation?.ApplicationDeadline,
            locale,
            noDataText,
          ),
        };
      }),
    [jobPosts, locale, noDataText],
  );

  const companies = useMemo(
    () => [allCompanies, ...new Set(jobs.map((job) => job.company))],
    [allCompanies, jobs],
  );

  const tenders = useMemo(
    () =>
      tenderPosts.map((post) => {
        const tenderInformation = post.customFieldsMap?.tenderInformation as
          | { company?: string; date?: string; price?: string }
          | undefined;

        return {
          id: post._id,
          title: post.title,
          company: tenderInformation?.company || noDataText,
          deadline: formatDate(tenderInformation?.date, locale, noDataText),
          budget: tenderInformation?.price || noDataText,
        };
      }),
    [locale, noDataText, tenderPosts],
  );

  const filteredJobs =
    activeCompany === allCompanies
      ? jobs
      : jobs.filter((j) => j.company === activeCompany);

  // ---- Job application form state / erxes wiring -------------------------
  const [appSent, setAppSent] = useState(false);
  const [appSubmitError, setAppSubmitError] = useState("");
  const [appUploading, setAppUploading] = useState(false);
  const [appFiles, setAppFiles] = useState<File[]>([]);
  const [appForm, setAppForm] = useState({
    name: "",
    email: "",
    phone: "",
    position: "",
    message: "",
  });

  const [connectAppForm, { data: connectAppData }] =
    useMutation<LeadConnectData>(WIDGETS_LEAD_CONNECT);
  const [saveAppLead, { loading: appSaving }] =
    useMutation<SaveLeadData>(WIDGETS_SAVE_LEAD);
  const [createTenderTicket, { loading: tenderSaving }] =
    useMutation(CP_CREATE_TICKET);
  const [tenderSent, setTenderSent] = useState(false);
  const [tenderSubmitError, setTenderSubmitError] = useState("");
  const [tenderFiles, setTenderFiles] = useState<File[]>([]);
  const [tenderForm, setTenderForm] = useState({
    companyName: "",
    registerNumber: "",
    contactPerson: "",
    phone: "",
    tender: "",
  });

  useEffect(() => {
    connectAppForm({
      variables: {
        channelId: APPLICATION_CHANNEL_ID,
        formCode: APPLICATION_FORM_CODE,
      },
    }).catch(() => undefined);
  }, [connectAppForm]);

  const erxesAppForm = connectAppData?.widgetsLeadConnect?.form;
  const erxesAppFields: FormField[] = useMemo(
    () => erxesAppForm?.fields ?? [],
    [erxesAppForm?.fields],
  );

  const updateAppField = (key: keyof typeof appForm, value: string) => {
    setAppForm((current) => ({ ...current, [key]: value }));
  };

  const getAppField = (
    id: string,
    fallbackText: string,
    fallbackType = "text",
  ) => {
    const field = erxesAppFields.find((item) => item._id === id);
    return {
      _id: field?._id ?? id,
      text: field?.text?.trim() || fallbackText,
      type: field?.type || fallbackType,
    };
  };

  const createAppSubmission = (
    id: string,
    fallbackText: string,
    value: unknown,
    fallbackType = "text",
  ): FieldValueInput => {
    const field = getAppField(id, fallbackText, fallbackType);
    return {
      _id: field._id,
      type: field.type,
      text: field.text,
      value,
    };
  };

  const updateTenderField = (key: keyof typeof tenderForm, value: string) => {
    setTenderForm((current) => ({ ...current, [key]: value }));
  };

  const scrollToSection = (sectionId: string) => {
    requestAnimationFrame(() => {
      document.getElementById(sectionId)?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    });
  };

  const handleJobApplyClick = (position: string) => {
    updateAppField("position", position);
    scrollToSection(APPLICATION_FORM_SECTION_ID);
  };

  const handleTenderParticipateClick = (tender: string) => {
    updateTenderField("tender", tender);
    scrollToSection(TENDER_FORM_SECTION_ID);
  };

  const handleTenderFilesChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTenderFiles(Array.from(event.target.files ?? []));
  };

  const handleAppFilesChange = (event: ChangeEvent<HTMLInputElement>) => {
    setAppFiles(Array.from(event.target.files ?? []));
  };

  const uploadAppFiles = async (): Promise<string[]> => {
    if (!appFiles.length) return [];

    const graphqlUrl =
      process.env.NEXT_PUBLIC_GRAPHQL_URL ??
      process.env.NEXT_PUBLIC_ERXES_ENDPOINT ??
      "/graphql";
    const uploadUrl = graphqlUrl.replace(/\/graphql$/, "/upload-file");
    const appToken = process.env.NEXT_PUBLIC_ERXES_APP_TOKEN;
    const urls: string[] = [];

    for (const file of appFiles) {
      const body = new FormData();
      body.append("file", file);

      const response = await fetch(
        `${uploadUrl}?kind=main&maxHeight=0&maxWidth=0`,
        {
          method: "POST",
          body,
          credentials: "include",
          headers: appToken ? { "x-app-token": appToken } : undefined,
        },
      );

      if (!response.ok) throw new Error(t("uploadError"));

      const url = await response.text();
      if (url) urls.push(url);
    }

    return urls;
  };

  const uploadTenderFiles = async (): Promise<TicketAttachmentInput[]> => {
    const graphqlUrl =
      process.env.NEXT_PUBLIC_GRAPHQL_URL ??
      process.env.NEXT_PUBLIC_ERXES_ENDPOINT ??
      "/graphql";
    const uploadUrl = graphqlUrl.replace(/\/graphql$/, "/upload-file");
    const appToken = process.env.NEXT_PUBLIC_ERXES_APP_TOKEN;
    const attachments: TicketAttachmentInput[] = [];

    for (const file of tenderFiles) {
      const body = new FormData();
      body.append("file", file);

      const response = await fetch(
        `${uploadUrl}?kind=main&maxHeight=0&maxWidth=0`,
        {
          method: "POST",
          body,
          credentials: "include",
          headers: appToken ? { "x-app-token": appToken } : undefined,
        },
      );

      if (!response.ok) throw new Error(t("uploadError"));

      const url = await response.text();
      if (url) {
        attachments.push({
          name: file.name,
          url,
          size: file.size,
          type: file.type,
          duration: 0,
        });
      }
    }

    return attachments;
  };

  const handleTenderSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setTenderSubmitError("");

    try {
      const attachments = await uploadTenderFiles();
      const description = JSON.stringify([
        createBlockParagraph(`${t("companyName")}: ${tenderForm.companyName}`),
        createBlockParagraph(
          `${t("registerNumber")}: ${tenderForm.registerNumber}`,
        ),
        createBlockParagraph(`${t("contactPerson")}: ${tenderForm.contactPerson}`),
        createBlockParagraph(`${t("phone")}: ${tenderForm.phone}`),
        createBlockParagraph(`${t("selectTender")}: ${tenderForm.tender}`),
        createBlockParagraph(""),
      ]);

      await createTenderTicket({
        variables: {
          name: `${tenderForm.tender} ${tenderForm.companyName}`.trim(),
          channelId: TENDER_CHANNEL_ID,
          pipelineId: TENDER_PIPELINE_ID,
          statusId: TENDER_STATUS_ID,
          description,
          priority: 0,
          labelIds: [],
          tagIds: [],
          attachments,
        },
      });

      setTenderSent(true);
    } catch {
      setTenderSubmitError(t("tenderError"));
    }
  };

  const handleAppSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setAppSubmitError("");

    try {
      setAppUploading(true);
      const cvUrls = await uploadAppFiles();
      setAppUploading(false);

      const result = await saveAppLead({
        variables: {
          formId: erxesAppForm?._id ?? FALLBACK_APPLICATION_FORM_ID,
          submissions: [
            createAppSubmission(
              APPLICATION_FIELD_IDS.name,
              t("name"),
              appForm.name,
            ),
            createAppSubmission(
              APPLICATION_FIELD_IDS.email,
              t("email"),
              appForm.email,
            ),
            createAppSubmission(
              APPLICATION_FIELD_IDS.phone,
              t("phone"),
              appForm.phone,
            ),
            createAppSubmission(
              APPLICATION_FIELD_IDS.position,
              t("position"),
              appForm.position,
            ),
            createAppSubmission(
              APPLICATION_FIELD_IDS.message,
              t("shortIntro"),
              appForm.message,
              "textarea",
            ),
            createAppSubmission(
              APPLICATION_FIELD_IDS.cv,
              t("attachCv"),
              cvUrls,
              "file",
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
        setAppSubmitError(
          response.errors?.[0]?.text ||
            t("applicationError"),
        );
        return;
      }

      setAppSent(true);
    } catch {
      setAppUploading(false);
      setAppSubmitError(t("applicationError"));
    }
  };
  // -------------------------------------------------------------------------

  return (
    <>
      {/* HERO */}
      <section className="relative w-full pt-24 pb-16 overflow-hidden bg-[#000000]">
        {page?.thumbnail?.url && (
          <div
            className="absolute inset-0 bg-cover bg-center opacity-30"
            style={{ backgroundImage: `url('${page.thumbnail.url}')` }}
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-[#000000]/70 via-[#000000]/40 to-[#000000]" />
        <div className="relative mx-auto max-w-7xl px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight mb-5 tracking-tight">
              {page?.name || noDataText}
            </h1>
            <CmsContent
              html={page?.description || noDataText}
              className="mx-auto max-w-xl text-lg text-white/70 [&_p]:text-lg [&_p]:text-white/70 [&_p]:leading-relaxed"
            />
          </motion.div>
        </div>
      </section>

      {/* ENTRY CARDS */}

      {/* JOBS */}
      <section id="jobs" className="w-full py-24 bg-[#E8EEF4]">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <Reveal className="text-center mb-5">
            <span className="text-[11px] font-semibold tracking-[0.25em] text-[#EC6707] uppercase mb-4 block">
              {t("jobs")}
            </span>
            <h2 className="text-xl font-bold text-[#000000] tracking-tight">
              {t("jobList")}
            </h2>
          </Reveal>

          {/* Company Tabs */}
          <Reveal className="flex flex-wrap justify-center gap-2 mb-5">
            {companies.map((company) => (
              <button
                key={company}
                onClick={() => setActiveCompany(company)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  activeCompany === company
                    ? "bg-[#EC6707] text-white"
                    : "bg-[#F0F4F8] text-[#334155] border border-[#E2E8F0] hover:border-[#EC6707]"
                }`}
              >
                {company}
              </button>
            ))}
          </Reveal>

          {/* Jobs Grid */}
          <div className="space-y-4">
            {filteredJobs.length ? (
              filteredJobs.map((job, index) => (
                <Reveal key={job.id} delay={index * 0.1}>
                  <div className="bg-[#F0F4F8] rounded-xl p-4 border border-[#E2E8F0] hover:shadow-lg transition-all duration-300">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                      <div>
                        <h3 className="text-xl font-semibold text-[#000000] mb-2">
                          {job.title}
                        </h3>
                        <div className="flex flex-wrap gap-4 text-sm text-[#64748B]">
                          <span className="flex items-center gap-1">
                            <Briefcase size={14} /> {job.company}
                          </span>
                          <span className="flex items-center gap-1">
                            <MapPin size={14} /> {job.location}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock size={14} /> {job.type}
                          </span>
                          <span className="flex items-center gap-1">
                            <DollarSign size={14} /> {job.salary}
                          </span>
                          <span className="flex items-center gap-1">
                            <Calendar size={14} /> {job.deadline}
                          </span>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleJobApplyClick(job.title)}
                        className="px-6 py-3 bg-[#EC6707] text-white text-sm font-medium rounded-lg hover:bg-[#B35405] transition-colors shrink-0"
                      >
                        {t("apply")}
                      </button>
                    </div>
                  </div>
                </Reveal>
              ))
            ) : (
              <p className="text-center text-sm text-[#64748B]">{noDataText}</p>
            )}
          </div>
        </div>
      </section>

      {/* APPLICATION FORM — migrated to erxes/Apollo lead submission */}
      <section
        id={APPLICATION_FORM_SECTION_ID}
        className="w-full scroll-mt-24 py-24 bg-[#F0F4F8]"
      >
        <div className="mx-auto max-w-3xl px-6 lg:px-8">
          <Reveal className="text-center mb-5">
            <span className="text-[11px] font-semibold tracking-[0.25em] text-[#EC6707] uppercase mb-4 block">
              {t("apply")}
            </span>
            <h2 className="text-xl font-bold text-[#000000] tracking-tight">
              {t("jobApplication")}
            </h2>
          </Reveal>

          <Reveal>
            {appSent ? (
              <div className="bg-[#E8EEF4] rounded-2xl p-5 lg:p-4 border border-[#E2E8F0] flex flex-col items-center py-12 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#EC6707]/10">
                  <Check className="h-8 w-8 text-[#EC6707]" />
                </div>
                <p className="mt-4 font-medium text-[#000000]">
                  {t("applicationSent")}
                </p>
                <p className="text-sm text-[#64748B]">
                  {t("weWillContact")}
                </p>
              </div>
            ) : (
              <form
                onSubmit={handleAppSubmit}
                className="bg-[#E8EEF4] rounded-2xl p-5 lg:p-4 border border-[#E2E8F0] space-y-6"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm text-[#64748B] mb-2 block">
                      {t("name")}
                    </label>
                    <div className="relative">
                      <User
                        size={18}
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-[#94A3B8]"
                      />
                      <input
                        type="text"
                        required
                        value={appForm.name}
                        onChange={(e) => updateAppField("name", e.target.value)}
                        placeholder={t("namePlaceholder")}
                        className="w-full pl-11 pr-4 py-3 bg-[#F0F4F8] border border-[#E2E8F0] rounded-lg focus:outline-none focus:border-[#EC6707] text-[15px]"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-sm text-[#64748B] mb-2 block">
                      {t("email")}
                    </label>
                    <div className="relative">
                      <Mail
                        size={18}
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-[#94A3B8]"
                      />
                      <input
                        type="email"
                        required
                        value={appForm.email}
                        onChange={(e) =>
                          updateAppField("email", e.target.value)
                        }
                        placeholder={t("emailPlaceholder")}
                        className="w-full pl-11 pr-4 py-3 bg-[#F0F4F8] border border-[#E2E8F0] rounded-lg focus:outline-none focus:border-[#EC6707] text-[15px]"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm text-[#64748B] mb-2 block">
                      {t("phone")}
                    </label>
                    <div className="relative">
                      <Phone
                        size={18}
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-[#94A3B8]"
                      />
                      <input
                        type="tel"
                        required
                        value={appForm.phone}
                        onChange={(e) =>
                          updateAppField("phone", e.target.value)
                        }
                        placeholder={t("phonePlaceholder")}
                        className="w-full pl-11 pr-4 py-3 bg-[#F0F4F8] border border-[#E2E8F0] rounded-lg focus:outline-none focus:border-[#EC6707] text-[15px]"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-sm text-[#64748B] mb-2 block">
                      {t("position")}
                    </label>
                    <select
                      required
                      value={appForm.position}
                      onChange={(e) =>
                        updateAppField("position", e.target.value)
                      }
                      className="w-full px-4 py-3 bg-[#F0F4F8] border border-[#E2E8F0] rounded-lg focus:outline-none focus:border-[#EC6707] text-[15px]"
                    >
                      <option value="">{t("selectPosition")}</option>
                      {jobs.map((j) => (
                        <option key={j.id} value={j.title}>
                          {j.title}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-sm text-[#64748B] mb-2 block">
                    {t("shortIntro")}
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={appForm.message}
                    onChange={(e) => updateAppField("message", e.target.value)}
                    placeholder={t("shortIntroPlaceholder")}
                    className="w-full px-4 py-3 bg-[#F0F4F8] border border-[#E2E8F0] rounded-lg focus:outline-none focus:border-[#EC6707] text-[15px] resize-none"
                  />
                </div>

                <div>
                  <label className="text-sm text-[#64748B] mb-2 block">
                    {t("attachCv")}
                  </label>
                  <label className="block border-2 border-dashed border-[#E2E8F0] rounded-lg p-5 text-center hover:border-[#EC6707] transition-colors cursor-pointer">
                    <Upload size={24} className="mx-auto mb-2 text-[#94A3B8]" />
                    <p className="text-sm text-[#64748B]">
                      {appFiles.length
                        ? appFiles.map((file) => file.name).join(", ")
                        : t("uploadHint")}
                    </p>
                    <input
                      type="file"
                      multiple
                      className="hidden"
                      onChange={handleAppFilesChange}
                    />
                  </label>
                </div>

                {appSubmitError && (
                  <div className="flex items-start gap-2 rounded-lg border border-red-300 bg-red-50 px-3 py-2 text-sm text-red-600">
                    <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
                    <span>{appSubmitError}</span>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={appSaving || appUploading}
                  className="w-full flex items-center justify-center gap-2 px-8 py-4 bg-[#EC6707] text-white font-semibold rounded-lg hover:bg-[#B35405] transition-colors disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {appSaving || appUploading ? (
                    <Loader2 size={18} className="animate-spin" />
                  ) : (
                    <Send size={18} />
                  )}
                  {t("apply")}
                </button>
              </form>
            )}
          </Reveal>
        </div>
      </section>

      {/* TENDERS */}
      <section id="tenders" className="w-full py-24 bg-[#E8EEF4]">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <Reveal className="text-center mb-5">
            <span className="text-[11px] font-semibold tracking-[0.25em] text-[#EC6707] uppercase mb-4 block">
              {t("tenders")}
            </span>
            <h2 className="text-xl font-bold text-[#000000] tracking-tight">
              {t("tenderList")}
            </h2>
          </Reveal>

          <div className="space-y-4">
            {tenders.length ? (
              tenders.map((tender, index) => (
                <Reveal key={tender.id} delay={index * 0.1}>
                  <div className="bg-[#F0F4F8] rounded-xl p-4 border border-[#E2E8F0] hover:shadow-lg transition-all duration-300">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                      <div>
                        <h3 className="text-xl font-semibold text-[#000000] mb-2">
                          {tender.title}
                        </h3>
                        <div className="flex flex-wrap gap-4 text-sm text-[#64748B]">
                          <span className="flex items-center gap-1">
                            <Briefcase size={14} /> {tender.company}
                          </span>
                          <span className="flex items-center gap-1">
                            <Calendar size={14} /> {t("deadline")}:{" "}
                            {tender.deadline}
                          </span>
                          <span className="flex items-center gap-1">
                            {tender.budget} ₮
                          </span>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleTenderParticipateClick(tender.title)}
                        className="px-6 py-3 bg-[#EC6707] text-white text-sm font-medium rounded-lg hover:bg-[#B35405] transition-colors shrink-0"
                      >
                        {t("participate")}
                      </button>
                    </div>
                  </div>
                </Reveal>
              ))
            ) : (
              <p className="text-center text-sm text-[#64748B]">{noDataText}</p>
            )}
          </div>
        </div>
      </section>

      {/* TENDER FORM */}
      <section
        id={TENDER_FORM_SECTION_ID}
        className="w-full scroll-mt-24 py-24 bg-[#F0F4F8]"
      >
        <div className="mx-auto max-w-3xl px-6 lg:px-8">
          <Reveal className="text-center mb-5">
            <span className="text-[11px] font-semibold tracking-[0.25em] text-[#EC6707] uppercase mb-4 block">
              {t("submitTender")}
            </span>
            <h2 className="text-xl font-bold text-[#000000] tracking-tight">
              {t("tenderRequest")}
            </h2>
          </Reveal>

          <Reveal>
            {tenderSent ? (
              <div className="bg-[#E8EEF4] rounded-2xl p-5 lg:p-4 border border-[#E2E8F0] flex flex-col items-center py-12 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#EC6707]/10">
                  <Check className="h-8 w-8 text-[#EC6707]" />
                </div>
                <p className="mt-4 font-medium text-[#000000]">
                  {t("tenderSent")}
                </p>
                <p className="text-sm text-[#64748B]">
                  {t("weWillContact")}
                </p>
              </div>
            ) : (
              <form
                onSubmit={handleTenderSubmit}
                className="bg-[#E8EEF4] rounded-2xl p-5 lg:p-4 border border-[#E2E8F0] space-y-6"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm text-[#64748B] mb-2 block">
                      {t("companyName")}
                    </label>
                    <input
                      type="text"
                      required
                      value={tenderForm.companyName}
                      onChange={(e) =>
                        updateTenderField("companyName", e.target.value)
                      }
                      placeholder={t("companyName")}
                      className="w-full px-4 py-3 bg-[#F0F4F8] border border-[#E2E8F0] rounded-lg focus:outline-none focus:border-[#EC6707] text-[15px]"
                    />
                  </div>
                  <div>
                    <label className="text-sm text-[#64748B] mb-2 block">
                      {t("registerNumber")}
                    </label>
                    <input
                      type="text"
                      required
                      value={tenderForm.registerNumber}
                      onChange={(e) =>
                        updateTenderField("registerNumber", e.target.value)
                      }
                      placeholder={t("registerNumberPlaceholder")}
                      className="w-full px-4 py-3 bg-[#F0F4F8] border border-[#E2E8F0] rounded-lg focus:outline-none focus:border-[#EC6707] text-[15px]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm text-[#64748B] mb-2 block">
                      {t("contactPerson")}
                    </label>
                    <input
                      type="text"
                      required
                      value={tenderForm.contactPerson}
                      onChange={(e) =>
                        updateTenderField("contactPerson", e.target.value)
                      }
                      placeholder={t("contactPersonPlaceholder")}
                      className="w-full px-4 py-3 bg-[#F0F4F8] border border-[#E2E8F0] rounded-lg focus:outline-none focus:border-[#EC6707] text-[15px]"
                    />
                  </div>
                  <div>
                    <label className="text-sm text-[#64748B] mb-2 block">
                      {t("phone")}
                    </label>
                    <input
                      type="tel"
                      required
                      value={tenderForm.phone}
                      onChange={(e) =>
                        updateTenderField("phone", e.target.value)
                      }
                      placeholder={t("phonePlaceholder")}
                      className="w-full px-4 py-3 bg-[#F0F4F8] border border-[#E2E8F0] rounded-lg focus:outline-none focus:border-[#EC6707] text-[15px]"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-sm text-[#64748B] mb-2 block">
                    {t("selectTender")}
                  </label>
                  <select
                    required
                    value={tenderForm.tender}
                    onChange={(e) =>
                      updateTenderField("tender", e.target.value)
                    }
                    className="w-full px-4 py-3 bg-[#F0F4F8] border border-[#E2E8F0] rounded-lg focus:outline-none focus:border-[#EC6707] text-[15px]"
                  >
                    <option value="">{t("selectTender")}</option>
                    {tenders.map((t) => (
                      <option key={t.id} value={t.title}>
                        {t.title}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-sm text-[#64748B] mb-2 block">
                    {t("tenderDocuments")}
                  </label>
                  <label className="block border-2 border-dashed border-[#E2E8F0] rounded-lg p-5 text-center hover:border-[#EC6707] transition-colors cursor-pointer">
                    <FileText
                      size={24}
                      className="mx-auto mb-2 text-[#94A3B8]"
                    />
                    <p className="text-sm text-[#64748B]">
                      {tenderFiles.length
                        ? tenderFiles.map((file) => file.name).join(", ")
                        : t("tenderDocumentsPlaceholder")}
                    </p>
                    <input
                      type="file"
                      multiple
                      className="hidden"
                      onChange={handleTenderFilesChange}
                    />
                  </label>
                </div>

                {tenderSubmitError && (
                  <div className="flex items-start gap-2 rounded-lg border border-red-300 bg-red-50 px-3 py-2 text-sm text-red-600">
                    <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
                    <span>{tenderSubmitError}</span>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={tenderSaving}
                  className="w-full flex items-center justify-center gap-2 px-8 py-4 bg-[#EC6707] text-white font-semibold rounded-lg hover:bg-[#B35405] transition-colors disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {tenderSaving ? (
                    <Loader2 size={18} className="animate-spin" />
                  ) : (
                    <Send size={18} />
                  )}
                  {t("sendRequest")}
                </button>
              </form>
            )}
          </Reveal>
        </div>
      </section>
    </>
  );
}
