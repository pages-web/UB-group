"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowRight, Calendar, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "@/components/common/Image";

const heroSlides = [
  {
    id: 1,
    titleMn: "Vision Business Tower",
    titleEn: "Vision Business Tower",
    subtitleMn: "26 давхар үйлчилгээний ба оффисын барилга",
    subtitleEn: "26-storey service and office building",
    locationMn: "Хан-Уул дүүрэг, 2025",
    locationEn: "Khan-Uul District, 2025",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1400&q=80",
  },
  {
    id: 2,
    titleMn: "Seoul Garden Residence",
    titleEn: "Seoul Garden Residence",
    subtitleMn: "Орон сууцны хороолол",
    subtitleEn: "Residential complex",
    locationMn: "Хан-Уул дүүрэг, 2026",
    locationEn: "Khan-Uul District, 2026",
    image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1400&q=80",
  },
  {
    id: 3,
    titleMn: "Central Park UB",
    titleEn: "Central Park UB",
    subtitleMn: "Олон үйлдэлт хөгжлийн төсөл",
    subtitleEn: "Mixed-use development",
    locationMn: "Хотын төв, 2026",
    locationEn: "City Center, 2026",
    image: "https://images.unsplash.com/photo-1449844908441-8829872d2607?w=1400&q=80",
  },
  {
    id: 4,
    titleMn: "ITC International Trade Center",
    titleEn: "ITC International Trade Center",
    subtitleMn: "Олон улсын худалдааны төв",
    subtitleEn: "International trade center",
    locationMn: "Сүхбаатар дүүрэг, 2024",
    locationEn: "Sukhbaatar District, 2024",
    image: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=1400&q=80",
  },
  {
    id: 5,
    titleMn: "UB Tower",
    titleEn: "UB Tower",
    subtitleMn: "Дээд зэрэглэлийн оффисын барилга",
    subtitleEn: "Premium office building",
    locationMn: "Баянзүрх дүүрэг, 2027",
    locationEn: "Bayanzurkh District, 2027",
    image: "https://images.unsplash.com/photo-1577495508048-b635879837f1?w=1400&q=80",
  },
  {
    id: 6,
    titleMn: "Eco City",
    titleEn: "Eco City",
    subtitleMn: "Тогтвортой хотын төсөл",
    subtitleEn: "Sustainable city project",
    locationMn: "Төв аймаг, 2028",
    locationEn: "Tuv Province, 2028",
    image: "https://images.unsplash.com/photo-1518005020951-eccb494ad742?w=1400&q=80",
  },
];

const companies = [
  { id: 1, name: "UB Coffee", nameMn: "UB Coffee", image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&q=80" },
  { id: 2, name: "Centric", nameMn: "Centric", image: "https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=400&q=80" },
  { id: 3, name: "itrip", nameMn: "itrip", image: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=400&q=80" },
  { id: 4, name: "Magic Tech", nameMn: "Мэйжик Тек", image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&q=80" },
  { id: 5, name: "Sky Garden", nameMn: "Sky Garden", image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&q=80" },
  { id: 6, name: "Palm Springs", nameMn: "Palm Springs", image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=400&q=80" },
  { id: 7, name: "Sky Park", nameMn: "Sky Park", image: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=400&q=80" },
  { id: 8, name: "Tino", nameMn: "Tino", image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&q=80" },
];

const latestNews = [
  {
    id: 1,
    titleMn: "Vision Business Tower барилгын ажил ахицтай явагдаж байна",
    titleEn: "Vision Business Tower construction progresses",
    date: "2024.06.15",
    image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80",
    slug: "vision-business-tower-progress",
  },
  {
    id: 2,
    titleMn: "Зайсанд шинэ Yoshinoya салбар нээгдлээ",
    titleEn: "New Yoshinoya branch opens in Zaisan",
    date: "2024.05.28",
    image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&q=80",
    slug: "yoshinoya-zaisan-opens",
  },
  {
    id: 3,
    titleMn: "UB Group шилдэг төсөл хэрэгжүүлэгч компаниар шалгарлаа",
    titleEn: "UB Group wins Best Project Implementing Company",
    date: "2024.04.10",
    image: "https://images.unsplash.com/photo-1521791136064-7986c2920216?w=800&q=80",
    slug: "ub-group-best-project-company",
  },
];

function HeroSlider({ locale }: { locale: string }) {
  const [current, setCurrent] = useState(0);
  const isMn = locale === "mn";

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % heroSlides.length);
  }, []);

  const prev = useCallback(() => {
    setCurrent((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
  }, []);

  useEffect(() => {
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [next]);

  const slide = heroSlides[current];

  return (
    <section className="w-full bg-white">
      <div className="mx-[0.5cm] my-[0.5cm] sm:my-[0.5cm] lg:my-[0.5cm]">
        <div className="relative aspect-[16/9] sm:aspect-[21/9] md:aspect-[2.4/1] max-h-[calc(100vh-1cm)] overflow-hidden rounded-3xl sm:rounded-[40px] bg-[#000000] shadow-xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={slide.id}
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url('${slide.image}')` }}
            />
          </AnimatePresence>

          <div className="absolute inset-0 bg-gradient-to-t from-[#000000]/90 via-[#000000]/30 to-[#000000]/20" />

          <div className="absolute inset-0 flex flex-col justify-end p-6 sm:p-10 lg:p-14">
            <motion.div
              key={`text-${slide.id}`}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="max-w-2xl"
            >
              <span className="inline-block px-3 py-1.5 bg-[#EC6707]/90 text-white text-[11px] font-semibold tracking-wider uppercase rounded-full mb-4">
                {isMn ? "Онцлох төсөл" : "Featured Project"}
              </span>
              <h1 className="text-2xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight mb-3 tracking-tight">
                {isMn ? slide.titleMn : slide.titleEn}
              </h1>
              <p className="text-sm sm:text-lg text-white/80 mb-2">
                {isMn ? slide.subtitleMn : slide.subtitleEn}
              </p>
              <p className="text-xs sm:text-sm text-white/60 mb-6">
                {isMn ? slide.locationMn : slide.locationEn}
              </p>
              <Link
                href={`/${locale}/projects`}
                className="inline-flex items-center gap-2 px-6 py-3 bg-white text-[#EC6707] text-sm font-semibold rounded-full hover:bg-[#F0F4F8] transition-colors w-fit"
              >
                {isMn ? "Төслүүд" : "Projects"}
                <ArrowRight size={16} />
              </Link>
            </motion.div>
          </div>

          {/* Navigation arrows */}
          <button
            onClick={prev}
            aria-label={isMn ? "Өмнөх" : "Previous"}
            className="absolute left-4 sm:left-6 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/10 backdrop-blur-sm text-white flex items-center justify-center hover:bg-white/20 transition-colors"
          >
            <ChevronLeft size={22} />
          </button>
          <button
            onClick={next}
            aria-label={isMn ? "Дараах" : "Next"}
            className="absolute right-4 sm:right-6 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/10 backdrop-blur-sm text-white flex items-center justify-center hover:bg-white/20 transition-colors"
          >
            <ChevronRight size={22} />
          </button>

          {/* Dots */}
          <div className="absolute bottom-5 sm:bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-2">
            {heroSlides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrent(index)}
                aria-label={`${isMn ? "Слайд" : "Slide"} ${index + 1}`}
                className={`w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full transition-all duration-300 ${
                  index === current ? "bg-white w-6 sm:w-8" : "bg-white/40 hover:bg-white/60"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function MarqueeLogos({ locale }: { locale: string }) {
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
                    alt={locale === "mn" ? company.nameMn : company.name}
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
  const isMn = locale === "mn";

  return (
    <>
      {/* HERO — BOXED PROJECT SLIDER */}
      <HeroSlider locale={locale} />

      {/* SECTION 2 — COMPANIES LOGO MARQUEE */}
      <section className="w-full py-20 sm:py-24 bg-white">
        <div className="mx-auto max-w-[1600px] px-6 lg:px-8 mb-10 sm:mb-12">
          <Reveal>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#000000] tracking-tight">
              {isMn ? "Компаниуд" : "Companies & Subsidiaries"}
            </h2>
          </Reveal>
        </div>
        <MarqueeLogos locale={locale} />
      </section>

      {/* SECTION 3 — LATEST NEWS */}
      <section className="w-full py-20 sm:py-24 bg-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <Reveal className="mb-10 sm:mb-12">
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
              <div>
                <span className="text-[11px] font-semibold tracking-[0.25em] text-[#EC6707] uppercase mb-4 block">
                  {isMn ? "Мэдээ мэдээлэл" : "News & Updates"}
                </span>
                <h2 className="text-3xl sm:text-4xl font-bold text-[#000000] tracking-tight">
                  {isMn ? "Мэдээ, мэдээлэл" : "Latest News"}
                </h2>
              </div>
              <Link
                href={`/${locale}/news`}
                className="inline-flex items-center gap-2 text-[#EC6707] text-sm font-medium hover:text-[#B35405] transition-colors"
              >
                {isMn ? "Бүх мэдээ" : "All News"}
                <ArrowRight size={16} />
              </Link>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {latestNews.map((item, index) => (
              <Reveal key={item.id} delay={index * 0.1}>
                <Link
                  href={`/${locale}/news/${item.slug}`}
                  className="group block"
                >
                  <div className="relative h-56 sm:h-64 overflow-hidden rounded-xl bg-[#E2E8F0] mb-5">
                    <div
                      className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                      style={{ backgroundImage: `url('${item.image}')` }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#000000]/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </div>
                  <div className="flex items-center gap-2 text-[12px] text-[#5A6B7C] mb-3">
                    <Calendar size={13} />
                    {item.date}
                  </div>
                  <h3 className="text-lg sm:text-xl font-semibold text-[#000000] group-hover:text-[#EC6707] transition-colors duration-300 line-clamp-2">
                    {isMn ? item.titleMn : item.titleEn}
                  </h3>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
