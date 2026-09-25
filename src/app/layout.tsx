import { Manrope } from "next/font/google";

import "./globals.css";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin", "cyrillic"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="mn" className={`${manrope.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-[#F0F4F8] text-[#000000] font-sans">
        {children}
      </body>
    </html>
  );
}
