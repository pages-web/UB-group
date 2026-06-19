"use client";

import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import {
  Leaf,
  Users,
  Globe,
  Lightbulb,
  ArrowRight,
  FileText,
  Download,
} from "lucide-react";

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

const principles = [
  {
    icon: Leaf,
    title: "Байгаль орчныг хамгаалах",
    desc: "Байгаль орчны нөлөөллийг багасгах, нөхөн сэргээх ажлыг тэргүүлэх",
  },
  {
    icon: Users,
    title: "Нийгмийн хариуцлага",
    desc: "Орон нутгийн иргэд, хамт олондоо эерэг нөлөө үзүүлэх",
  },
  {
    icon: Globe,
    title: "Эдийн засгийн тогтвортой байдал",
    desc: "Урт хугацаанд тогтвортой өсөлт, хөгжлийг дэмжих",
  },
  {
    icon: Lightbulb,
    title: "Дэвшилтэт технологи",
    desc: "Шинэ технологи, шийдлийг нэвтрүүлж үр ашгийг нэмэгдүүлэх",
  },
];

const projects = [
  {
    title: "Нарны цахилгаан станц",
    location: "Дундговь аймаг",
    description: "10МВт хүчин чадалтай сэргээгдэх эрчим хүчний станц",
    image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800&q=80",
  },
  {
    title: "Ногоон барилга",
    location: "Улаанбаатар",
    description: "LEED Gold сертификаттай орон сууцны төсөл",
    image: "https://images.unsplash.com/photo-1518005020951-eccb494ad742?w=800&q=80",
  },
  {
    title: "Усны нөөцийн төсөл",
    location: "Говьсүмбэр",
    description: "Орон нутгийн усны нөөцийг хамгаалах, нэмэгдүүлэх",
    image: "https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?w=800&q=80",
  },
];

const stats = [
  { value: "50%", label: "Нүүрсхүчлийн хийн бууралт" },
  { value: "10MW", label: "Сэргээгдэх эрчим хүч" },
  { value: "5000+", label: "Мод тарьсан" },
  { value: "100%", label: "Хог хаягдал дахин боловсруулалт" },
];

const reports = [
  { title: "Тогтвортой хөгжлийн тайлан 2023", date: "2024.03.15", size: "PDF, 5.2MB" },
  { title: "Байгаль орчны нөлөөллийн үнэлгээ", date: "2024.02.20", size: "PDF, 3.8MB" },
  { title: "Нийгмийн хариуцлагын тайлан", date: "2023.12.10", size: "PDF, 4.1MB" },
];

export default function SustainabilityPage() {
  const pathname = usePathname();
  const locale = pathname.split("/")[1] || "mn";

  return (
    <>
      {/* HERO */}
      <section className="relative w-full pt-24 pb-16 overflow-hidden bg-[#000000]">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-30"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?w=1920&q=80')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#000000]/70 via-[#000000]/40 to-[#000000]" />
        <div className="relative mx-auto max-w-7xl px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="text-[11px] font-semibold tracking-[0.25em] text-[#EC6707] uppercase mb-6 block">Тогтвортой хөгжил</span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight mb-5 tracking-tight">
              Ирээдүйг
              <br />
              <span className="text-[#EC6707]">хамгаална</span>
            </h1>
            <p className="text-lg text-white/70 max-w-xl mx-auto leading-relaxed">
              Бид эдийн засаг, нийгэм, байгаль орчинд урт хугацааны эерэг нөлөө үзүүлэхийг зорин ажилладаг.
            </p>
          </motion.div>
        </div>
      </section>

      {/* PRINCIPLES */}
      <section className="w-full py-16 lg:py-12 bg-[#F0F4F8]">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <Reveal className="text-center mb-5">
            <span className="text-[11px] font-semibold tracking-[0.25em] text-[#EC6707] uppercase mb-4 block">Баримтлах зарчим</span>
            <h2 className="text-3xl lg:text-xl font-bold text-[#000000] tracking-tight">Бидний үндэс</h2>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {principles.map((principle, index) => {
              const Icon = principle.icon;
              return (
                <Reveal key={principle.title} delay={index * 0.1}>
                  <div className="bg-[#E8EEF4] rounded-2xl p-4 text-center h-full border border-[#E2E8F0] hover:shadow-lg transition-all duration-500">
                    <div className="w-16 h-16 rounded-full bg-[#F5F3ED] flex items-center justify-center mx-auto mb-6">
                      <Icon size={28} className="text-[#EC6707]" strokeWidth={1.5} />
                    </div>
                    <h3 className="text-xl font-semibold text-[#000000] mb-4">{principle.title}</h3>
                    <p className="text-[14px] text-[#64748B] leading-relaxed">{principle.desc}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* PROJECTS */}
      <section className="w-full py-16 lg:py-12 bg-[#E8EEF4]">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <Reveal className="text-center mb-5">
            <span className="text-[11px] font-semibold tracking-[0.25em] text-[#EC6707] uppercase mb-4 block">Төслүүд</span>
            <h2 className="text-3xl lg:text-xl font-bold text-[#000000] tracking-tight">Нэвтрүүлж буй төслүүд</h2>
          </Reveal>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
            {projects.map((project, index) => (
              <Reveal key={project.title} delay={index * 0.15}>
                <div className="group bg-[#F0F4F8] rounded-xl overflow-hidden border border-[#E2E8F0] hover:shadow-xl transition-all duration-500"
                >
                  <div className="relative h-56 overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                      style={{ backgroundImage: `url('${project.image}')` }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#000000]/60 to-transparent" />
                  </div>
                  <div className="p-5">
                    <div className="text-[11px] text-[#EC6707] font-medium tracking-wider uppercase mb-3">{project.location}</div>
                    <h3 className="text-xl font-semibold text-[#000000] mb-3">{project.title}</h3>
                    <p className="text-[14px] text-[#64748B]">{project.description}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* IMPACT STATS */}
      <section className="w-full py-24 bg-[#F0F4F8]">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <Reveal className="text-center mb-6">
            <span className="text-[11px] font-semibold tracking-[0.25em] text-[#EC6707] uppercase mb-4 block">Хүртсэн нөлөө</span>
            <h2 className="text-xl font-bold text-[#000000] tracking-tight">Бидний ололт</h2>
          </Reveal>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
            {stats.map((stat, index) => (
              <Reveal key={stat.label} delay={index * 0.1}>
                <div className="text-center p-5">
                  <div className="text-4xl lg:text-5xl font-bold text-[#EC6707] mb-4 tracking-tight">{stat.value}</div>
                  <div className="h-px w-12 bg-[#EC6707]/20 mx-auto mb-4" />
                  <div className="text-[14px] text-[#64748B]">{stat.label}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* REPORTS */}
      <section className="w-full py-16 lg:py-12 bg-[#E8EEF4]">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <Reveal className="text-center mb-5">
            <span className="text-[11px] font-semibold tracking-[0.25em] text-[#EC6707] uppercase mb-4 block">Тайлан мэдээ</span>
            <h2 className="text-3xl lg:text-xl font-bold text-[#000000] tracking-tight">Тайлангууд</h2>
          </Reveal>

          <div className="space-y-4">
            {reports.map((report, index) => (
              <Reveal key={report.title} delay={index * 0.1}>
                <div className="flex items-center justify-between p-4 bg-[#F0F4F8] rounded-xl border border-[#E2E8F0] hover:shadow-md transition-all duration-300"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-[#F5F3ED] flex items-center justify-center">
                      <FileText size={20} className="text-[#EC6707]" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-[#000000]">{report.title}</h3>
                      <p className="text-sm text-[#64748B]">{report.date} • {report.size}</p>
                    </div>
                  </div>
                  <button className="flex items-center gap-2 px-4 py-2 bg-[#EC6707] text-white text-sm font-medium rounded-lg hover:bg-[#B35405] transition-colors">
                    <Download size={16} />
                    Татах
                  </button>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
