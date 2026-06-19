"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowRight, Calendar } from "lucide-react";

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

const news = [
  {
    title: "Шинэ төсөл эхлүүллээ",
    date: "2024.12.15",
    excerpt: "Улаанбаатар хотод шинэ орон сууцны төсөл эхлүүллээ. Энэхүү төсөл нь 500 гаруй айлын орон сууцыг багтаасан олон улсын стандартад нийцсэн барилга юм.",
    image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80",
    category: "Барилга",
  },
  {
    title: "Тогтвортой хөгжлийн тайлан",
    date: "2024.11.28",
    excerpt: "2024 оны тогтвортой хөгжлийн тайлангаа танилцууллаа. Байгаль орчны нөлөөллийг 30% бууруулсан.",
    image: "https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?w=800&q=80",
    category: "Тогтвортой хөгжил",
  },
  {
    title: "Шилдэг аж ахуйн нэгж",
    date: "2024.11.10",
    excerpt: "Монгол Улсын шилдэг аж ахуйн нэгжээр шалгаруулав. 18 жилийн туршлага, чанарын стандартаараа тэргүүллээ.",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80",
    category: "Шагнал",
  },
  {
    title: "Олон улсын хамтын ажиллагаа",
    date: "2024.10.25",
    excerpt: "Олон улсын томоохон компаниудтай хамтын ажиллагаагаа өргөжүүллээ. Шинэ технологи нэвтрүүлэхээр боллоо.",
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80",
    category: "Хамтын ажиллагаа",
  },
  {
    title: "Нарны цахилгаан станц ашиглалтанд орлоо",
    date: "2024.10.15",
    excerpt: "Дундговь аймагт баригдсан 10МВт хүчин чадалтай нарны цахилгаан станц ашиглалтанд орлоо.",
    image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800&q=80",
    category: "Эрчим хүч",
  },
  {
    title: "Ажилтнуудаа шагналаа",
    date: "2024.09.30",
    excerpt: "Оны шилдэг ажилтнуудаа шагналаа. Манай хамт олонгийн хөдөлмөрийг үнэлж, урамшуулж байна.",
    image: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&q=80",
    category: "Нийгмийн хариуцлага",
  },
];

export default function NewsPage() {
  const pathname = usePathname();
  const locale = pathname.split("/")[1] || "mn";

  return (
    <>
      {/* HERO */}
      <section className="relative w-full pt-24 pb-16 overflow-hidden bg-[#000000]">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-30"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=1920&q=80')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#000000]/70 via-[#000000]/40 to-[#000000]" />
        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="text-[11px] font-semibold tracking-[0.25em] text-[#EC6707] uppercase mb-6 block">Мэдээ мэдээлэл</span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight mb-5 tracking-tight">
              Мэдээ
            </h1>
          </motion.div>
        </div>
      </section>

      {/* NEWS GRID */}
      <section className="w-full py-24 bg-[#F0F4F8]">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {news.map((item, index) => (
              <Reveal key={item.title} delay={index * 0.1}>
                <Link href="#" className="group block bg-[#F0F4F8] rounded-xl border border-[#E2E8F0] overflow-hidden hover:shadow-xl transition-all duration-500"
                >
                  <div className="relative h-48 overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                      style={{ backgroundImage: `url('${item.image}')` }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#000000]/60 to-transparent" />
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1.5 bg-[#EC6707]/90 backdrop-blur-sm text-white text-[11px] font-medium tracking-wider uppercase rounded-full">
                        {item.category}
                      </span>
                    </div>
                  </div>
                  <div className="p-4">
                    <div className="flex items-center gap-2 text-[11px] text-[#64748B] mb-3">
                      <Calendar size={12} />
                      {item.date}
                    </div>
                    <h3 className="text-xl font-semibold text-[#000000] mb-3 group-hover:text-[#EC6707] transition-colors duration-300 line-clamp-2"
                    >
                      {item.title}
                    </h3>
                    <p className="text-[14px] text-[#64748B] line-clamp-3 mb-4">{item.excerpt}</p>
                    <div className="flex items-center gap-1 text-[#EC6707] text-sm font-medium">
                      Дэлгэрэнгүй
                      <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
