"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { usePathname } from "next/navigation";
import {
  ArrowRight,
  Send,
  Upload,
  MapPin,
  Briefcase,
  Clock,
  DollarSign,
  Calendar,
  User,
  Mail,
  Phone,
  FileText,
  Handshake,
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

const jobs = [
  { title: "Инженер", company: "UB Group", location: "Улаанбаатар", type: "Бүтэн цагийн", salary: "2,000,000 - 3,000,000", deadline: "2024.12.31" },
  { title: "Менежер", company: "UB Construction", location: "Улаанбаатар", type: "Бүтэн цагийн", salary: "3,000,000 - 4,500,000", deadline: "2024.12.25" },
  { title: "Нягтлан бодогч", company: "UB Investment", location: "Улаанбаатар", type: "Бүтэн цагийн", salary: "2,500,000 - 3,500,000", deadline: "2024.12.20" },
  { title: "Аюулгүй байдлын инженер", company: "UB Mining", location: "Говь", type: "Ээлжийн", salary: "3,500,000 - 5,000,000", deadline: "2025.01.15" },
];

const companies = ["Бүгд", "UB Group", "UB Construction", "UB Investment", "UB Mining"];

const tenders = [
  { title: "Барилгын материал нийлүүлэх", company: "UB Construction", deadline: "2024.12.30", budget: "500,000,000" },
  { title: "Тээврийн үйлчилгээ", company: "UB Mining", deadline: "2024.12.20", budget: "200,000,000" },
  { title: "Оффис тоног төхөөрөмж", company: "UB Group", deadline: "2024.12.15", budget: "50,000,000" },
];

export default function CareerPage() {
  const pathname = usePathname();
  const locale = pathname.split("/")[1] || "mn";
  const [activeCompany, setActiveCompany] = useState("Бүгд");

  const filteredJobs = activeCompany === "Бүгд" 
    ? jobs 
    : jobs.filter(j => j.company === activeCompany);

  return (
    <>
      {/* HERO */}
      <section className="relative w-full pt-24 pb-16 overflow-hidden bg-[#000000]">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-30"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1920&q=80')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#000000]/70 via-[#000000]/40 to-[#000000]" />
        <div className="relative mx-auto max-w-7xl px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="text-[11px] font-semibold tracking-[0.25em] text-[#EC6707] uppercase mb-6 block">Карьер</span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight mb-5 tracking-tight">
              Манай багт
              <br />
              <span className="text-[#EC6707]">нэгдээрэй</span>
            </h1>
          </motion.div>
        </div>
      </section>

      {/* ENTRY CARDS */}
      <section className="w-full py-24 bg-[#F0F4F8]">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <Reveal>
              <div className="bg-[#E8EEF4] rounded-2xl p-4 text-center border border-[#E2E8F0] hover:shadow-lg transition-all duration-500">
                <div className="w-16 h-16 rounded-full bg-[#F5F3ED] flex items-center justify-center mx-auto mb-6">
                  <Briefcase size={28} className="text-[#EC6707]" strokeWidth={1.5} />
                </div>
                <h3 className="text-xl font-bold text-[#000000] mb-4">Бидэнтэй нэгдэх</h3>
                <p className="text-[#64748B] mb-5">Манай багт нэгдэж, Монгол Улсын хөгжилд хувь нэмрээ оруулаарай.</p>
                <a href="#jobs" className="inline-flex items-center gap-2 px-6 py-3 bg-[#EC6707] text-white rounded-lg hover:bg-[#B35405] transition-colors">
                  Ажлын байр үзэх <ArrowRight size={16} />
                </a>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="bg-[#E8EEF4] rounded-2xl p-4 text-center border border-[#E2E8F0] hover:shadow-lg transition-all duration-500">
                <div className="w-16 h-16 rounded-full bg-[#F5F3ED] flex items-center justify-center mx-auto mb-6">
                  <Handshake size={28} className="text-[#EC6707]" strokeWidth={1.5} />
                </div>
                <h3 className="text-xl font-bold text-[#000000] mb-4">Хамтран ажиллах</h3>
                <p className="text-[#64748B] mb-5">Тендерт оролцож, хамтран ажиллах боломжоо үзээрэй.</p>
                <a href="#tenders" className="inline-flex items-center gap-2 px-6 py-3 bg-[#EC6707] text-white rounded-lg hover:bg-[#B35405] transition-colors">
                  Тендер үзэх <ArrowRight size={16} />
                </a>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* JOBS */}
      <section id="jobs" className="w-full py-24 bg-[#E8EEF4]">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <Reveal className="text-center mb-5">
            <span className="text-[11px] font-semibold tracking-[0.25em] text-[#EC6707] uppercase mb-4 block">Нээлттэй ажлын байр</span>
            <h2 className="text-xl font-bold text-[#000000] tracking-tight">Ажлын байрууд</h2>
          </Reveal>

          {/* Company Tabs */}
          <Reveal className="flex flex-wrap justify-center gap-2 mb-5">
            {companies.map((company) => (
              <button
                key={company}
                onClick={() => setActiveCompany(company)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  activeCompany === company
                    ? "bg-[#EC6707] text-white"
                    : "bg-[#F0F4F8] text-[#334155] border border-[#E2E8F0] hover:border-[#EC6707]"
                }`}
              >
                {company}
              </button>
            ))}
          </Reveal>

          {/* Jobs Grid */}
          <div className="space-y-4">
            {filteredJobs.map((job, index) => (
              <Reveal key={job.title} delay={index * 0.1}>
                <div className="bg-[#F0F4F8] rounded-xl p-4 border border-[#E2E8F0] hover:shadow-lg transition-all duration-300"
                >
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                    <div>
                      <h3 className="text-xl font-semibold text-[#000000] mb-2">{job.title}</h3>
                      <div className="flex flex-wrap gap-4 text-sm text-[#64748B]">
                        <span className="flex items-center gap-1"><Briefcase size={14} /> {job.company}</span>
                        <span className="flex items-center gap-1"><MapPin size={14} /> {job.location}</span>
                        <span className="flex items-center gap-1"><Clock size={14} /> {job.type}</span>
                        <span className="flex items-center gap-1"><DollarSign size={14} /> {job.salary}</span>
                        <span className="flex items-center gap-1"><Calendar size={14} /> {job.deadline}</span>
                      </div>
                    </div>
                    <button className="px-6 py-3 bg-[#EC6707] text-white text-sm font-medium rounded-lg hover:bg-[#B35405] transition-colors shrink-0"
                    >
                      Анкет илгээх
                    </button>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* APPLICATION FORM */}
      <section className="w-full py-24 bg-[#F0F4F8]">
        <div className="mx-auto max-w-3xl px-6 lg:px-8">
          <Reveal className="text-center mb-5">
            <span className="text-[11px] font-semibold tracking-[0.25em] text-[#EC6707] uppercase mb-4 block">Анкет илгээх</span>
            <h2 className="text-xl font-bold text-[#000000] tracking-tight">Ажлын анкет</h2>
          </Reveal>

          <Reveal>
            <form className="bg-[#E8EEF4] rounded-2xl p-5 lg:p-4 border border-[#E2E8F0] space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-[#64748B] mb-2 block">Нэр</label>
                  <div className="relative">
                    <User size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#94A3B8]" />
                    <input type="text" placeholder="Таны нэр" className="w-full pl-11 pr-4 py-3 bg-[#F0F4F8] border border-[#E2E8F0] rounded-lg focus:outline-none focus:border-[#EC6707] text-[15px]" />
                  </div>
                </div>
                <div>
                  <label className="text-sm text-[#64748B] mb-2 block">Имэйл</label>
                  <div className="relative">
                    <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#94A3B8]" />
                    <input type="email" placeholder="Имэйл хаяг" className="w-full pl-11 pr-4 py-3 bg-[#F0F4F8] border border-[#E2E8F0] rounded-lg focus:outline-none focus:border-[#EC6707] text-[15px]" />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-[#64748B] mb-2 block">Утас</label>
                  <div className="relative">
                    <Phone size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#94A3B8]" />
                    <input type="tel" placeholder="Утасны дугаар" className="w-full pl-11 pr-4 py-3 bg-[#F0F4F8] border border-[#E2E8F0] rounded-lg focus:outline-none focus:border-[#EC6707] text-[15px]" />
                  </div>
                </div>
                <div>
                  <label className="text-sm text-[#64748B] mb-2 block">Ажлын байр</label>
                  <select className="w-full px-4 py-3 bg-[#F0F4F8] border border-[#E2E8F0] rounded-lg focus:outline-none focus:border-[#EC6707] text-[15px]">
                    <option>Ажлын байр сонгох</option>
                    {jobs.map(j => <option key={j.title}>{j.title}</option>)}
                  </select>
                </div>
              </div>

              <div>
                <label className="text-sm text-[#64748B] mb-2 block">Товч танилцуулга</label>
                <textarea rows={4} placeholder="Өөрийгөө товч танилцуулна уу" className="w-full px-4 py-3 bg-[#F0F4F8] border border-[#E2E8F0] rounded-lg focus:outline-none focus:border-[#EC6707] text-[15px] resize-none"></textarea>
              </div>

              <div>
                <label className="text-sm text-[#64748B] mb-2 block">CV хавсаргах</label>
                <div className="border-2 border-dashed border-[#E2E8F0] rounded-lg p-5 text-center hover:border-[#EC6707] transition-colors cursor-pointer">
                  <Upload size={24} className="mx-auto mb-2 text-[#94A3B8]" />
                  <p className="text-sm text-[#64748B]">Файл чирж оруулах эсвэл дарна уу</p>
                </div>
              </div>

              <button type="submit" className="w-full flex items-center justify-center gap-2 px-8 py-4 bg-[#EC6707] text-white font-semibold rounded-lg hover:bg-[#B35405] transition-colors"
              >
                <Send size={18} />
                Анкет илгээх
              </button>
            </form>
          </Reveal>
        </div>
      </section>

      {/* TENDERS */}
      <section id="tenders" className="w-full py-24 bg-[#E8EEF4]">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <Reveal className="text-center mb-5">
            <span className="text-[11px] font-semibold tracking-[0.25em] text-[#EC6707] uppercase mb-4 block">Нээлттэй тендер</span>
            <h2 className="text-xl font-bold text-[#000000] tracking-tight">Тендерүүд</h2>
          </Reveal>

          <div className="space-y-4">
            {tenders.map((tender, index) => (
              <Reveal key={tender.title} delay={index * 0.1}>
                <div className="bg-[#F0F4F8] rounded-xl p-4 border border-[#E2E8F0] hover:shadow-lg transition-all duration-300"
                >
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                    <div>
                      <h3 className="text-xl font-semibold text-[#000000] mb-2">{tender.title}</h3>
                      <div className="flex flex-wrap gap-4 text-sm text-[#64748B]">
                        <span className="flex items-center gap-1"><Briefcase size={14} /> {tender.company}</span>
                        <span className="flex items-center gap-1"><Calendar size={14} /> Хүчинтэй хугацаа: {tender.deadline}</span>
                        <span className="flex items-center gap-1"><DollarSign size={14} /> {tender.budget} ₮</span>
                      </div>
                    </div>
                    <button className="px-6 py-3 bg-[#EC6707] text-white text-sm font-medium rounded-lg hover:bg-[#B35405] transition-colors shrink-0"
                    >
                      Оролцох
                    </button>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* TENDER FORM */}
      <section className="w-full py-24 bg-[#F0F4F8]">
        <div className="mx-auto max-w-3xl px-6 lg:px-8">
          <Reveal className="text-center mb-5">
            <span className="text-[11px] font-semibold tracking-[0.25em] text-[#EC6707] uppercase mb-4 block">Тендерт оролцох</span>
            <h2 className="text-xl font-bold text-[#000000] tracking-tight">Тендерийн хүсэлт</h2>
          </Reveal>

          <Reveal>
            <form className="bg-[#E8EEF4] rounded-2xl p-5 lg:p-4 border border-[#E2E8F0] space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-[#64748B] mb-2 block">Компанийн нэр</label>
                  <input type="text" placeholder="Компанийн нэр" className="w-full px-4 py-3 bg-[#F0F4F8] border border-[#E2E8F0] rounded-lg focus:outline-none focus:border-[#EC6707] text-[15px]" />
                </div>
                <div>
                  <label className="text-sm text-[#64748B] mb-2 block">Бүртгэлийн дугаар</label>
                  <input type="text" placeholder="РД" className="w-full px-4 py-3 bg-[#F0F4F8] border border-[#E2E8F0] rounded-lg focus:outline-none focus:border-[#EC6707] text-[15px]" />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-[#64748B] mb-2 block">Хариуцах хүн</label>
                  <input type="text" placeholder="Холбогдох хүн" className="w-full px-4 py-3 bg-[#F0F4F8] border border-[#E2E8F0] rounded-lg focus:outline-none focus:border-[#EC6707] text-[15px]" />
                </div>
                <div>
                  <label className="text-sm text-[#64748B] mb-2 block">Утас</label>
                  <input type="tel" placeholder="Утасны дугаар" className="w-full px-4 py-3 bg-[#F0F4F8] border border-[#E2E8F0] rounded-lg focus:outline-none focus:border-[#EC6707] text-[15px]" />
                </div>
              </div>

              <div>
                <label className="text-sm text-[#64748B] mb-2 block">Тендер сонгох</label>
                <select className="w-full px-4 py-3 bg-[#F0F4F8] border border-[#E2E8F0] rounded-lg focus:outline-none focus:border-[#EC6707] text-[15px]">
                  <option>Тендер сонгох</option>
                  {tenders.map(t => <option key={t.title}>{t.title}</option>)}
                </select>
              </div>

              <div>
                <label className="text-sm text-[#64748B] mb-2 block">Тендерийн баримт бичиг</label>
                <div className="border-2 border-dashed border-[#E2E8F0] rounded-lg p-5 text-center hover:border-[#EC6707] transition-colors cursor-pointer">
                  <FileText size={24} className="mx-auto mb-2 text-[#94A3B8]" />
                  <p className="text-sm text-[#64748B]">Тендерийн баримт бичгийг оруулна уу</p>
                </div>
              </div>

              <button type="submit" className="w-full flex items-center justify-center gap-2 px-8 py-4 bg-[#EC6707] text-white font-semibold rounded-lg hover:bg-[#B35405] transition-colors"
              >
                <Send size={18} />
                Хүсэлт илгээх
              </button>
            </form>
          </Reveal>
        </div>
      </section>
    </>
  );
}
