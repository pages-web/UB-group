"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";

const navItems = [
  { label: "Нүүр", href: "/" },
  {
    label: "Бидний тухай",
    href: "/about",
    children: [
      { label: "Компанийн танилцуулга", href: "/about" },
      { label: "Алсын хараа, эрхэм зорилго", href: "/about#vision" },
      { label: "Компанийн түүх", href: "/about#history" },
      { label: "Удирдлагын баг", href: "/about#team" },
    ],
  },
  {
    label: "Бизнес",
    href: "/business",
    children: [
      { label: "Барилгын төслүүд", href: "/business/construction" },
      { label: "Санхүү, хөрөнгө оруулалт", href: "/business/investment" },
      { label: "Тээвэр, логистик", href: "/business/logistics" },
      { label: "Лайфстайл, үйлчилгээ", href: "/business/lifestyle" },
      { label: "Менежмент", href: "/business/management" },
    ],
  },
  { label: "Тогтвортой хөгжил", href: "/sustainability" },
  {
    label: "Мэдээ мэдээлэл",
    href: "/news",
    children: [
      { label: "Бүгд", href: "/news" },
      { label: "Барилгын төслүүд", href: "/news?category=Барилгын төслүүд" },
      { label: "Санхүү, хөрөнгө оруулалт", href: "/news?category=Санхүү, хөрөнгө оруулалт" },
      { label: "Тээвэр", href: "/news?category=Тээвэр" },
      { label: "Лайфстайл", href: "/news?category=Лайфстайл" },
      { label: "Менежмент", href: "/news?category=Менежмент" },
    ],
  },
  {
    label: "Карьер ба хамтын ажиллагаа",
    href: "/career",
    children: [
      { label: "Нээлттэй ажлын байр", href: "/career#jobs" },
      { label: "Тендерүүд", href: "/career#tenders" },
      { label: "Анкет илгээх", href: "/career#application" },
    ],
  },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const locale = pathname.split("/")[1] || "mn";
  const pathWithoutLocale = pathname.replace(new RegExp(`^/${locale}`), "") || "/";

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const switchLocale = (newLocale: string) => {
    const newPath = `/${newLocale}${pathWithoutLocale}`;
    router.push(newPath);
  };

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "glass-white shadow-md"
            : "bg-white/90 backdrop-blur-sm shadow-sm"
        }`}
      >
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="flex h-[72px] items-center justify-between">
            {/* Logo */}
            <Link href={`/${locale}`} className="flex items-center gap-3 group">
              <Image
                src="/ub-logo.png"
                alt="UB Group"
                width={220}
                height={64}
                className="h-9 w-auto object-contain"
                priority
              />
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1">
              {navItems.map((item) => {
                const isActive = pathWithoutLocale === item.href;
                const hasChildren = !!item.children && item.children.length > 0;
                return (
                  <div
                    key={item.href}
                    className="relative group"
                  >
                    <Link
                      href={`/${locale}${item.href}`}
                      className={`relative inline-flex items-center gap-1 px-4 py-2 text-[13px] font-medium tracking-wide transition-all duration-300 rounded-full ${
                        scrolled
                          ? isActive
                            ? "text-[#EC6707]"
                            : "text-[#334155] hover:text-[#EC6707]"
                          : isActive
                          ? "text-[#EC6707]"
                          : "text-[#334155] hover:text-[#EC6707]"
                      }`}
                    >
                      {item.label}
                      {hasChildren && (
                        <svg
                          className="w-3.5 h-3.5 opacity-60 transition-transform duration-300 group-hover:rotate-180"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2}
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                        </svg>
                      )}
                      {isActive && (
                        <motion.div
                          layoutId="activeNav"
                          className={`absolute inset-0 rounded-full -z-10 ${
                            scrolled ? "bg-[#EC6707]/10" : "bg-[#EC6707]/10"
                          }`}
                          transition={{ type: "spring", stiffness: 380, damping: 30 }}
                        />
                      )}
                    </Link>

                    {hasChildren && (
                      <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                        <div className="bg-white rounded-2xl shadow-xl border border-[#E2E8F0] py-3 px-2 min-w-[220px]">
                          {item.children!.map((child) => (
                            <Link
                              key={child.href}
                              href={`/${locale}${child.href}`}
                              className="block px-4 py-2.5 text-[13px] font-medium text-[#334155] hover:text-[#EC6707] hover:bg-[#F0F4F8] rounded-xl transition-colors whitespace-nowrap"
                            >
                              {child.label}
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </nav>

            {/* Language Switcher */}
            <div className="hidden lg:flex items-center gap-1">
              <button
                onClick={() => switchLocale("mn")}
                className={`px-3 py-1.5 text-[11px] font-semibold tracking-wider rounded-full transition-all duration-300 ${
                  locale === "mn"
                    ? "bg-[#EC6707] text-white"
                    : scrolled
                    ? "text-[#64748B] hover:text-[#000000]"
                    : "text-[#64748B] hover:text-[#000000]"
                }`}
              >
                MN
              </button>
              <button
                onClick={() => switchLocale("en")}
                className={`px-3 py-1.5 text-[11px] font-semibold tracking-wider rounded-full transition-all duration-300 ${
                  locale === "en"
                    ? "bg-[#EC6707] text-white"
                    : scrolled
                    ? "text-[#64748B] hover:text-[#000000]"
                    : "text-[#64748B] hover:text-[#000000]"
                }`}
              >
                EN
              </button>
            </div>

            {/* Mobile menu button */}
            <button
              className={`lg:hidden p-2 transition-colors ${
                scrolled ? "text-[#000000]" : "text-[#000000]"
              }`}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={22} strokeWidth={1.5} /> : <Menu size={22} strokeWidth={1.5} />}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 lg:hidden"
          >
            <div className="absolute inset-0 bg-white/95 backdrop-blur-xl" onClick={() => setMobileMenuOpen(false)} />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="absolute right-0 top-0 h-full w-full max-w-sm bg-white border-l border-[#E2E8F0] p-8 pt-24 shadow-2xl"
            >
              <div className="space-y-1">
                {navItems.map((item, index) => (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 + 0.2 }}
                  >
                    <Link
                      href={`/${locale}${item.href}`}
                      className="block text-lg font-medium text-[#000000] hover:text-[#EC6707] py-4 border-b border-[#E2E8F0] transition-colors"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {item.label}
                    </Link>
                  </motion.div>
                ))}
              </div>
              <div className="flex items-center gap-3 mt-8 pt-8 border-t border-[#E2E8F0]">
                <button
                  onClick={() => switchLocale("mn")}
                  className={`px-4 py-2 text-sm font-semibold tracking-wider rounded-full transition-all ${
                    locale === "mn" ? "bg-[#EC6707] text-white" : "text-[#64748B]"
                  }`}
                >
                  MN
                </button>
                <button
                  onClick={() => switchLocale("en")}
                  className={`px-4 py-2 text-sm font-semibold tracking-wider rounded-full transition-all ${
                    locale === "en" ? "bg-[#EC6707] text-white" : "text-[#64748B]"
                  }`}
                >
                  EN
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
