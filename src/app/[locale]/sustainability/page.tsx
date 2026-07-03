"use client";

import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import {
  Leaf,
  Users,
  Globe,
  Lightbulb,
  FileText,
  Download,
} from "lucide-react";
import { CmsContent } from "@/components/common/CmsContent";
import { useCmsPostsBySlug } from "@/hooks/useCmsPostsBySlug";
import { usePageBySlug } from "@/hooks/usePageBySlug";
import { CmsPost } from "@/types/cmsPostType";

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

const rootsCategorySlug = "bidnii-undes_2";
const projectsCategorySlug = "nevtruulj-bui-tusluud";
const impactCategorySlug = "bidnii-ololt";
const reportsCategorySlug = "tailanguud";
const principleIcons = [Leaf, Users, Globe, Lightbulb];

const getPostImage = (post: CmsPost) => post.thumbnail?.url || post.images?.[0]?.url || "";

export default function SustainabilityPage() {
  const t = useTranslations("sustainability");
  const commonT = useTranslations("common");
  const pathname = usePathname();
  const locale = pathname.split("/")[1] || "mn";
  const noDataText = commonT("noData");
  const { page } = usePageBySlug("sustainability");
  const { posts: principles } = useCmsPostsBySlug(rootsCategorySlug);
  const { posts: projects } = useCmsPostsBySlug(projectsCategorySlug);
  const { posts: impactPosts } = useCmsPostsBySlug(impactCategorySlug);
  const { posts: reports } = useCmsPostsBySlug(reportsCategorySlug);
  const metrics = impactPosts[0]?.customFieldsMap?.keyMetrc as
    | Record<string, string>
    | undefined;
  const stats = metrics ? Object.entries(metrics).filter(([, value]) => value) : [];

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

      {/* PRINCIPLES */}
      {principles.length > 0 && (
      <section className="w-full py-16 lg:py-12 bg-[#F0F4F8]">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <Reveal className="text-center mb-5">
            <span className="text-[11px] font-semibold tracking-[0.25em] text-[#EC6707] uppercase mb-4 block">
              {t("principles")}
            </span>
            <h2 className="text-3xl lg:text-xl font-bold text-[#000000] tracking-tight">
              {t("roots")}
            </h2>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {principles.map((principle, index) => {
              const Icon = principleIcons[index % principleIcons.length];
              return (
                <Reveal key={principle._id} delay={index * 0.1}>
                  <div className="bg-[#E8EEF4] rounded-2xl p-4 text-center h-full border border-[#E2E8F0] hover:shadow-lg transition-all duration-500">
                    <div className="w-16 h-16 rounded-full bg-[#F5F3ED] flex items-center justify-center mx-auto mb-6">
                      <Icon
                        size={28}
                        className="text-[#EC6707]"
                        strokeWidth={1.5}
                      />
                    </div>
                    <h3 className="text-xl font-semibold text-[#000000] mb-4">
                      {principle.title}
                    </h3>
                    <p className="text-[14px] text-[#64748B] leading-relaxed">
                      {principle.excerpt || noDataText}
                    </p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>
      )}

      {/* PROJECTS */}
      {projects.length > 0 && (
      <section className="w-full py-16 lg:py-12 bg-[#E8EEF4]">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <Reveal className="text-center mb-5">
            <span className="text-[11px] font-semibold tracking-[0.25em] text-[#EC6707] uppercase mb-4 block">
              {t("projectsEyebrow")}
            </span>
            <h2 className="text-3xl lg:text-xl font-bold text-[#000000] tracking-tight">
              {t("projects")}
            </h2>
          </Reveal>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
            {projects.map((project, index) => (
              <Reveal key={project._id} delay={index * 0.15}>
                <div className="group bg-[#F0F4F8] rounded-xl overflow-hidden border border-[#E2E8F0] hover:shadow-xl transition-all duration-500">
                  <div className="relative h-56 overflow-hidden">
                    <div
                      className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                      style={{ backgroundImage: `url('${getPostImage(project)}')` }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#000000]/60 to-transparent" />
                  </div>
                  <div className="p-5">
                    <div className="text-[11px] text-[#EC6707] font-medium tracking-wider uppercase mb-3">
                      {project.categories?.[0]?.name || noDataText}
                    </div>
                    <h3 className="text-xl font-semibold text-[#000000] mb-3">
                      {project.title}
                    </h3>
                    <p className="text-[14px] text-[#64748B]">
                      {project.excerpt || noDataText}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      )}

      {/* IMPACT STATS */}
      {stats.length > 0 && (
      <section className="w-full py-24 bg-[#F0F4F8]">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <Reveal className="text-center mb-6">
            <span className="text-[11px] font-semibold tracking-[0.25em] text-[#EC6707] uppercase mb-4 block">
              {t("impact")}
            </span>
            <h2 className="text-xl font-bold text-[#000000] tracking-tight">
              {t("achievements")}
            </h2>
          </Reveal>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
            {stats.map(([label, value], index) => (
              <Reveal key={label} delay={index * 0.1}>
                <div className="text-center p-5">
                  <div className="text-4xl lg:text-5xl font-bold text-[#EC6707] mb-4 tracking-tight">
                    {value}
                  </div>
                  <div className="h-px w-12 bg-[#EC6707]/20 mx-auto mb-4" />
                  <div className="text-[14px] text-[#64748B]">{label}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      )}

      {/* REPORTS */}
      {reports.length > 0 && (
      <section className="w-full py-16 lg:py-12 bg-[#E8EEF4]">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <Reveal className="text-center mb-5">
            <span className="text-[11px] font-semibold tracking-[0.25em] text-[#EC6707] uppercase mb-4 block">
              {t("reports")}
            </span>
            <h2 className="text-3xl lg:text-xl font-bold text-[#000000] tracking-tight">
              {t("reportsTitle")}
            </h2>
          </Reveal>

          <div className="space-y-4">
            {reports.map((report, index) => (
              <Reveal key={report._id} delay={index * 0.1}>
                <div className="flex items-center justify-between p-4 bg-[#F0F4F8] rounded-xl border border-[#E2E8F0] hover:shadow-md transition-all duration-300">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-[#F5F3ED] flex items-center justify-center">
                      <FileText size={20} className="text-[#EC6707]" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-[#000000]">
                        {report.title}
                      </h3>
                      <p className="text-sm text-[#64748B]">
                        {report.excerpt || noDataText}
                      </p>
                    </div>
                  </div>
                  <button className="flex items-center gap-2 px-4 py-2 bg-[#EC6707] text-white text-sm font-medium rounded-lg hover:bg-[#B35405] transition-colors">
                    <Download size={16} />
                    {t("download")}
                  </button>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      )}
    </>
  );
}
