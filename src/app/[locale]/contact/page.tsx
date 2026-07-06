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

function FacebookIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}

function InstagramIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
    </svg>
  );
}

function YoutubeIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  );
}

function LinkedinIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

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
  const socialLinks = [
    { icon: FacebookIcon, href: getLink(contactInfo?.facebook), label: "Facebook" },
    { icon: InstagramIcon, href: getLink(contactInfo?.instagram), label: "Instagram" },
    { icon: YoutubeIcon, href: getLink(contactInfo?.youtube), label: "YouTube" },
    { icon: LinkedinIcon, href: getLink(contactInfo?.linkedin), label: "LinkedIn" },
  ];

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
                    <div className="flex items-center gap-3">
                      {socialLinks.map((social) => {
                        const Icon = social.icon;
                        return (
                          <a
                            key={social.label}
                            href={social.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={social.label}
                            className="w-10 h-10 bg-[#EC6707]/10 rounded-full flex items-center justify-center text-[#EC6707] hover:bg-[#EC6707] hover:text-white transition-all duration-300"
                          >
                            <Icon size={18} />
                          </a>
                        );
                      })}
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
