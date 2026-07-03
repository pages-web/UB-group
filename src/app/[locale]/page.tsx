"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowRight, Calendar, ChevronLeft, ChevronRight } from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "@/components/common/Image";
import { CmsContent } from "@/components/common/CmsContent";
import { useCmsPostsBySlug } from "@/hooks/useCmsPostsBySlug";
import { CmsPost } from "@/types/cmsPostType";

const featuredProjectsCategorySlug = "ontslokh-tusluud";
const companiesCategorySlug = "kompaniud";
const newsCategorySlug = "medee-medeelel";

const getPostImage = (post: CmsPost) => post.thumbnail?.url || post.images?.[0]?.url || "";

const formatDate = (date: string, locale: string) =>
  new Date(date).toLocaleDateString(locale === "mn" ? "mn-MN" : "en-US", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });

function HeroSlider({ locale }: { locale: string }) {
  const tBusiness = useTranslations("business");
  const tCommon = useTranslations("common");
  const [current, setCurrent] = useState(0);
  const { loading, posts } = useCmsPostsBySlug(featuredProjectsCategorySlug);
  const slides = posts;
  const noDataText = tCommon("noData");

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % slides.length);
  }, [slides.length]);

  const prev = useCallback(() => {
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
  }, [slides.length]);

  useEffect(() => {
    if (!slides.length) return;

    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [next, slides.length]);

  if (!slides.length) {
    return (
      <section className="w-full bg-white">
        <div className="mx-[0.5cm] mt-[72px] pt-[0.5cm] mb-[0.5cm]">
          <div className="relative aspect-[16/9] sm:aspect-[21/9] md:aspect-[2.4/1] max-h-[calc(100vh-1cm)] overflow-hidden rounded-3xl sm:rounded-[40px] bg-[#111111] shadow-xl">
            <div className="absolute inset-0 flex items-center justify-center text-sm text-white/70">
              {loading ? tCommon("loading") : noDataText}
            </div>
          </div>
        </div>
      </section>
    );
  }

  const currentIndex = current % slides.length;
  const slide = slides[currentIndex];
  const image = slide.thumbnail?.url || slide.images?.[0]?.url || "";

  return (
    <section className="w-full bg-white">
      <div className="mx-[0.5cm] mt-[72px] pt-[0.5cm] mb-[0.5cm]">
        <div className="relative aspect-[16/9] sm:aspect-[21/9] md:aspect-[2.4/1] max-h-[calc(100vh-1cm)] overflow-hidden rounded-3xl sm:rounded-[40px] bg-[#000000] shadow-xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={slide._id}
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url('${image}')` }}
            />
          </AnimatePresence>

          <div className="absolute inset-0 bg-gradient-to-t from-[#000000]/90 via-[#000000]/30 to-[#000000]/20" />

          <div className="absolute inset-0 flex flex-col justify-end p-6 sm:p-10 lg:p-14">
            <motion.div
              key={`text-${slide._id}`}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="max-w-2xl"
            >
              <span className="inline-block px-3 py-1.5 bg-[#EC6707]/90 text-white text-[11px] font-semibold tracking-wider uppercase rounded-full mb-4">
                {tBusiness("featuredProject")}
              </span>
              <h1 className="text-2xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight mb-3 tracking-tight">
                {slide.title}
              </h1>
              <CmsContent
                html={slide.content || noDataText}
                className="mb-6 max-w-xl text-white/80 [&_p]:mb-1 [&_p]:text-sm sm:[&_p]:text-lg [&_p]:leading-relaxed [&_p]:text-white/80"
              />
              <Link
                href={`/${locale}/business#featured-projects`}
                className="inline-flex items-center gap-2 px-6 py-3 bg-white text-[#EC6707] text-sm font-semibold rounded-full hover:bg-[#F0F4F8] transition-colors w-fit"
              >
                {tBusiness("projects")}
                <ArrowRight size={16} />
              </Link>
            </motion.div>
          </div>

          {/* Navigation arrows */}
          <button
            onClick={prev}
            aria-label={tCommon("previous")}
            className="absolute left-4 sm:left-6 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/10 backdrop-blur-sm text-white flex items-center justify-center hover:bg-white/20 transition-colors"
          >
            <ChevronLeft size={22} />
          </button>
          <button
            onClick={next}
            aria-label={tCommon("next")}
            className="absolute right-4 sm:right-6 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/10 backdrop-blur-sm text-white flex items-center justify-center hover:bg-white/20 transition-colors"
          >
            <ChevronRight size={22} />
          </button>

          {/* Dots */}
          <div className="absolute bottom-5 sm:bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-2">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrent(index)}
                aria-label={`${tCommon("slide")} ${index + 1}`}
                className={`w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full transition-all duration-300 ${
                  index === currentIndex ? "bg-white w-6 sm:w-8" : "bg-white/40 hover:bg-white/60"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

type CompanyItem = {
  id: string;
  name: string;
  image: string;
};

function MarqueeLogos({ companies }: { companies: CompanyItem[] }) {
  const items = [...companies, ...companies];

  return (
    <div className="w-full overflow-hidden">
      <div className="mx-auto max-w-[1600px] px-6 lg:px-8">
        <div className="relative w-full bg-[#F0F0F3] rounded-full py-8 sm:py-10 overflow-hidden">
          <div className="marquee-track-fast flex items-center">
            {items.map((company, index) => (
              <div
                key={`${company.id}-${index}`}
                className="flex-shrink-0 flex items-center justify-center px-10 sm:px-14 lg:px-16"
              >
                <div className="flex items-center justify-center h-14 sm:h-16 lg:h-18">
                  <Image
                    src={company.image}
                    alt={company.name}
                    width={160}
                    height={64}
                    className="h-full w-auto object-contain grayscale hover:grayscale-0 transition-all duration-300"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function CompaniesSection() {
  const t = useTranslations("home");
  const commonT = useTranslations("common");
  const { posts } = useCmsPostsBySlug(companiesCategorySlug);
  const companyPost = posts[0];
  const names = companyPost?.excerpt?.split(",").map((name) => name.trim()) || [];
  const companies =
    companyPost?.images?.map((image, index) => ({
      id: `${image.url}-${index}`,
      name: names[index] || commonT("noData"),
      image: image.url,
    })) || [];

  return (
    <section className="w-full py-20 sm:py-24 bg-white">
      <div className="mx-auto max-w-[1600px] px-6 lg:px-8 mb-10 sm:mb-12">
        <Reveal>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#000000] tracking-tight">
            {t("companies")}
          </h2>
        </Reveal>
      </div>
      {companies.length ? (
        <MarqueeLogos companies={companies} />
      ) : (
        <p className="text-center text-sm text-[#64748B]">{commonT("noData")}</p>
      )}
    </section>
  );
}

function LatestNewsSection({ locale }: { locale: string }) {
  const t = useTranslations("news");
  const commonT = useTranslations("common");
  const { posts } = useCmsPostsBySlug(newsCategorySlug);
  const latestNews = posts.slice(0, 3);

  return (
    <section className="w-full py-20 sm:py-24 bg-white">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <Reveal className="mb-10 sm:mb-12">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <div>
              <span className="text-[11px] font-semibold tracking-[0.25em] text-[#EC6707] uppercase mb-4 block">
                {t("title")}
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-[#000000] tracking-tight">
                {t("latest")}
              </h2>
            </div>
            <Link
              href={`/${locale}/news`}
              className="inline-flex items-center gap-2 text-[#EC6707] text-sm font-medium hover:text-[#B35405] transition-colors"
            >
              {t("allNews")}
              <ArrowRight size={16} />
            </Link>
          </div>
        </Reveal>

        {latestNews.length ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {latestNews.map((item, index) => (
            <Reveal key={item._id} delay={index * 0.1}>
              <Link
                href={`/${locale}/news/${item.slug}`}
                className="group block"
              >
                <div className="relative h-56 sm:h-64 overflow-hidden rounded-xl bg-[#E2E8F0] mb-5">
                  {getPostImage(item) && (
                    <div
                      className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                      style={{ backgroundImage: `url('${getPostImage(item)}')` }}
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#000000]/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
                <div className="flex items-center gap-2 text-[12px] text-[#5A6B7C] mb-3">
                  <Calendar size={13} />
                  {formatDate(item.createdAt, locale)}
                </div>
                <h3 className="text-lg sm:text-xl font-semibold text-[#000000] group-hover:text-[#EC6707] transition-colors duration-300 line-clamp-2">
                  {item.title}
                </h3>
              </Link>
            </Reveal>
          ))}
          </div>
        ) : (
        <p className="text-center text-sm text-[#64748B]">{commonT("noData")}</p>
      )}
      </div>
    </section>
  );
}

function Reveal({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default function HomePage() {
  const pathname = usePathname();
  const locale = pathname.split("/")[1] || "mn";

  return (
    <>
      {/* HERO — BOXED PROJECT SLIDER */}
      <HeroSlider locale={locale} />

      <CompaniesSection />

      <LatestNewsSection locale={locale} />
    </>
  );
}
