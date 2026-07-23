"use client";

import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import {
  ArrowRight,
  Eye,
  Target,
  Star,
  ChevronLeft,
  ChevronRight,
  Quote,
} from "lucide-react";
import { CmsContent } from "@/components/common/CmsContent";
import { useCmsCategories } from "@/hooks/useCmsCategories";
import { useCmsPostByType } from "@/hooks/useCmsPostByType";
import { useCmsPostsBySlug } from "@/hooks/useCmsPostsBySlug";
import { usePageBySlug } from "@/hooks/usePageBySlug";
import { CmsPost } from "@/types/cmsPostType";
import { getCmsFileUrl } from "@/utils/utils";

const historyCategorySlug = "kompaniin-tuukh";
const visionCategorySlug = "alsyn-kharaa-erkhem-zorilgo-unet-zuils";
const achievementsCategorySlug = "bidnii-ololt-amjilt_2";
const chairmanCategorySlug = "tuz-iin-darga";
const clientPortalId = "3VGniCFkSThuWpzd9JfaH";
const managementTeamPostType = "managment_team";
const managementTeamCategorySlug = "udirdlagyn-bag";
const constructionLeadershipPostType = "construction_industry_management_team";
const constructionLeadershipCategorySlug =
  "buteen-baiguulaltyn-salbaryn-udirdlagyn-bag";

const getPostImage = (post: CmsPost) =>
  getCmsFileUrl(post.thumbnail?.url || post.images?.[0]?.url);

/* ─── Reveal wrapper ─── */
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
      transition={{
        duration: 0.9,
        delay,
        ease: [0.16, 1, 0.3, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ─── Animated counter ─── */
function AnimatedCounter({
  value,
  suffix = "",
}: {
  value: number;
  suffix?: string;
}) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (!isInView) return;
    const duration = 2000;
    const startTime = Date.now();
    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easeOut = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(easeOut * value));
      if (progress >= 1) clearInterval(interval);
    }, 16);
    return () => clearInterval(interval);
  }, [isInView, value]);

  return (
    <span ref={ref} className="tabular-nums">
      {count}
      {suffix}
    </span>
  );
}

/* ─── Chairman message section ─── */
function ChairmanSection() {
  const t = useTranslations("about");
  const commonT = useTranslations("common");
  const noDataText = commonT("noData");
  const { posts } = useCmsPostsBySlug(chairmanCategorySlug);
  const post = posts[0];
  const role = post?.categories?.[0]?.name || noDataText;
  const image = post ? getPostImage(post) : "";

  return (
    <section className="w-full py-20 lg:py-28 bg-[#F0F4F8]">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <Reveal>
            <div className="relative">
              <div className="absolute -inset-4 lg:-inset-6 bg-white rounded-3xl shadow-lg" />
              <div
                className="relative h-[420px] lg:h-[520px] bg-cover bg-center rounded-2xl overflow-hidden shadow-xl"
                style={
                  image ? { backgroundImage: `url('${image}')` } : undefined
                }
              >
                <div className="absolute inset-0 bg-gradient-to-t from-[#000000]/50 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                  <p className="text-white/80 text-sm font-medium tracking-wider uppercase mb-1">
                    {role}
                  </p>
                  <p className="text-white text-2xl font-bold">
                    {post?.title || noDataText}
                  </p>
                </div>
                {!image && (
                  <div className="absolute inset-0 flex items-center justify-center text-sm text-white/70">
                    {noDataText}
                  </div>
                )}
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="lg:pl-4">
              <span className="text-[11px] font-semibold tracking-[0.25em] text-[#EC6707] uppercase mb-5 block">
                {t("chairmanMessage")}
              </span>
              <CmsContent
                html={post?.content || noDataText}
                className="mb-10 text-[#334155] [&_h2]:text-3xl sm:[&_h2]:text-4xl lg:[&_h2]:text-[42px] [&_h2]:font-bold [&_h2]:text-[#000000] [&_h2]:leading-tight [&_h2]:mb-8 [&_p]:text-[15px] lg:[&_p]:text-base [&_p]:leading-[1.85] [&_p]:text-[#334155]"
              />
              <div className="flex items-start gap-4 p-6 bg-white rounded-2xl border-l-4 border-[#EC6707] shadow-sm">
                <Quote className="shrink-0 text-[#EC6707]" size={28} />
                <div>
                  <p className="text-[15px] text-[#334155] italic leading-relaxed mb-3">
                    {post?.excerpt || noDataText}
                  </p>
                  <p className="text-sm font-semibold text-[#000000]">
                    {post?.title || noDataText}
                  </p>
                  <p className="text-xs text-[#64748B]">{role}</p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

type LeadershipDepartment = {
  id: string;
  title: string;
  members: {
    name: string;
    role?: string;
    image?: string;
  }[];
};

/* ─── Teso-style history timeline ─── */
function HistoryTimeline({ locale }: { locale: string }) {
  const t = useTranslations("about");
  const commonT = useTranslations("common");
  const noDataText = commonT("noData");
  const { posts } = useCmsPostsBySlug(historyCategorySlug);
  const items = [...posts]
    .sort((a, b) => Number(b.title) - Number(a.title))
    .map((post) => ({
      title: post.title,
      content: post.content || noDataText,
      images: post.images?.map((image) => image.url) || [],
    }));
  const [activeIndex, setActiveIndex] = useState(0);

  if (!items.length) {
    return (
      <section className="w-full pt-4 pb-20 lg:pb-28 bg-[#F0F4F8] overflow-hidden">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 mb-10 lg:mb-14">
          <Reveal className="text-center">
            <span className="text-[11px] font-semibold tracking-[0.25em] text-[#EC6707] uppercase mb-4 block">
              {t("journey")}
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#000000] tracking-tight">
              {t("companyHistory")}
            </h2>
            <p className="mt-6 text-sm text-[#64748B]">{noDataText}</p>
          </Reveal>
        </div>
      </section>
    );
  }

  const currentIndex = activeIndex % items.length;
  const activeItem = items[currentIndex];
  const years = items.map((i) => i.title);

  const move = (direction: "left" | "right") => {
    setActiveIndex((prev) => {
      if (direction === "left") return Math.max(prev - 1, 0);
      return Math.min(prev + 1, items.length - 1);
    });
  };

  return (
    <section className="w-full pt-4 pb-20 lg:pb-28 bg-[#F0F4F8] overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 lg:px-8 mb-10 lg:mb-14">
        <Reveal className="text-center">
          <span className="text-[11px] font-semibold tracking-[0.25em] text-[#EC6707] uppercase mb-4 block">
            {t("journey")}
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#000000] tracking-tight">
            {t("companyHistory")}
          </h2>
        </Reveal>
      </div>

      {/* Year selector pill */}
      <Reveal className="mx-auto max-w-7xl px-6 lg:px-8 mb-12 lg:mb-16">
        <div className="flex items-center justify-between gap-4 bg-white rounded-full px-6 sm:px-8 lg:px-12 py-5 shadow-sm border border-[#E2E8F0] w-full max-w-6xl mx-auto">
          <button
            onClick={() => move("left")}
            disabled={currentIndex === 0}
            aria-label={commonT("previous")}
            className="w-12 h-12 rounded-full flex items-center justify-center text-[#000000] hover:bg-[#F0F4F8] disabled:opacity-30 disabled:cursor-not-allowed transition-colors shrink-0"
          >
            <ChevronLeft size={22} />
          </button>

          <div className="flex items-center justify-center gap-3 sm:gap-4 lg:gap-5 overflow-x-auto scrollbar-hide px-2 flex-1">
            {years.map((year, index) => (
              <button
                key={year}
                onClick={() => setActiveIndex(index)}
                className={`text-sm sm:text-base lg:text-lg font-semibold whitespace-nowrap transition-colors duration-300 ${
                  index === currentIndex
                    ? "text-[#EC6707]"
                    : "text-[#64748B] hover:text-[#000000]"
                }`}
              >
                {year}
              </button>
            ))}
          </div>

          <button
            onClick={() => move("right")}
            disabled={currentIndex === items.length - 1}
            aria-label={commonT("next")}
            className="w-12 h-12 rounded-full flex items-center justify-center text-[#000000] hover:bg-[#F0F4F8] disabled:opacity-30 disabled:cursor-not-allowed transition-colors shrink-0"
          >
            <ChevronRight size={22} />
          </button>
        </div>
      </Reveal>

      {/* Content grid */}
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeItem.title}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -24 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-14 items-start"
          >
            {/* Image grid */}
            <div className="grid grid-cols-3 gap-3 lg:gap-4">
              {activeItem.images.length ? (
                activeItem.images.map((src, index) => (
                  <motion.div
                    key={`${activeItem.title}-${index}`}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, delay: index * 0.06 }}
                    className={`relative overflow-hidden rounded-xl lg:rounded-2xl bg-[#E2E8F0] ${
                      index === 0 ? "col-span-2 row-span-2" : ""
                    }`}
                  >
                    <div
                      className="w-full h-full bg-cover bg-center"
                      style={{
                        backgroundImage: `url('${src}')`,
                        aspectRatio: index === 0 ? "4/3" : "4/3",
                      }}
                    />
                  </motion.div>
                ))
              ) : (
                <div className="col-span-3 rounded-xl lg:rounded-2xl bg-[#E2E8F0] p-8 text-center text-sm text-[#64748B]">
                  {noDataText}
                </div>
              )}
            </div>

            {/* Text content */}
            <div className="lg:pt-4">
              <span className="text-[#EC6707] text-5xl lg:text-7xl font-bold tracking-tight block mb-6">
                {activeItem.title}
              </span>
              <CmsContent
                html={activeItem.content}
                className="text-[#334155] [&_p]:text-[15px] lg:[&_p]:text-base [&_ul]:space-y-4 [&_li]:text-[15px] lg:[&_li]:text-base"
              />
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}

/* ─── Leadership departments with horizontal swipe ─── */
function TeamSlider({
  locale,
  postTypeName,
  parentCategorySlug,
  headingTop,
  headingBottom,
}: {
  locale: string;
  postTypeName: string;
  parentCategorySlug: string;
  headingTop: string;
  headingBottom: string;
}) {
  const commonT = useTranslations("common");
  const noDataText = commonT("noData");
  const { posts } = useCmsPostByType(postTypeName);
  const { categories } = useCmsCategories(clientPortalId, locale);
  const categoryNames = new Map(
    categories
      .filter((category) => category.parent?.slug === parentCategorySlug)
      .map((category) => [category._id, category.name]),
  );
  const cmsDepartments = Object.values(
    posts.reduce<Record<string, LeadershipDepartment>>((groups, post) => {
      const categories = post.categories ?? [];

      categories.forEach((category) => {
        const categoryId = category._id;
        const categoryName = categoryNames.get(categoryId);
        if (!categoryName) return;
        const group = groups[categoryId] || {
          id: categoryId,
          title: categoryName,
          members: [],
        };

        group.members.push({
          name: post.title,
          role: post.excerpt,
          image: getPostImage(post),
        });
        groups[categoryId] = group;
      });

      return groups;
    }, {}),
  );

  return (
    <section className="w-full py-20 lg:py-28 bg-[#F0F4F8]">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <Reveal className="text-center mb-14 lg:mb-20">
          <div className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight tracking-tight">
            <span className="text-[#EC6707] text-2xl sm:text-3xl lg:text-4xl block">
              {headingTop}
            </span>
            <span className="text-[#000000] text-xl sm:text-2xl lg:text-3xl block">
              {headingBottom}
            </span>
          </div>
        </Reveal>

        <div className="space-y-16 lg:space-y-24">
          {cmsDepartments.length ? (
            cmsDepartments.map((dept, deptIndex) => (
              <DepartmentRow key={dept.id} dept={dept} deptIndex={deptIndex} />
            ))
          ) : (
            <p className="text-center text-sm text-[#64748B]">{noDataText}</p>
          )}
        </div>
      </div>
    </section>
  );
}

function DepartmentRow({
  dept,
  deptIndex,
}: {
  dept: LeadershipDepartment;
  deptIndex: number;
}) {
  const commonT = useTranslations("common");
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 4);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
  };

  useEffect(() => {
    checkScroll();
    const el = scrollRef.current;
    if (!el) return;
    el.addEventListener("scroll", checkScroll, { passive: true });
    window.addEventListener("resize", checkScroll);
    return () => {
      el.removeEventListener("scroll", checkScroll);
      window.removeEventListener("resize", checkScroll);
    };
  }, []);

  const scroll = (direction: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;
    const cardWidth = 280 + 16;
    el.scrollBy({
      left: direction === "left" ? -cardWidth : cardWidth,
      behavior: "smooth",
    });
  };

  return (
    <Reveal delay={deptIndex * 0.1}>
      <div>
        <h3 className="text-2xl lg:text-3xl font-bold text-center text-[#000000] mb-8 lg:mb-10">
          {dept.title}
        </h3>

        <div className="relative group/slider">
          <button
            onClick={() => scroll("left")}
            disabled={!canScrollLeft}
            aria-label={commonT("previous")}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 lg:-translate-x-6 w-11 h-11 rounded-full bg-white border border-[#E2E8F0] text-[#000000] shadow-md flex items-center justify-center hover:bg-[#EC6707] hover:text-white hover:border-[#EC6707] transition-all z-10 disabled:opacity-0 disabled:pointer-events-none"
          >
            <ChevronLeft size={20} />
          </button>

          <div
            ref={scrollRef}
            className="flex gap-4 overflow-x-auto snap-x snap-mandatory scrollbar-hide px-1 pb-4"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {dept.members.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.08,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="relative shrink-0 w-[260px] sm:w-[280px] snap-start bg-[#1A1A1A] rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow"
              >
                <div className="relative aspect-[3/4] overflow-hidden">
                  <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={
                      member.image
                        ? { backgroundImage: `url('${member.image}')` }
                        : undefined
                    }
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#000000]/90 via-[#000000]/20 to-transparent" />
                </div>

                <div className="absolute bottom-0 left-0 right-0 p-5 lg:p-6">
                  <p className="text-white/60 text-[11px] font-medium tracking-wider uppercase mb-1">
                    {dept.title}
                  </p>
                  <h4 className="text-white text-xl lg:text-2xl font-bold mb-1">
                    {member.name}
                  </h4>
                  <p className="text-white/70 text-sm leading-snug">
                    {member.role}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          <button
            onClick={() => scroll("right")}
            disabled={!canScrollRight}
            aria-label={commonT("next")}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 lg:translate-x-6 w-11 h-11 rounded-full bg-white border border-[#E2E8F0] text-[#000000] shadow-md flex items-center justify-center hover:bg-[#EC6707] hover:text-white hover:border-[#EC6707] transition-all z-10 disabled:opacity-0 disabled:pointer-events-none"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
    </Reveal>
  );
}

export default function AboutPage() {
  const t = useTranslations("about");
  const commonT = useTranslations("common");
  const pathname = usePathname();
  const locale = pathname.split("/")[1] || "mn";
  const noDataText = commonT("noData");
  const { posts: visionPosts } = useCmsPostsBySlug(visionCategorySlug);
  const { posts: achievementPosts } = useCmsPostsBySlug(
    achievementsCategorySlug,
  );
  const { page } = usePageBySlug("about");
  const { page: finalPage } = usePageBySlug("contact");

  const visionIcons = [Eye, Target, Star];
  const visionCards = visionPosts
    .map((post) => ({
      id: post._id,
      title: post.title,
      text: post.content || noDataText,
    }))
    .slice(0, 3);
  const metricLabels: Record<string, { label: string; suffix: string }> = {
    experience: { label: t("metricExperience"), suffix: "+" },
    completedProjects: { label: t("metricCompletedProjects"), suffix: "+" },
    Employees: { label: t("metricEmployees"), suffix: "+" },
    partners: { label: t("metricPartners"), suffix: "+" },
    Investment: { label: t("metricInvestment"), suffix: "T+" },
  };
  const metrics = achievementPosts[0]?.customFieldsMap?.keyMetric as
    | Record<string, string>
    | undefined;
  const aboutStats = metrics
    ? Object.entries(metrics)
        .filter(([, value]) => value)
        .map(([key, value]) => ({
          value: Number(value),
          suffix: metricLabels[key]?.suffix || "",
          label: metricLabels[key]?.label || key,
        }))
    : [];

  return (
    <div>
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

      {/* CHAIRMAN MESSAGE */}
      <ChairmanSection />

      {/* VISION, MISSION & VALUES */}
      <section className="w-full py-16 lg:py-12 bg-[#E8EEF4]">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <Reveal className="text-center mb-5">
            <span className="text-[11px] font-semibold tracking-[0.2em] text-[#EC6707] uppercase mb-4 block">
              {t("foundation")}
            </span>
            <h2 className="text-3xl lg:text-xl font-bold text-[#000000] tracking-tight">
              {t("visionMissionValues")}
            </h2>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {visionCards.length ? (
              visionCards.map((card, index) => {
                const Icon = visionIcons[index];

                return (
                  <Reveal key={card.id} delay={index * 0.1}>
                    <div className="bg-[#F0F4F8] rounded-2xl p-4 text-center flex flex-col items-center h-full shadow-sm border border-[#E2E8F0]">
                      <div className="w-20 h-20 rounded-full border border-[#EC6707]/20 flex items-center justify-center mb-5">
                        <Icon
                          size={32}
                          className="text-[#EC6707]"
                          strokeWidth={1.5}
                        />
                      </div>
                      <h3 className="text-xl font-bold text-[#000000] mb-6">
                        {card.title}
                      </h3>
                      <p className="text-[15px] text-[#334155] leading-relaxed flex-grow">
                        {card.text}
                      </p>
                    </div>
                  </Reveal>
                );
              })
            ) : (
              <p className="md:col-span-3 text-center text-sm text-[#64748B]">
                {noDataText}
              </p>
            )}
          </div>
        </div>
      </section>

      {/* STATISTICS */}
      <section className="w-full py-16 bg-[#F0F4F8]">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <Reveal className="text-center mb-6">
            <span className="text-[11px] font-semibold tracking-[0.2em] text-[#EC6707] uppercase mb-4 block">
              {t("byNumbers")}
            </span>
            <h2 className="text-xl font-bold text-[#000000] tracking-tight">
              {t("statsTitle")}
            </h2>
          </Reveal>
          <div className="grid grid-cols-2 lg:grid-cols-5 gap-5">
            {aboutStats.length ? (
              aboutStats.map((stat, index) => (
                <Reveal key={stat.label} delay={index * 0.1}>
                  <div className="bg-[#F0F4F8] border border-[#E2E8F0] rounded-2xl text-center p-5 shadow-sm">
                    <div className="text-4xl lg:text-5xl font-bold text-[#EC6707] mb-4 tracking-tight">
                      <AnimatedCounter
                        value={stat.value}
                        suffix={stat.suffix}
                      />
                    </div>
                    <div className="h-px w-12 bg-[#EC6707]/20 mx-auto mb-4" />
                    <div className="text-[12px] text-[#64748B] tracking-[0.15em] uppercase">
                      {stat.label}
                    </div>
                  </div>
                </Reveal>
              ))
            ) : (
              <p className="col-span-2 lg:col-span-5 text-center text-sm text-[#64748B]">
                {noDataText}
              </p>
            )}
          </div>
        </div>
      </section>

      {/* TIMELINE — horizontal scroll */}
      <HistoryTimeline locale={locale} />

      {/* TEAM — leadership slider */}
      <TeamSlider
        locale={locale}
        postTypeName={managementTeamPostType}
        parentCategorySlug={managementTeamCategorySlug}
        headingTop={t("leadership")}
        headingBottom={t("teamShort")}
      />

      {/* CONSTRUCTION LEADERSHIP TEAM */}
      <TeamSlider
        locale={locale}
        postTypeName={constructionLeadershipPostType}
        parentCategorySlug={constructionLeadershipCategorySlug}
        headingTop={t("constructionLeadershipTop")}
        headingBottom={t("constructionLeadershipBottom")}
      />

      {/* CTA + SLOGAN */}
      <section className="relative w-full py-16 lg:py-20 overflow-hidden bg-[#000000]">
        {finalPage?.thumbnail?.url && (
          <div
            className="absolute inset-0 bg-cover bg-center opacity-10"
            style={{ backgroundImage: `url('${finalPage.thumbnail.url}')` }}
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-[#000000]/80 via-[#000000]/60 to-[#000000]/80" />
        <div className="relative mx-auto max-w-7xl px-6 lg:px-8 text-center">
          <Reveal>
            <h2 className="text-4xl lg:text-6xl font-bold text-white leading-tight mb-6 tracking-tight">
              {finalPage?.name || noDataText}
            </h2>
            <CmsContent
              html={finalPage?.description || noDataText}
              className="mx-auto mb-8 max-w-xl text-lg text-white/60 [&_p]:text-lg [&_p]:text-white/60 [&_p]:leading-relaxed"
            />
            <Link
              href={`/${locale}/contact`}
              className="group inline-flex items-center gap-3 px-10 py-5 bg-[#EC6707] text-white text-sm font-semibold tracking-wide hover:bg-[#B35405] transition-all duration-500 rounded-sm"
            >
              {t("contactUs")}
              <ArrowRight
                size={18}
                className="group-hover:translate-x-1 transition-transform"
              />
            </Link>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
