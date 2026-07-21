"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, X } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { CmsContent } from "@/components/common/CmsContent";
import { useCmsPostsBySlug } from "@/hooks/useCmsPostsBySlug";
import { CmsPost } from "@/types/cmsPostType";
import { getCmsFileUrl } from "@/utils/utils";

interface BusinessPageClientProps {
  locale: string;
}

const businessCategorySlug = "biznesiin-chiglel";
const featuredProjectsCategorySlug = "ontslokh-tusluud";

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
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
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

export default function BusinessPageClient({
  locale,
}: BusinessPageClientProps) {
  const t = useTranslations("business");
  const commonT = useTranslations("common");
  const noDataText = commonT("noData");
  const { posts: sectors } = useCmsPostsBySlug(businessCategorySlug);
  const { posts: featuredProjects } = useCmsPostsBySlug(
    featuredProjectsCategorySlug,
  );
  const [selectedProject, setSelectedProject] = useState<CmsPost | null>(null);

  return (
    <>
      {/* HERO / OVERVIEW */}
      <section className="w-full bg-[#F0F4F8]">
        <div className="mt-[72px] pt-[0.5cm] mx-[0.5cm] mb-[0.5cm]">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div className="relative rounded-[40px] bg-[#D7722A] border border-[#D7722A]/20 px-4 sm:px-6 lg:px-8 pt-12 pb-10 lg:pt-14 lg:pb-12 overflow-hidden shadow-xl">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[250px] bg-white/10 blur-[100px] rounded-full pointer-events-none" />

              <div className="relative z-10 flex justify-center mb-10">
                <div className="text-center">
                  <Image
                    src="/ub-logo-white.png"
                    alt="UB Group"
                    width={220}
                    height={64}
                    className="h-14 sm:h-16 lg:h-20 w-auto object-contain mx-auto"
                    priority
                  />
                </div>
              </div>

              <div className="hidden lg:block absolute top-[104px] left-1/2 -translate-x-1/2 w-px h-10 bg-white/20" />

              <div className="relative z-10 flex flex-nowrap lg:grid lg:grid-cols-5 gap-4 lg:gap-5 overflow-x-auto lg:overflow-visible pt-12 -mx-2 px-2 lg:mx-0 lg:px-0">
                <div className="hidden lg:block absolute top-0 left-0 right-0 h-px bg-white/20" />
                {sectors.length ? (
                  sectors.map((sector, index) => (
                    <div
                      key={sector._id}
                      className="relative min-w-[180px] flex-1"
                    >
                      <div className="hidden lg:block absolute top-0 left-1/2 -translate-x-1/2 w-px h-12 bg-white/20" />
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: index * 0.05 }}
                        className="relative z-10 w-full min-h-[200px] rounded-3xl border border-white/10 bg-white/10 p-5 text-center hover:bg-white/20 hover:border-white/20 transition-colors flex flex-col justify-center"
                      >
                        <div className="text-white text-xs font-bold tracking-[0.2em] mb-3">
                          UB
                        </div>
                        <div className="text-white text-base lg:text-lg font-bold tracking-wide">
                          {sector.title}
                        </div>
                      </motion.div>
                    </div>
                  ))
                ) : (
                  <p className="relative z-10 min-w-[180px] flex-1 text-center text-sm text-white/70">
                    {noDataText}
                  </p>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FEATURED PROJECTS */}
      <section
        id="featured-projects"
        className="w-full bg-[#FAFAF8] py-16 lg:py-20"
      >
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-center mb-10 lg:mb-14"
          >
            <span className="text-xs font-semibold tracking-[0.25em] text-[#EC6707] uppercase mb-4 block">
              {t("projects")}
            </span>
            <h2 className="text-4xl sm:text-5xl font-bold text-black tracking-tight">
              {t("featuredProjects")}
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {featuredProjects.length ? (
              featuredProjects.map((project, index) => {
                const thumbnail = getThumbnail(project);
                const about = project.customFieldsMap?.about as
                  | { duration?: string; location?: string }
                  | undefined;

                return (
                  <motion.button
                    key={project._id}
                    type="button"
                    onClick={() => setSelectedProject(project)}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                    whileHover={{ y: -8 }}
                    className="group cursor-pointer text-left"
                  >
                    <div className="relative overflow-hidden rounded-xl mb-4 shadow-lg">
                      {thumbnail ? (
                        <div
                          className="h-64 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                          style={{
                            backgroundImage: `url('${thumbnail}')`,
                          }}
                        />
                      ) : (
                        <div className="h-64 bg-[#E2E8F0] flex items-center justify-center text-sm text-black/50">
                          {noDataText}
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-[#1C1C1C]/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <div className="absolute inset-0 bg-[#EC6707]/0 group-hover:bg-[#EC6707]/10 transition-colors duration-500" />
                    </div>
                    <h3 className="text-xl font-semibold text-[#1A1A1A] mb-1 group-hover:text-[#EC6707] transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-sm text-[#737373]">
                      {about?.duration || noDataText} •{" "}
                      {about?.location || noDataText}
                    </p>
                  </motion.button>
                );
              })
            ) : (
              <p className="lg:col-span-3 text-center text-sm text-[#64748B]">
                {noDataText}
              </p>
            )}
          </div>
        </div>
      </section>

      {/* BUSINESS AREAS */}
      <section className="w-full py-14 lg:py-20 bg-[#F0F4F8]">
        <div className="mx-auto max-w-[1600px] px-4 sm:px-5 lg:px-6">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-center mb-10 lg:mb-14"
          >
            <span className="text-xs font-semibold tracking-[0.25em] text-[#EC6707] uppercase mb-4 block">
              {t("sectors")}
            </span>
            <h2 className="text-4xl sm:text-5xl font-bold text-black tracking-tight">
              {t("areas")}
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
            {sectors.length ? (
              sectors.map((sector, index) => (
                <motion.div
                  key={sector._id}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Link
                    href={`/${locale}/business/${sector.slug}`}
                    className="group relative block w-full h-[320px] sm:h-[380px] lg:h-[420px] rounded-[40px] overflow-hidden text-left shadow-lg"
                  >
                    <div className="relative w-full h-full">
                      <div
                        className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                        style={{
                          backgroundImage: `url('${getThumbnail(sector)}')`,
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/10" />
                      <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 lg:p-10">
                        <div className="text-[#EC6707] text-xs sm:text-sm font-bold tracking-[0.2em] mb-2">
                          UB
                        </div>
                        <h3 className="text-white text-2xl sm:text-3xl lg:text-4xl font-bold mb-3">
                          {sector.title}
                        </h3>
                        <p className="text-white/80 text-sm sm:text-base leading-relaxed mb-5 line-clamp-3 max-w-2xl">
                          {sector.excerpt || noDataText}
                        </p>
                        <span className="inline-flex items-center gap-2 px-6 py-3 bg-[#EC6707] text-white text-sm font-semibold rounded-full hover:bg-[#B35405] transition-colors">
                          {t("details")}
                          <ArrowRight size={18} />
                        </span>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))
            ) : (
              <p className="lg:col-span-2 text-center text-sm text-[#64748B]">
                {noDataText}
              </p>
            )}
          </div>
        </div>
      </section>

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
    </>
  );
}
