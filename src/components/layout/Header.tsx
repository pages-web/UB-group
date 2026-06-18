"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const navItems = [
  { label: "Нүүр", href: "/" },
  { label: "Бидний тухай", href: "/about" },
  { label: "Бизнес", href: "/business" },
  { label: "Тогтвортой хөгжил", href: "/sustainability" },
  { label: "Карьер ба хамтын ажиллагаа", href: "/career" },
  { label: "Мэдээ мэдээлэл", href: "/news" },
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
            : "bg-transparent"
        }`}
      >
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="flex h-[72px] items-center justify-between">
            {/* Logo */}
            <Link href={`/${locale}`} className="flex items-center gap-3 group">
              <div className="flex flex-col">
                <span className={`text-xl font-bold tracking-[0.15em] transition-colors duration-300 ${
                  scrolled ? "text-[#1E3A5F]" : "text-white"
                }`}
                >
                  UB GROUP
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1">
              {navItems.map((item) => {
                const isActive = pathWithoutLocale === item.href;
                return (
                  <Link
                    key={item.href}
                    href={`/${locale}${item.href}`}
                    className={`relative px-4 py-2 text-[13px] font-medium tracking-wide transition-all duration-300 rounded-full ${
                      scrolled
                        ? isActive
                          ? "text-[#1E3A5F]"
                          : "text-[#334155] hover:text-[#1E3A5F]"
                        : isActive
                        ? "text-white"
                        : "text-white/70 hover:text-white"
                    }`}
                  >
                    {item.label}
                    {isActive && (
                      <motion.div
                        layoutId="activeNav"
                        className={`absolute inset-0 rounded-full -z-10 ${
                          scrolled ? "bg-[#1E3A5F]/10" : "bg-white/15"
                        }`}
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Language Switcher */}
            <div className="hidden lg:flex items-center gap-1">
              <button
                onClick={() => switchLocale("mn")}
                className={`px-3 py-1.5 text-[11px] font-semibold tracking-wider rounded-full transition-all duration-300 ${
                  locale === "mn"
                    ? "bg-[#1E3A5F] text-white"
                    : scrolled
                    ? "text-[#64748B] hover:text-[#0F172A]"
                    : "text-white/60 hover:text-white"
                }`}
              >
                MN
              </button>
              <button
                onClick={() => switchLocale("en")}
                className={`px-3 py-1.5 text-[11px] font-semibold tracking-wider rounded-full transition-all duration-300 ${
                  locale === "en"
                    ? "bg-[#1E3A5F] text-white"
                    : scrolled
                    ? "text-[#64748B] hover:text-[#0F172A]"
                    : "text-white/60 hover:text-white"
                }`}
              >
                EN
              </button>
            </div>

            {/* Mobile menu button */}
            <button
              className={`lg:hidden p-2 transition-colors ${
                scrolled ? "text-[#0F172A]" : "text-white"
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
                      className="block text-lg font-medium text-[#0F172A] hover:text-[#1E3A5F] py-4 border-b border-[#E2E8F0] transition-colors"
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
                    locale === "mn" ? "bg-[#1E3A5F] text-white" : "text-[#64748B]"
                  }`}
                >
                  MN
                </button>
                <button
                  onClick={() => switchLocale("en")}
                  className={`px-4 py-2 text-sm font-semibold tracking-wider rounded-full transition-all ${
                    locale === "en" ? "bg-[#1E3A5F] text-white" : "text-[#64748B]"
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
