"use client";

import { useEffect } from "react";
import { useTranslations } from "next-intl";

const CAREER_FORM = {
  formId: "eVBVTM",
  channelId: "NacImkee_2sr0fDAf-Q85",
  scriptSrc: "https://ubgroupnext.nextwidgets.erxes.io/formBundle.js",
} as const;

const SCRIPT_ID = "ubgroup-erxes-form-script";

declare global {
  interface Window {
    erxesSettings?: {
      forms: Array<{
        form_id: string;
        channel_id: string;
      }>;
    };
  }
}

function registerForm(formId: string, channelId: string) {
  const settings = window.erxesSettings ?? { forms: [] };
  const forms = settings.forms.filter((f) => f.form_id !== formId);
  window.erxesSettings = {
    ...settings,
    forms: [...forms, { form_id: formId, channel_id: channelId }],
  };
}

function loadFormBundle() {
  if (document.querySelector(`script[src="${CAREER_FORM.scriptSrc}"]`)) return;

  const script = document.createElement("script");
  script.id = SCRIPT_ID;
  script.src = CAREER_FORM.scriptSrc;
  script.async = true;

  const entry = document.getElementsByTagName("script")[0];
  entry.parentNode?.insertBefore(script, entry);
}

interface JobOption {
  _id: string;
  title: string;
}

interface Props {
  jobs: JobOption[];
  selectedJobId: string;
  onJobChange: (jobId: string) => void;
  jobsLoading?: boolean;
}

export function CareerFormEmbed({
  jobs,
  selectedJobId,
  onJobChange,
  jobsLoading,
}: Props) {
  const t = useTranslations("career");

  useEffect(() => {
    registerForm(CAREER_FORM.formId, CAREER_FORM.channelId);
    loadFormBundle();
  }, []);

  return (
    <div className="bg-[#E8EEF4] rounded-2xl p-5 lg:p-4 border border-[#E2E8F0] space-y-6">
      <div>
        <label className="text-sm text-[#64748B] mb-2 block font-medium">
          {t("position")}
        </label>
        <select
          value={selectedJobId}
          onChange={(e) => onJobChange(e.target.value)}
          className="w-full px-4 py-3 bg-[#F0F4F8] border border-[#E2E8F0] rounded-lg focus:outline-none focus:border-[#EC6707] text-[15px]"
        >
          <option value="">{t("selectPosition")}</option>
          {jobsLoading ? (
            <option disabled>{t("reading")}</option>
          ) : jobs.length === 0 ? (
            <option disabled>{t("noJobs")}</option>
          ) : (
            jobs.map((job) => (
              <option key={job._id} value={job._id}>
                {job.title}
              </option>
            ))
          )}
        </select>
      </div>

      <div className="min-h-[560px]">
        <div data-erxes-embed={CAREER_FORM.formId} />
      </div>
    </div>
  );
}
