"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowRight, Calendar, ChevronDown } from "lucide-react";
import { useTranslations } from "next-intl";
import { CmsContent } from "@/components/common/CmsContent";
import { useCmsPostsBySlug } from "@/hooks/useCmsPostsBySlug";
import { usePageBySlug } from "@/hooks/usePageBySlug";
import { CmsPost } from "@/types/cmsPostType";

function Reveal({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
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

const newsCategorySlug = "medee-medeelel";

const getPostImage = (post: CmsPost) => post.thumbnail?.url || post.images?.[0]?.url || "";
const getNewsType = (post: CmsPost) => {
  const news = post.customFieldsMap?.news as { type?: string[] } | undefined;
  return Array.isArray(news?.type) ? news.type[0] : "";
};

const formatDate = (date: string, locale: string) =>
  new Date(date).toLocaleDateString(locale === "mn" ? "mn-MN" : "en-US", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });

const INITIAL_ROWS = 2;
const CARDS_PER_ROW = 3;
const INITIAL_COUNT = INITIAL_ROWS * CARDS_PER_ROW;

export default function NewsPage() {
  const t = useTranslations("news");
  const commonT = useTranslations("common");
  const pathname = usePathname();
  const locale = pathname.split("/")[1] || "mn";
  const noDataText = commonT("noData");
  const allCategory = commonT("all");
  const { page } = usePageBySlug("news");
  const { posts: news } = useCmsPostsBySlug(newsCategorySlug);

  const [activeCategory, setActiveCategory] = useState(allCategory);
  const [visibleCount, setVisibleCount] = useState(INITIAL_COUNT);

  const categories = useMemo(() => {
    const types = news.map(getNewsType).filter(Boolean);
    return [allCategory, ...Array.from(new Set(types))];
  }, [allCategory, news]);

  const filteredNews = useMemo(() => {
    if (activeCategory === allCategory) return news;
    return news.filter((item) => getNewsType(item) === activeCategory);
  }, [activeCategory, allCategory, news]);

  const visibleNews = filteredNews.slice(0, visibleCount);
  const hasMore = visibleCount < filteredNews.length;

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
    setVisibleCount(INITIAL_COUNT);
  };

  const handleLoadMore = () => {
    setVisibleCount((prev) => Math.min(prev + CARDS_PER_ROW, filteredNews.length));
  };

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

      {/* NEWS GRID */}
      <section className="w-full py-24 bg-[#F0F4F8]">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          {/* FILTER */}
          <Reveal className="mb-10">
            <div className="flex flex-wrap items-center justify-center gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => handleCategoryChange(category)}
                  className={`px-5 py-2.5 rounded-full text-sm font-medium tracking-wide transition-all duration-300 ${
                    activeCategory === category
                      ? "bg-[#EC6707] text-white shadow-md"
                      : "bg-white text-[#334155] border border-[#E2E8F0] hover:border-[#EC6707] hover:text-[#EC6707]"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </Reveal>

          {/* GRID */}
          {visibleNews.length ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {visibleNews.map((item, index) => (
                <Reveal key={item._id} delay={index * 0.08}>
                  <Link
                    href={`/${locale}/news/${item.slug}`}
                    className="group relative block w-full aspect-[3/4] rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-700"
                  >
                    {getPostImage(item) && (
                      <div
                        className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                        style={{ backgroundImage: `url('${getPostImage(item)}')` }}
                      />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#000000]/90 via-[#000000]/30 to-transparent" />
                    <div className="absolute inset-x-0 bottom-0 p-6">
                      <span className="inline-block px-3 py-1.5 mb-4 bg-[#EC6707]/90 backdrop-blur-sm text-white text-[11px] font-medium tracking-wider uppercase rounded-full">
                        {getNewsType(item) || noDataText}
                      </span>
                      <div className="flex items-center gap-2 text-[11px] text-white/70 mb-3">
                        <Calendar size={12} />
                        {formatDate(item.createdAt, locale)}
                      </div>
                      <h3 className="text-lg font-bold text-white mb-3 leading-snug line-clamp-2 group-hover:text-[#EC6707] transition-colors duration-300">
                        {item.title}
                      </h3>
                      <p className="text-sm text-white/80 line-clamp-2 mb-4">
                        {item.excerpt || noDataText}
                      </p>
                      <div className="inline-flex items-center gap-1 text-[#EC6707] text-sm font-semibold">
                        {t("readMore")}
                        <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </Link>
                </Reveal>
              ))}
            </div>
          ) : (
            <p className="text-center text-sm text-[#64748B]">{noDataText}</p>
          )}

          {/* LOAD MORE */}
          {hasMore && (
            <Reveal className="flex justify-center mt-14">
              <button
                onClick={handleLoadMore}
                className="group inline-flex items-center gap-2 px-8 py-4 bg-white border border-[#E2E8F0] text-[#334155] text-sm font-semibold rounded-full hover:border-[#EC6707] hover:text-[#EC6707] transition-all duration-300 shadow-sm hover:shadow-md"
              >
                {t("loadMore")}
                <ChevronDown size={16} className="group-hover:translate-y-0.5 transition-transform" />
              </button>
            </Reveal>
          )}
        </div>
      </section>
    </>
  );
}
