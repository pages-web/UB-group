"use client";

import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send, Clock } from "lucide-react";

function Reveal({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default function ContactPage() {
  return (
    <>
      {/* HERO */}
      <section className="relative w-full pt-40 pb-28 bg-[#000000]">
        <div className="absolute inset-0 bg-gradient-to-b from-[#000000]/50 to-[#000000]" />
        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="text-[11px] font-semibold tracking-[0.25em] text-[#EC6707] uppercase mb-6 block">
              Холбоо барих
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight tracking-tight">
              Холбогдоорой
            </h1>
          </motion.div>
        </div>
      </section>

      {/* CONTACT CONTENT */}
      <section className="w-full py-24 bg-[#F0F4F8]">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Info */}
            <Reveal>
              <div className="bg-[#F0F4F8] border border-[#E2E8F0] rounded-2xl p-5 lg:p-4 shadow-sm">
                <div>
                  <span className="text-[11px] font-semibold tracking-[0.2em] text-[#EC6707] uppercase mb-5 block">
                    Холбоо барих мэдээлэл
                  </span>
                  <p className="text-[15px] text-[#334155] leading-relaxed mb-5">
                    Таньд асуух зүйл байна уу? Бидэнтэй холбогдоорой.
                  </p>
                </div>

                <div className="space-y-8">
                  <div className="flex items-start gap-5 p-4 rounded-xl hover:bg-[#E8EEF4] transition-colors duration-300">
                    <div className="w-12 h-12 rounded-xl bg-[#F5F3ED] flex items-center justify-center shrink-0">
                      <Mail className="w-5 h-5 text-[#EC6707]" strokeWidth={1.5} />
                    </div>
                    <div>
                      <p className="text-[11px] text-[#64748B] tracking-wider uppercase mb-2">
                        Имэйл
                      </p>
                      <p className="text-[#000000] text-[15px]">info@ubgroup.mn</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-5 p-4 rounded-xl hover:bg-[#E8EEF4] transition-colors duration-300">
                    <div className="w-12 h-12 rounded-xl bg-[#F5F3ED] flex items-center justify-center shrink-0">
                      <Phone className="w-5 h-5 text-[#EC6707]" strokeWidth={1.5} />
                    </div>
                    <div>
                      <p className="text-[11px] text-[#64748B] tracking-wider uppercase mb-2">
                        Утас
                      </p>
                      <p className="text-[#000000] text-[15px]">+976 11 433995</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-5 p-4 rounded-xl hover:bg-[#E8EEF4] transition-colors duration-300">
                    <div className="w-12 h-12 rounded-xl bg-[#F5F3ED] flex items-center justify-center shrink-0">
                      <MapPin className="w-5 h-5 text-[#EC6707]" strokeWidth={1.5} />
                    </div>
                    <div>
                      <p className="text-[11px] text-[#64748B] tracking-wider uppercase mb-2">
                        Хаяг
                      </p>
                      <p className="text-[#000000] text-[15px]">Улаанбаатар, Монгол</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-5 p-4 rounded-xl hover:bg-[#E8EEF4] transition-colors duration-300">
                    <div className="w-12 h-12 rounded-xl bg-[#F5F3ED] flex items-center justify-center shrink-0">
                      <Clock className="w-5 h-5 text-[#EC6707]" strokeWidth={1.5} />
                    </div>
                    <div>
                      <p className="text-[11px] text-[#64748B] tracking-wider uppercase mb-2">
                        Ажлын цаг
                      </p>
                      <p className="text-[#000000] text-[15px]">Да-Ба 09:00 - 18:00</p>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>

            {/* Contact Form */}
            <Reveal delay={0.2}>
              <form className="bg-[#F0F4F8] border border-[#E2E8F0] rounded-2xl p-5 lg:p-4 space-y-6 shadow-sm">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[11px] text-[#64748B] tracking-wider uppercase mb-3 block">
                      Нэр
                    </label>
                    <input
                      type="text"
                      placeholder="Таны нэр"
                      className="w-full px-5 py-4 bg-[#F0F4F8] border border-[#E2E8F0] text-[#000000] placeholder-[#94A3B8] focus:outline-none focus:border-[#EC6707] focus:ring-1 focus:ring-[#EC6707] transition-all rounded-lg text-[15px]"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] text-[#64748B] tracking-wider uppercase mb-3 block">
                      Имэйл
                    </label>
                    <input
                      type="email"
                      placeholder="Имэйл хаяг"
                      className="w-full px-5 py-4 bg-[#F0F4F8] border border-[#E2E8F0] text-[#000000] placeholder-[#94A3B8] focus:outline-none focus:border-[#EC6707] focus:ring-1 focus:ring-[#EC6707] transition-all rounded-lg text-[15px]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[11px] text-[#64748B] tracking-wider uppercase mb-3 block">
                      Утас
                    </label>
                    <input
                      type="tel"
                      placeholder="Утасны дугаар"
                      className="w-full px-5 py-4 bg-[#F0F4F8] border border-[#E2E8F0] text-[#000000] placeholder-[#94A3B8] focus:outline-none focus:border-[#EC6707] focus:ring-1 focus:ring-[#EC6707] transition-all rounded-lg text-[15px]"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] text-[#64748B] tracking-wider uppercase mb-3 block">
                      Гарчиг
                    </label>
                    <input
                      type="text"
                      placeholder="Гарчиг"
                      className="w-full px-5 py-4 bg-[#F0F4F8] border border-[#E2E8F0] text-[#000000] placeholder-[#94A3B8] focus:outline-none focus:border-[#EC6707] focus:ring-1 focus:ring-[#EC6707] transition-all rounded-lg text-[15px]"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[11px] text-[#64748B] tracking-wider uppercase mb-3 block">
                    Зурвас
                  </label>
                  <textarea
                    rows={6}
                    placeholder="Таны зурвас"
                    className="w-full px-5 py-4 bg-[#F0F4F8] border border-[#E2E8F0] text-[#000000] placeholder-[#94A3B8] focus:outline-none focus:border-[#EC6707] focus:ring-1 focus:ring-[#EC6707] transition-all resize-none rounded-lg text-[15px]"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="group inline-flex items-center gap-3 px-10 py-5 bg-[#EC6707] text-white text-sm font-semibold tracking-wide hover:bg-[#B35405] transition-all duration-500 rounded-sm"
                >
                  Илгээх
                  <Send size={16} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </form>
            </Reveal>
          </div>
        </div>
      </section>

      {/* MAP */}
      <section className="w-full py-24 bg-[#E8EEF4]">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <Reveal>
            <div className="relative h-[400px] bg-[#E2E8F0] rounded-xl overflow-hidden">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d21376.48181839523!2d106.9052!3d47.9185!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDfCsDU1JzA2LjYiTiAxMDbCsDU0JzE4LjciRQ!5e0!3m2!1sen!2smn!4v1"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
