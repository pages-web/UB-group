"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ArrowRight,
  Award,
  FileCheck,
  Leaf,
  Handshake,
  Eye,
  Target,
  Star,
  Building2,
  TrendingUp,
  Sparkles,
  Truck,
} from "lucide-react";

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

const timeline = [
  { year: "2006", title: "Дорнын Их Гэгээ ХХК", desc: "Улаанбаатар групп нь Дорнын Их Гэгээ ХХК нэртэйгээр анх үүсгэн байгуулагдав." },
  { year: "2009", title: "Газрын тосны тээвэр", desc: "Монгол Улсын хамгийн анхны газрын тосны технологийн тээвэр эрхэлсэн 100% үндэсний хөрөнгө оруулалттай компани болов." },
  { year: "2010", title: "Газрын тос боловсруулах", desc: "Монголд анх удаа газрын тос боловсруулах үйлдвэрийг нөхөн сэргээв. Түүхий газрын тосны тээвэрлэлтийн үйл ажиллагааг эхлүүлэв." },
  { year: "2011", title: "Евро стандартын үйлдвэр", desc: "Евро стандартын вакум цонх, шилэн фасад үйлдвэрлэгч Гэрэлт Констракшн ХХК үүсгэн байгуулагдаж үйл ажиллагааны чиглэлээ өргөтгөв. Санхүүгийн салбарт Эм Эн Эф Эс ХХК тансаг зэрэглэлийн автомашин барьцаалан зээлдүүлэх үйлчилгээг эхлүүлэв." },
  { year: "2013", title: "Гэгээн тауэр", desc: "Өвөрхангай аймгийн Арвайхээр суманд Гэгээн тауэр үйлчилгээтэй орон сууцны барилгыг барьж ашиглалтанд оруулав." },
  { year: "2014", title: "UB Vista", desc: "Улаанбаатар хот, Сонгинохайрхан дүүрэгт UB Vista үйлчилгээтэй орон сууцны барилгыг барьж эхэлсэн. Гео Петро Инженеринг ХХК болон Монголиан Петролиум Инженеринг ХХК-ийн үйл ажиллагаа өргөжив. Юу Би Рийл Эстэйт ХХК байгуулагдав." },
  { year: "2017", title: "Банк бус санхүүгийн байгууллага", desc: "Монгол банкнаас Банк бус санхүүгийн байгууллага-н тусгай зөвшөөрлийг авч Юу Би Актив ХХК-ийн үйл ажиллагааг эхлүүлэв. Монгол Улсад анх удаа газрын тос үйлдвэрлэлийн өрмийн цооногийг нэвтрүүлэв." },
  { year: "2018", title: "Хотын төвийн төслүүд", desc: "Хотын төвийн А зэрэглэлийн бүсүүдэд оффисийн болон орон сууцны барилгын томоохон төслүүдийг эхлүүлэв. Түүхий газрын тосны олон улсын тээвэрлэлтийг эхлүүлэв. Yoshinoya олон улсын эрүүл түргэн хоолны сүлжээ рестораны франчайзийн гэрээнд гарын үсэг зурав." },
  { year: "2019", title: "UB Concrete", desc: "Бетон зуурмагны UB Concrete компанийг үүсгэн байгуулж, цагт 120 м.куб бетон үйлдвэрлэх хүчин чадал бүхий үйлдвэрийг барьж ашиглалтанд оруулсан." },
  { year: "2021", title: "Avenue Residence", desc: "Чингэлтэй дүүргийн 2-р хороонд Avenue Residence 55 айлын үйлчилгээтэй бизнес зэрэглэлийн орон сууцыг амжилттай барьж ашиглалтанд оруулан Улсын комисст хүлээлгэн өгөв. Vision Business Tower-ийн ажлыг эхлүүлсэн." },
  { year: "2022", title: "ProTeam фитнесс", desc: "Орчин үеийн тоног төхөөрөмжөөр иж бүрэн тоноглогдсон ProTeam фитнессийг Тусгаар тогтнолын ордны 4 давхарт амжилттай нээсэн." },
  { year: "2023", title: "BENEBENE дэлгүүр", desc: "БНСУ-ын алдарт BENEBENE хүүхдийн хувцасны дэлгүүрийн Монгол дахь албан ёсны төлөөлөгчийн эрхийг авч Улсын Их Дэлгүүрийн 5 давхарт анхны салбараа нээсэн." },
  { year: "2024", title: "Шилдэг төсөл хэрэгжүүлэгч", desc: "Barilga EXPO 2024 олон улсын үзэсгэлэн яармагт Vision Business Tower, Central Park, Vision Complex төслүүдээр оролцож Шилдэг төсөл хэрэгжүүлэгч компаниар шалгарсан. Хотын А бүсэд 21,000 м.кв талбай бүхий барилгыг ашиглалтанд орууллаа." },
  { year: "2025", title: "Бидний түүх", desc: "Бидний түүхэд эдгээр мэдээллийг нэмж өгөв." },
];

const sectors = [
  { icon: TrendingUp, title: "Санхүү хөрөнгө, оруулалт", desc: "Стратегийн хөрөнгө оруулалт" },
  { icon: Building2, title: "Барилга, Үл хөдлөх хөрөнгө", desc: "Орон сууц, оффис, үйлдвэр" },
  { icon: Sparkles, title: "Лайфстайл", desc: "Амьдралын хэв маяг" },
  { icon: Truck, title: "Тээвэр логистик", desc: "Тээвэрлэлт, логистик" },
];

const achievements = [
  { icon: Award, title: "Шилдэг барилгын компани", org: "Монгол Улсын бизнесийн шагнал 2023" },
  { icon: FileCheck, title: "ISO 9001:2015", org: "Чанарын менежментийн систем" },
  { icon: Leaf, title: "LEED Gold", org: "Тогтвортой барилгын стандарт" },
  { icon: Handshake, title: "Олон улсын хамтын ажиллагаа", org: "Олон улсын консорциум" },
];

const team = [
  { name: "Ц.Батбаатар", role: "Төслөөн удирдах зөвлөлийн дарга", image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&fit=crop&crop=face" },
  { name: "О.Гэрэл", role: "Ерөнхий захирал", image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop&crop=face" },
  { name: "Д.Түвшинбат", role: "Гүйцэтгэх захирал", image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face" },
  { name: "Б.Солонго", role: "Маркетинг, Борлуулалтын газрын захирал", image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop&crop=face" },
  { name: "Г.Баяржаргалан", role: "Санхүүгийн Ахлах Менежер", image: "https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?w=400&h=400&fit=crop&crop=face" },
  { name: "Б.Баяр-Эрдэнэ", role: "Ерөнхий нягтлан бодогч", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face" },
  { name: "Б.Болормаа", role: "Хүний нөөц, Захиргааны газрын захирал", image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=400&h=400&fit=crop&crop=face" },
  { name: "Н.Тэргэл", role: "Хөрөнгө оруулалт хариуцсан захирал", image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=400&fit=crop&crop=face" },
  { name: "Г.Жамбалдорж", role: "Хууль, Эрх зүйн газрын захирал", image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop&crop=face" },
];

export default function AboutPage() {
  const pathname = usePathname();
  const locale = pathname.split("/")[1] || "mn";

  return (
    <>
      {/* HERO */}
      <section className="relative w-full pt-24 pb-16 overflow-hidden bg-[#000000]">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-30"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=1920&q=80')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#000000]/70 via-[#000000]/40 to-[#000000]" />
        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="text-[11px] font-semibold tracking-[0.25em] text-[#EC6707] uppercase mb-6 block">
              Бидний тухай
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight mb-5 tracking-tight">
              Монгол Улсыг
              <br />
              <span className="text-[#EC6707]">2006 оноос</span>
            </h1>
            <p className="text-lg text-white/70 max-w-xl leading-relaxed">
              Барилга, дэд бүтэц, хөрөнгө оруулалтын салбарт 18 жилийн туршлага.
            </p>
          </motion.div>
        </div>
      </section>

      {/* COMPANY OVERVIEW */}
      <section className="w-full py-16 lg:py-12 bg-[#F0F4F8]">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <Reveal>
              <span className="text-[11px] font-semibold tracking-[0.2em] text-[#EC6707] uppercase mb-6 block">
                Бид хэн бэ
              </span>
              <h2 className="text-3xl lg:text-xl font-bold text-[#000000] leading-tight mb-5 tracking-tight">
                Чанарын
                <br />
                <span className="text-[#EC6707]">уламжлал</span>
              </h2>
              <div className="space-y-3">
                <p className="text-[15px] text-[#334155] leading-relaxed">
                  Улаанбаатар Групп ХХК нь Монгол Улсын хөгжлийн тулгуур багана болсон тэргүүлэгч барилга, дэд бүтцийн компани юм.
                </p>
                <p className="text-[15px] text-[#334155] leading-relaxed">
                  Алсын хараа: Тогтвортой, хүртээмжтэй өгөөжийг бий болгосон хөгжүүлэгч компани болно.
                </p>
                <p className="text-[15px] text-[#334155] leading-relaxed">
                  Эрхэм зорилго: Дэвшилтэт шийдэл, олон улсын стандартыг хүсэл тэмүүлэл, ур чадвартай холбон Монгол Улсын хөгжилд хувь нэмрээ оруулна.
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.2}>
              <div className="relative">
                <div className="absolute -inset-6 bg-[#F5F3ED] rounded-3xl" />
                <div
                  className="relative h-[350px] bg-cover bg-center rounded-2xl overflow-hidden shadow-xl"
                  style={{ backgroundImage: "url('https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80')" }}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-[#000000]/40 to-transparent" />
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* VISION, MISSION & VALUES */}
      <section className="w-full py-16 lg:py-12 bg-[#E8EEF4]">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <Reveal className="text-center mb-5">
            <span className="text-[11px] font-semibold tracking-[0.2em] text-[#EC6707] uppercase mb-4 block">
              Бидний үндэс
            </span>
            <h2 className="text-3xl lg:text-xl font-bold text-[#000000] tracking-tight">
              Алсын хараа, Эрхэм зорилго, Үнэт зүйлс
            </h2>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <Reveal delay={0}>
              <div className="bg-[#F0F4F8] rounded-2xl p-4 text-center flex flex-col items-center h-full shadow-sm border border-[#E2E8F0]">
                <div className="w-20 h-20 rounded-full border border-[#EC6707]/20 flex items-center justify-center mb-5">
                  <Eye size={32} className="text-[#EC6707]" strokeWidth={1.5} />
                </div>
                <h3 className="text-xl font-bold text-[#000000] mb-6">Алсын хараа</h3>
                <p className="text-[15px] text-[#334155] leading-relaxed flex-grow">
                  Тогтвортой, хүртээмжтэй өгөөжийг бий болгосон хөгжүүлэгч компани болно.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="bg-[#F0F4F8] rounded-2xl p-4 text-center flex flex-col items-center h-full shadow-sm border border-[#E2E8F0]">
                <div className="w-20 h-20 rounded-full border border-[#EC6707]/20 flex items-center justify-center mb-5">
                  <Target size={32} className="text-[#EC6707]" strokeWidth={1.5} />
                </div>
                <h3 className="text-xl font-bold text-[#000000] mb-6">Эрхэм зорилго</h3>
                <p className="text-[15px] text-[#334155] leading-relaxed flex-grow">
                  Дэвшилтэт шийдэл, олон улсын стандартыг хүсэл тэмүүлэл, ур чадвартай холбон Монгол Улсын хөгжилд хувь нэмрээ оруулна.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.2}>
              <div className="bg-[#F0F4F8] rounded-2xl p-4 text-center flex flex-col items-center h-full shadow-sm border border-[#E2E8F0]">
                <div className="w-20 h-20 rounded-full border border-[#EC6707]/20 flex items-center justify-center mb-5">
                  <Star size={32} className="text-[#EC6707]" strokeWidth={1.5} />
                </div>
                <h3 className="text-xl font-bold text-[#000000] mb-6">Үнэт зүйлс</h3>
                <p className="text-[15px] text-[#334155] leading-relaxed flex-grow">
                  Тогтвортой хөгжил, Хамтын зүтгэл, Дэвшилтэт технологи, Чанар, Ёс зүй, Хүндэтгэл
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* STATISTICS */}
      <section className="w-full py-24 bg-[#F0F4F8]">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <Reveal className="text-center mb-6">
            <span className="text-[11px] font-semibold tracking-[0.2em] text-[#EC6707] uppercase mb-4 block">
              Тоогоор
            </span>
            <h2 className="text-xl font-bold text-[#000000] tracking-tight">
              Бидний ололт амжилт
            </h2>
          </Reveal>
          <div className="grid grid-cols-2 lg:grid-cols-5 gap-5">
            {[
              { value: 18, suffix: "+", label: "Жилийн туршлага" },
              { value: 50, suffix: "+", label: "Гүйцэтгэсэн төсөл" },
              { value: 2000, suffix: "+", label: "Ажилтан" },
              { value: 150, suffix: "+", label: "Хамтрагч байгууллага" },
              { value: 2, suffix: "B+", label: "Хөрөнгө оруулалт" },
            ].map((stat, index) => (
              <Reveal key={stat.label} delay={index * 0.1}>
                <div className="bg-[#F0F4F8] border border-[#E2E8F0] rounded-2xl text-center p-5 shadow-sm">
                  <div className="text-4xl lg:text-5xl font-bold text-[#EC6707] mb-4 tracking-tight">
                    <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                  </div>
                  <div className="h-px w-12 bg-[#EC6707]/20 mx-auto mb-4" />
                  <div className="text-[12px] text-[#64748B] tracking-[0.15em] uppercase">
                    {stat.label}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* TIMELINE */}
      <section className="w-full py-12 lg:py-24 bg-[#F0F4F8]">
        <div className="mx-auto max-w-5xl px-6 lg:px-8">
          <Reveal className="text-center mb-5">
            <span className="text-[11px] font-semibold tracking-[0.2em] text-[#EC6707] uppercase mb-4 block">
              Бидний аялал
            </span>
            <h2 className="text-3xl lg:text-xl font-bold text-[#000000] tracking-tight">
              <span className="text-[#EC6707]">Бидний түүх</span>
            </h2>
          </Reveal>

          <div className="relative">
            <div className="absolute left-6 lg:left-1/2 top-2 bottom-2 w-px bg-[#E2E8F0] lg:-translate-x-1/2" />

            <div className="space-y-0">
              {timeline.map((item, index) => (
                <Reveal key={item.year} delay={index * 0.08}>
                  <div className="relative flex items-start lg:items-center gap-5 lg:gap-0 py-4">
                    <div className="absolute left-6 lg:left-1/2 top-5 lg:top-1/2 -translate-x-1/2 lg:-translate-y-1/2 w-6 h-6 rounded-full bg-[#EC6707] border-3 border-white z-10 shrink-0 shadow-[0_0_12px_rgba(201,162,39,0.5)]" />

                    <div
                      className={`pl-14 lg:pl-0 lg:w-1/2 ${
                        index % 2 === 0
                          ? "lg:pr-12 lg:text-right"
                          : "lg:ml-auto lg:pl-12"
                      }`}
                    >
                      <div className="inline-block text-left">
                        <span className="text-[11px] font-semibold text-[#EC6707] tracking-wider uppercase">
                          {item.year}
                        </span>
                        <h3 className="text-base font-semibold text-[#000000] mt-1 leading-snug">
                          {item.title}
                        </h3>
                        <p className="text-[13px] text-[#64748B] leading-relaxed mt-1 max-w-xs">
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* TEAM */}
      <section className="w-full py-12 lg:py-16 bg-[#F0F4F8]">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          {/* Title with lines */}
          <Reveal className="flex items-center justify-center gap-4 mb-6">
            <div className="h-px w-32 bg-[#EC6707]" />
            <h2 className="text-3xl lg:text-xl font-bold text-[#EC6707] tracking-tight">Удирдлагын баг</h2>
            <div className="h-px w-32 bg-[#EC6707]" />
          </Reveal>

          {/* Team Grid - Hierarchical Layout */}
          <div className="space-y-8">
            {/* Row 1: 2 people (top management) */}
            <div className="flex justify-center gap-5 lg:gap-16">
              {team.slice(0, 2).map((member, index) => (
                <Reveal key={member.name} delay={index * 0.1}>
                  <div className="relative bg-[#F0F4F8] rounded-lg shadow-md p-4 pt-0 w-[280px]">
                    {/* Blue line with overlapping circle */}
                    <div className="relative h-16 flex items-center justify-center">
                      <div className="absolute top-5 left-0 right-0 h-0.5 bg-[#EC6707]" />
                      <div className="relative z-10 w-20 h-20 rounded-full overflow-hidden border-4 border-white shadow-lg">
                        <div 
                          className="w-full h-full bg-cover bg-center"
                          style={{ backgroundImage: `url('${member.image}')` }}
                        />
                      </div>
                    </div>
                    <div className="text-center mt-4">
                      <h3 className="text-lg font-bold text-[#000000] mb-1">{member.name}</h3>
                      <p className="text-sm text-[#64748B]">{member.role}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>

            {/* Row 2: 3 people */}
            <div className="flex justify-center gap-4 lg:gap-4 flex-wrap">
              {team.slice(2, 5).map((member, index) => (
                <Reveal key={member.name} delay={index * 0.1}>
                  <div className="relative bg-[#F0F4F8] rounded-lg shadow-md p-4 pt-0 w-[260px]">
                    <div className="relative h-16 flex items-center justify-center">
                      <div className="absolute top-5 left-0 right-0 h-0.5 bg-[#EC6707]" />
                      <div className="relative z-10 w-20 h-20 rounded-full overflow-hidden border-4 border-white shadow-lg">
                        <div 
                          className="w-full h-full bg-cover bg-center"
                          style={{ backgroundImage: `url('${member.image}')` }}
                        />
                      </div>
                    </div>
                    <div className="text-center mt-4">
                      <h3 className="text-lg font-bold text-[#000000] mb-1">{member.name}</h3>
                      <p className="text-sm text-[#64748B]">{member.role}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>

            {/* Row 3: 3 people */}
            <div className="flex justify-center gap-4 lg:gap-4 flex-wrap">
              {team.slice(5, 8).map((member, index) => (
                <Reveal key={member.name} delay={index * 0.1}>
                  <div className="relative bg-[#F0F4F8] rounded-lg shadow-md p-4 pt-0 w-[260px]">
                    <div className="relative h-16 flex items-center justify-center">
                      <div className="absolute top-5 left-0 right-0 h-0.5 bg-[#EC6707]" />
                      <div className="relative z-10 w-20 h-20 rounded-full overflow-hidden border-4 border-white shadow-lg">
                        <div 
                          className="w-full h-full bg-cover bg-center"
                          style={{ backgroundImage: `url('${member.image}')` }}
                        />
                      </div>
                    </div>
                    <div className="text-center mt-4">
                      <h3 className="text-lg font-bold text-[#000000] mb-1">{member.name}</h3>
                      <p className="text-sm text-[#64748B]">{member.role}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>

            {/* Row 4: 1 person (centered) */}
            <div className="flex justify-center">
              {team.slice(8, 9).map((member, index) => (
                <Reveal key={member.name} delay={index * 0.1}>
                  <div className="relative bg-[#F0F4F8] rounded-lg shadow-md p-4 pt-0 w-[260px]">
                    <div className="relative h-16 flex items-center justify-center">
                      <div className="absolute top-5 left-0 right-0 h-0.5 bg-[#EC6707]" />
                      <div className="relative z-10 w-20 h-20 rounded-full overflow-hidden border-4 border-white shadow-lg">
                        <div 
                          className="w-full h-full bg-cover bg-center"
                          style={{ backgroundImage: `url('${member.image}')` }}
                        />
                      </div>
                    </div>
                    <div className="text-center mt-4">
                      <h3 className="text-lg font-bold text-[#000000] mb-1">{member.name}</h3>
                      <p className="text-sm text-[#64748B]">{member.role}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* BUSINESS SECTORS */}
      <section className="w-full py-16 lg:py-12 bg-[#F0F4F8]">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <Reveal className="text-center mb-5">
            <span className="text-[11px] font-semibold tracking-[0.2em] text-[#EC6707] uppercase mb-4 block">
              Бизнес салбар
            </span>
            <h2 className="text-3xl lg:text-xl font-bold text-[#000000] tracking-tight">
              Олон талт чадвар
            </h2>
          </Reveal>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {sectors.map((sector, index) => {
              const Icon = sector.icon;
              return (
                <Reveal key={sector.title} delay={index * 0.1}>
                  <div className="bg-[#F0F4F8] rounded-2xl p-5 lg:p-4 text-center shadow-sm border border-[#E2E8F0] hover:shadow-md transition-shadow duration-300">
                    <div className="w-14 h-14 rounded-xl bg-[#F5F3ED] flex items-center justify-center mx-auto mb-6">
                      <Icon size={24} className="text-[#EC6707]" strokeWidth={1.5} />
                    </div>
                    <h3 className="text-lg font-semibold text-[#000000] mb-2">
                      {sector.title}
                    </h3>
                    <p className="text-sm text-[#64748B]">{sector.desc}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ACHIEVEMENTS */}
      <section className="w-full py-16 lg:py-12 bg-[#E8EEF4]">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <Reveal className="text-center mb-5">
            <span className="text-[11px] font-semibold tracking-[0.2em] text-[#EC6707] uppercase mb-4 block">
              Хүлээн зөвшөөрөл
            </span>
            <h2 className="text-3xl lg:text-xl font-bold text-[#000000] tracking-tight">
              Шагнал, сертификат
            </h2>
          </Reveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {achievements.map((ach, index) => {
              const Icon = ach.icon;
              return (
                <Reveal key={ach.title} delay={index * 0.1}>
                  <div className="bg-[#F0F4F8] rounded-2xl p-4 text-center shadow-sm border border-[#E2E8F0]">
                    <div className="w-16 h-16 rounded-full bg-[#F5F3ED] flex items-center justify-center mx-auto mb-6">
                      <Icon size={28} className="text-[#EC6707]" strokeWidth={1.5} />
                    </div>
                    <h3 className="text-lg font-semibold text-[#000000] mb-2">
                      {ach.title}
                    </h3>
                    <p className="text-sm text-[#64748B]">{ach.org}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative w-full py-16 lg:py-12 overflow-hidden bg-[#000000]">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-10"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1920&q=80')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#000000]/80 via-[#000000]/60 to-[#000000]/80" />
        <div className="relative mx-auto max-w-7xl px-6 lg:px-8 text-center">
          <Reveal>
            <h2 className="text-4xl lg:text-6xl font-bold text-white leading-tight mb-5 tracking-tight">
              Ирээдүйг
              <br />
              <span className="text-[#EC6707]">хамтдаа бүтээе</span>
            </h2>
            <p className="text-lg text-white/60 mb-5 max-w-xl mx-auto leading-relaxed">
              Монгол Улсын тэргүүлэгч барилгын компанитай хамтран ажиллаарай.
            </p>
            <Link
              href={`/${locale}/contact`}
              className="group inline-flex items-center gap-3 px-10 py-5 bg-[#EC6707] text-white text-sm font-semibold tracking-wide hover:bg-[#B35405] transition-all duration-500 rounded-sm"
            >
              Холбоо барих
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
