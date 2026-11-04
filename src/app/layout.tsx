import type { Metadata } from "next";
import localFont from "next/font/local";
import Script from "next/script";
import type { ReactNode } from "react";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { siteUrl } from "@/lib/site-url";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/geist-latin.woff2",
  variable: "--font-geist-sans",
  weight: "100 900",
  display: "swap",
});

const geistMono = localFont({
  src: "./fonts/geist-mono-latin.woff2",
  variable: "--font-geist-mono",
  weight: "100 900",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    template: "%s | Hugo Pereira",
    default: "Hugo Pereira",
  },
  description:
    "Portfólio de Hugo Pereira, desenvolvedor full stack. Conheça meus projetos, habilidades e trajetória.",
  openGraph: {
    type: "website",
    locale: "pt_BR",
    siteName: "Hugo Pereira",
    title: "Hugo Pereira | Desenvolvedor Full Stack",
    description:
      "Conheça os projetos, habilidades e trajetória de Hugo Pereira, desenvolvedor full stack.",
    images: [
      {
        url: "/images/banner.png",
        alt: "Hugo Pereira, desenvolvedor full stack",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Hugo Pereira | Desenvolvedor Full Stack",
    description:
      "Conheça os projetos, habilidades e trajetória de Hugo Pereira, desenvolvedor full stack.",
    images: ["/images/banner.png"],
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="pt-BR"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className={`${geistSans.className} min-h-full flex flex-col`}>
        <Script id="theme-script" strategy="beforeInteractive">
          {`try{var s=localStorage.getItem("theme");var p=window.matchMedia("(prefers-color-scheme: dark)").matches;if(s==="dark"||(!s&&p)){document.documentElement.classList.add("dark");document.documentElement.style.colorScheme="dark";}else{document.documentElement.classList.remove("dark");document.documentElement.style.colorScheme="light";}}catch(e){}`}
        </Script>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
