"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, ArrowRight, X } from "lucide-react";
import { useTranslations } from "next-intl";
import { CmsContent } from "@/components/common/CmsContent";
import { useCmsPostsBySlug } from "@/hooks/useCmsPostsBySlug";
import { CmsPost } from "@/types/cmsPostType";
import { getCmsFileUrl } from "@/utils/utils";

const getThumbnail = (post: CmsPost) => getCmsFileUrl(post.thumbnail?.url);

function ProjectDrawer({
  project,
  locale,
  onClose,
}: {
  project: CmsPost;
  locale: string;
  onClose: () => void;
}) {
  const commonT = useTranslations("common");
  const noDataText = commonT("noData");
  const scrollRef = useRef<HTMLDivElement>(null);
  const thumbnail = getThumbnail(project);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = 0;
  }, [project]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/50"
      />

      <motion.div
        ref={scrollRef}
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ type: "spring", damping: 30, stiffness: 300 }}
        className="relative w-full sm:w-[640px] lg:w-[720px] h-full bg-white overflow-y-auto shadow-2xl"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/10 hover:bg-black/20 transition-colors"
          aria-label={commonT("close")}
        >
          <X size={22} className="text-black/70" />
        </button>

        {thumbnail ? (
          <div
            className="w-full h-[400px] bg-cover bg-center"
            style={{ backgroundImage: `url('${thumbnail}')` }}
          />
        ) : (
          <div className="h-56 bg-[#E2E8F0] flex items-center justify-center text-sm text-black/50">
            {noDataText}
          </div>
        )}

        <div className="p-6 sm:p-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-black mb-2">
            {project.title}
          </h2>

          <p className="text-black/70 leading-relaxed mb-8">
            {project.excerpt || noDataText}
          </p>

          <CmsContent
            html={project.content || noDataText}
            className="text-black/70 [&_p]:text-[15px] [&_p]:text-black/70 [&_ul]:text-black/70"
          />
        </div>
      </motion.div>
    </div>
  );
}

export default function SectorProjectsClient({
  sectorSlug,
  locale,
}: {
  sectorSlug: string;
  locale: string;
}) {
  const t = useTranslations("business");
  const commonT = useTranslations("common");
  const noDataText = commonT("noData");
  const { posts: projects } = useCmsPostsBySlug(sectorSlug);
  const [selectedProject, setSelectedProject] = useState<CmsPost | null>(null);
  const sectorName = projects[0]?.categories?.[0]?.name || noDataText;

  return (
    <div className="w-full py-20 lg:py-28 bg-[#F8F9FB]">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mb-10">
          <Link
            href={`/${locale}/business`}
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#EC6707] hover:text-[#B35405] mb-4"
          >
            <ArrowLeft size={16} />
            {t("backToAreas")}
          </Link>
          <h1 className="text-3xl sm:text-4xl font-bold text-black tracking-tight mb-3">
            {sectorName}
          </h1>
        </div>

        <h2 className="text-sm font-semibold tracking-wider text-black/50 uppercase mb-6">
          {t("projects")}
        </h2>

        {projects.length ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => {
              const thumbnail = getThumbnail(project);

              return <motion.div
                key={project._id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                whileHover={{ y: -4 }}
                className="bg-white rounded-2xl border border-black/5 p-6 shadow-sm hover:shadow-lg transition-shadow"
              >
                {thumbnail ? (
                  <div
                    className="h-40 w-full rounded-xl bg-cover bg-center mb-5"
                    style={{ backgroundImage: `url('${thumbnail}')` }}
                  />
                ) : (
                  <div className="h-40 w-full rounded-xl bg-[#E2E8F0] mb-5 flex items-center justify-center text-sm text-black/50">
                    {noDataText}
                  </div>
                )}
                <h3 className="text-lg font-bold text-black mb-2">
                  {project.title}
                </h3>
                <p className="text-sm text-black/60 line-clamp-2 mb-5">
                  {project.excerpt || noDataText}
                </p>
                <button
                  onClick={() => setSelectedProject(project)}
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#EC6707] text-white text-sm font-semibold rounded-full hover:bg-[#B35405] transition-colors"
                >
                  {t("details")}
                  <ArrowRight size={14} />
                </button>
              </motion.div>;
            })}
          </div>
        ) : (
          <p className="text-center text-sm text-black/50">{noDataText}</p>
        )}
      </div>

      <AnimatePresence>
        {selectedProject && (
          <ProjectDrawer
            key={selectedProject._id}
            project={selectedProject}
            locale={locale}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
