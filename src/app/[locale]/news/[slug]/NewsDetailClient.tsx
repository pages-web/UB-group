"use client";

import Link from "next/link";
import { ArrowLeft, Calendar } from "lucide-react";
import { useTranslations } from "next-intl";
import { CmsContent } from "@/components/common/CmsContent";
import { usePostDetail } from "@/hooks/usePostDetail";
import { CmsPost } from "@/types/cmsPostType";

const getPostImage = (post: CmsPost) => post.thumbnail?.url || post.images?.[0]?.url || "";

const formatDate = (date: string, locale: string) =>
  new Date(date).toLocaleDateString(locale === "mn" ? "mn-MN" : "en-US", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });

export default function NewsDetailClient({
  locale,
  slug,
}: {
  locale: string;
  slug: string;
}) {
  const t = useTranslations("news");
  const commonT = useTranslations("common");
  const noDataText = commonT("noData");
  const { loading, post } = usePostDetail(slug);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-[#64748B]">{commonT("loading")}</p>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-[#64748B]">{t("notFound")}</p>
      </div>
    );
  }

  const image = getPostImage(post);

  return (
    <>
      <section className="relative w-full pt-28 pb-16 sm:pb-20 overflow-hidden bg-[#000000]">
        {image && (
          <div
            className="absolute inset-0 bg-cover bg-center opacity-25"
            style={{ backgroundImage: `url('${image}')` }}
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-[#000000]/70 via-[#000000]/50 to-[#000000]" />
        <div className="relative mx-auto max-w-4xl px-6 lg:px-8">
          <Link
            href={`/${locale}/news`}
            className="inline-flex items-center gap-2 text-white/70 hover:text-white text-sm mb-6 transition-colors"
          >
            <ArrowLeft size={16} />
            {t("allNews")}
          </Link>
          <div className="flex items-center gap-2 text-[12px] text-[#EC6707] mb-4">
            <Calendar size={13} />
            {formatDate(post.createdAt, locale)}
          </div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white leading-tight tracking-tight">
            {post.title}
          </h1>
        </div>
      </section>

      <section className="w-full py-12 sm:py-16 bg-white">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          {image && (
            <div
              className="relative h-64 sm:h-80 lg:h-[420px] w-full rounded-xl bg-cover bg-center mb-10"
              style={{ backgroundImage: `url('${image}')` }}
            />
          )}
          <CmsContent
            html={post.content || noDataText}
            className="prose prose-lg max-w-none text-[#1E293B] leading-relaxed"
          />
        </div>
      </section>
    </>
  );
}
