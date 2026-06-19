import { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Calendar } from "lucide-react";

const newsArticles: Record<
  string,
  {
    titleMn: string;
    titleEn: string;
    date: string;
    image: string;
    contentMn: string;
    contentEn: string;
  }
> = {
  "vision-business-tower-progress": {
    titleMn: "Vision Business Tower барилгын ажил ахицтай явагдаж байна",
    titleEn: "Vision Business Tower construction progresses",
    date: "2024.06.15",
    image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1200&q=80",
    contentMn:
      "Vision Business Tower барилгын ажил төлөвлөсөн хуваарийн дагуу ахицтай явагдаж байна. Энэхүү 26 давхар үйлчилгээний ба оффисын барилга нь Монгол Улсын барилгын салбарт шинэ стандартыг тогтоохоор төлөвлөгдсөн. Барилгын бүтээцийн ажил 80% бүрэн болсон бөгөөд 2025 онд ашиглалтанд орох төлөвлөгөөтэй байна.",
    contentEn:
      "The construction of Vision Business Tower is progressing according to schedule. This 26-storey service and office building is planned to set new standards in Mongolia's construction sector. Structural work is 80% complete, with handover scheduled for 2025.",
  },
  "yoshinoya-zaisan-opens": {
    titleMn: "Зайсанд шинэ Yoshinoya салбар нээгдлээ",
    titleEn: "New Yoshinoya branch opens in Zaisan",
    date: "2024.05.28",
    image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1200&q=80",
    contentMn:
      "UB Group-ийн Lifestyle салбарын хүрээнд Японы алдарт Yoshinoya сүлжээ рестораны шинэ салбар Зайсан бүсэд нээгдлээ. Энэхүү салбар нь өдөрт 300 гаруй зочид хүлээн авах хүчин чадалтай бөгөөд Монголын хэрэглэгчдэд жинхэнэ япон амтыг хүргэнэ.",
    contentEn:
      "A new branch of the famous Japanese Yoshinoya restaurant chain has opened in the Zaisan area under UB Group's Lifestyle division. The branch has a capacity to serve over 300 guests daily, bringing authentic Japanese flavors to Mongolian consumers.",
  },
  "ub-group-best-project-company": {
    titleMn: "UB Group шилдэг төсөл хэрэгжүүлэгч компаниар шалгарлаа",
    titleEn: "UB Group wins Best Project Implementing Company",
    date: "2024.04.10",
    image: "https://images.unsplash.com/photo-1521791136064-7986c2920216?w=1200&q=80",
    contentMn:
      "Монгол Улсын Барилга, хот байгуулалтын яамнаас зохион байгуулсан «Шилдэг төсөл хэрэгжүүлэгч компани» шалгаруулалтад UB Group тэргүүллээ. Энэхүү шагнал нь компанийн чанар, хугацаа, инновацийн төслүүдийг хүлээн зөвшөөрсөн хэрэг юм.",
    contentEn:
      "UB Group was named Best Project Implementing Company at an awards ceremony organized by Mongolia's Ministry of Construction and Urban Development. This award recognizes the company's commitment to quality, timely delivery, and innovative projects.",
  },
};

export function generateStaticParams() {
  return Object.keys(newsArticles).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const article = newsArticles[slug];
  if (!article) return {};
  return {
    title: locale === "mn" ? article.titleMn : article.titleEn,
  };
}

export default async function NewsDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const isMn = locale === "mn";
  const article = newsArticles[slug];

  if (!article) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-[#64748B]">{isMn ? "Мэдээ олдсонгүй" : "News not found"}</p>
      </div>
    );
  }

  return (
    <>
      <section className="relative w-full pt-28 pb-16 sm:pb-20 overflow-hidden bg-[#000000]">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-25"
          style={{ backgroundImage: `url('${article.image}')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#000000]/70 via-[#000000]/50 to-[#000000]" />
        <div className="relative mx-auto max-w-4xl px-6 lg:px-8">
          <Link
            href={`/${locale}/news`}
            className="inline-flex items-center gap-2 text-white/70 hover:text-white text-sm mb-6 transition-colors"
          >
            <ArrowLeft size={16} />
            {isMn ? "Бүх мэдээ" : "All News"}
          </Link>
          <div className="flex items-center gap-2 text-[12px] text-[#EC6707] mb-4">
            <Calendar size={13} />
            {article.date}
          </div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white leading-tight tracking-tight">
            {isMn ? article.titleMn : article.titleEn}
          </h1>
        </div>
      </section>

      <section className="w-full py-12 sm:py-16 bg-white">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <div
            className="relative h-64 sm:h-80 lg:h-[420px] w-full rounded-xl bg-cover bg-center mb-10"
            style={{ backgroundImage: `url('${article.image}')` }}
          />
          <div className="prose prose-lg max-w-none text-[#1E293B] leading-relaxed">
            <p>{isMn ? article.contentMn : article.contentEn}</p>
          </div>
        </div>
      </section>
    </>
  );
}
