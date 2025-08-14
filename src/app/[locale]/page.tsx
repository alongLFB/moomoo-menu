import { Suspense } from "react";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { NavBar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { MenuPageContent } from "@/components/menu-page-content";
import { SEOStructuredData } from "@/components/seo-structured-data";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const isZh = locale === "zh";
  
  return {
    title: isZh 
      ? `牛牛牛餐厅菜单 - 阿布扎比正宗中餐厅 | 川菜 粤菜 北京菜`
      : `Moo Moo Moo Restaurant Menu - Authentic Chinese Restaurant in Abu Dhabi | Sichuan Cantonese Beijing Cuisine`,
    description: isZh
      ? "浏览牛牛牛餐厅完整菜单 - 阿布扎比Al Danah区正宗中餐厅。提供传统川菜、粤菜、北京菜、面食、汤品等。在线点餐，电话：+971-056-496-6886。营业时间：11:00-14:00, 17:00-22:00"
      : "Browse Moo Moo Moo Restaurant's complete menu - Authentic Chinese restaurant in Abu Dhabi Al Danah. Traditional Sichuan, Cantonese, Beijing cuisine, noodles, soups. Order online, call: +971-056-496-6886. Hours: 11:00-14:00, 17:00-22:00",
    keywords: isZh 
      ? "牛牛牛餐厅菜单, 阿布扎比中餐厅, Al Danah中餐, 川菜菜单, 粤菜菜单, 北京菜菜单, 中式面食, 中式汤品, 在线点餐, 阿布扎比美食"
      : "Moo Moo Moo Restaurant menu, Abu Dhabi Chinese restaurant, Al Danah Chinese food, Sichuan menu, Cantonese menu, Beijing cuisine menu, Chinese noodles, Chinese soups, online ordering, Abu Dhabi dining",
    openGraph: {
      title: isZh 
        ? "牛牛牛餐厅菜单 - 阿布扎比正宗中餐厅"
        : "Moo Moo Moo Restaurant Menu - Authentic Chinese Restaurant in Abu Dhabi",
      description: isZh
        ? "浏览我们的完整菜单，包括川菜、粤菜、北京菜、面食、汤品等传统中式料理。"
        : "Browse our complete menu featuring Sichuan, Cantonese, Beijing cuisine, noodles, soups and traditional Chinese dishes.",
      type: "website",
      locale: locale === "zh" ? "zh_CN" : "en_US",
    },
    alternates: {
      canonical: `https://menuformoo.alonglfb.com/${locale}`,
      languages: {
        "zh-CN": "https://menuformoo.alonglfb.com/zh",
        "en-US": "https://menuformoo.alonglfb.com/en",
      },
    },
  };
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale });

  return (
    <div className="min-h-screen bg-background">
      <SEOStructuredData locale={locale} page="home" />
      <NavBar />

      <main className="container py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            {t("menu.title")}
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            {t("about.description")}
          </p>
        </div>

        <Suspense fallback={
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {Array.from({ length: 9 }).map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="bg-muted rounded-lg aspect-square mb-4" />
                <div className="bg-muted rounded h-4 mb-2" />
                <div className="bg-muted rounded h-3 w-2/3 mb-2" />
                <div className="bg-muted rounded h-3 w-1/3" />
              </div>
            ))}
          </div>
        }>
          <MenuPageContent />
        </Suspense>
      </main>

      <Footer />
    </div>
  );
}
