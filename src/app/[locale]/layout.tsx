import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { CartProvider } from "@/contexts/cart-context";
import { ThemeProvider } from "@/contexts/theme-context";
import "../globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Moo Moo Moo Restaurant · 牛牛牛餐厅",
  description:
    "位于阿布扎比的现代中餐厅，提供正宗美味的中式料理。A modern Chinese restaurant in Abu Dhabi, serving authentic and delicious Chinese cuisine.",
  keywords:
    "中餐, 餐厅, 阿布扎比, Chinese restaurant, Abu Dhabi, authentic cuisine",
  authors: [{ name: "Moo Moo Moo Restaurant" }],
  openGraph: {
    title: "Moo Moo Moo Restaurant · 牛牛牛餐厅",
    description: "位于阿布扎比的现代中餐厅，提供正宗美味的中式料理。",
    type: "website",
    locale: "zh_CN",
    alternateLocale: "en_US",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
  },
};

export function generateStaticParams() {
  return [{ locale: "zh" }, { locale: "en" }];
}

export default async function RootLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const messages = await getMessages({ locale });

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className={inter.className}>
        <NextIntlClientProvider messages={messages}>
          <ThemeProvider>
            <CartProvider>{children}</CartProvider>
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
