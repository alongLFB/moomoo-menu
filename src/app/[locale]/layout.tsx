import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { CartProvider } from "@/contexts/cart-context";
import { ThemeProvider } from "@/contexts/theme-context";
import "../globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Moo Moo Moo Restaurant · 牛牛牛餐厅 | 阿布扎比最佳中餐厅",
  description:
    "位于阿布扎比Al Danah区的正宗中餐厅，提供传统川菜、粤菜、北京菜。营业时间：午餐11:00-14:00，晚餐17:00-22:00。电话：+971-056-496-6886。A modern Chinese restaurant in Abu Dhabi Al Danah, serving authentic Sichuan, Cantonese, and Beijing cuisine.",
  keywords: [
    "阿布扎比中餐厅",
    "Abu Dhabi Chinese restaurant", 
    "Al Danah中餐",
    "正宗中餐",
    "川菜餐厅",
    "粤菜餐厅",
    "阿布扎比美食",
    "Chinese food Abu Dhabi",
    "authentic Chinese cuisine",
    "Sichuan restaurant",
    "Cantonese restaurant",
    "牛牛牛餐厅",
    "Moo Moo Moo Restaurant",
    "阿联酋中餐",
    "UAE Chinese food"
  ].join(", "),
  authors: [{ name: "Moo Moo Moo Restaurant" }],
  category: "restaurant",
  openGraph: {
    title: "Moo Moo Moo Restaurant · 牛牛牛餐厅 | 阿布扎比最佳中餐厅",
    description: "位于阿布扎比Al Danah区的正宗中餐厅，提供传统川菜、粤菜、北京菜。营业时间：11:00-22:00。",
    type: "website",
    locale: "zh_CN",
    alternateLocale: "en_US",
    siteName: "Moo Moo Moo Restaurant",
    images: [
      {
        url: "/images/restaurant-exterior.jpg",
        width: 1200,
        height: 630,
        alt: "Moo Moo Moo Restaurant exterior in Abu Dhabi",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Moo Moo Moo Restaurant · 阿布扎比最佳中餐厅",
    description: "位于阿布扎比Al Danah区的正宗中餐厅，提供传统川菜、粤菜、北京菜。",
    images: ["/images/restaurant-exterior.jpg"],
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
  alternates: {
    canonical: "https://menuformoo.alonglfb.com",
    languages: {
      "zh-CN": "https://menuformoo.alonglfb.com/zh",
      "en-US": "https://menuformoo.alonglfb.com/en",
    },
  },
};

export function generateStaticParams() {
  return [{ locale: "zh" }, { locale: "en" }];
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const messages = await getMessages({ locale });

  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                const theme = localStorage.getItem('moomoo-theme');
                if (theme === 'dark' || (!theme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                  document.documentElement.classList.add('dark');
                } else {
                  document.documentElement.classList.remove('dark');
                }
              } catch (e) {}
            `,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Restaurant",
              "name": "Moo Moo Moo Restaurant",
              "alternateName": "牛牛牛餐厅",
              "description": locale === "zh" 
                ? "位于阿布扎比Al Danah区的正宗中餐厅，提供传统川菜、粤菜、北京菜。"
                : "Authentic Chinese restaurant in Abu Dhabi Al Danah, serving traditional Sichuan, Cantonese, and Beijing cuisine.",
              "url": "https://menuformoo.alonglfb.com",
              "telephone": "+971-056-496-6886",
              "servesCuisine": ["Chinese", "Sichuan", "Cantonese", "Beijing"],
              "priceRange": "$$",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "Electra Abdullah Bin Humaid Al Rumaithi St",
                "addressLocality": "Al Danah",
                "addressRegion": "Zone 1", 
                "addressCountry": "AE",
                "postalCode": "00000"
              },
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": "24.4851",
                "longitude": "54.3525"
              },
              "openingHoursSpecification": [
                {
                  "@type": "OpeningHoursSpecification",
                  "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
                  "opens": "11:00",
                  "closes": "14:00",
                  "validFrom": "2024-01-01",
                  "validThrough": "2025-12-31"
                },
                {
                  "@type": "OpeningHoursSpecification", 
                  "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
                  "opens": "17:00",
                  "closes": "22:00",
                  "validFrom": "2024-01-01",
                  "validThrough": "2025-12-31"
                }
              ],
              "menu": "https://menuformoo.alonglfb.com/menu",
              "image": "https://menuformoo.alonglfb.com/images/restaurant-exterior.jpg",
              "logo": "https://menuformoo.alonglfb.com/images/logo.png",
              "sameAs": [
                "https://wa.me/971056496686"
              ],
              "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": "4.8",
                "reviewCount": "150"
              }
            }),
          }}
        />
      </head>
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
