import { getTranslations, setRequestLocale } from "next-intl/server";
import { NavBar } from "@/components/navbar";
import { Footer } from "@/components/footer";
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
      ? `关于我们 | 牛牛牛餐厅 - 阿布扎比正宗中餐厅`
      : `About Us | Moo Moo Moo Restaurant - Authentic Chinese Restaurant in Abu Dhabi`,
    description: isZh
      ? "了解牛牛牛餐厅 - 位于阿布扎比Al Danah区的正宗中餐厅。营业时间、联系方式、地址信息。提供川菜、粤菜、北京菜等传统中式料理。电话：+971-056-496-6886"
      : "Learn about Moo Moo Moo Restaurant - Authentic Chinese restaurant in Abu Dhabi Al Danah. Hours, contact info, address. Serving traditional Sichuan, Cantonese, and Beijing cuisine. Phone: +971-056-496-6886",
    keywords: isZh 
      ? "牛牛牛餐厅, 阿布扎比中餐厅, Al Danah中餐, 餐厅信息, 营业时间, 联系方式, 川菜餐厅, 粤菜餐厅, 正宗中餐"
      : "Moo Moo Moo Restaurant, Abu Dhabi Chinese restaurant, Al Danah Chinese food, restaurant info, opening hours, contact, Sichuan restaurant, Cantonese restaurant, authentic Chinese",
    openGraph: {
      title: isZh 
        ? "关于牛牛牛餐厅 - 阿布扎比正宗中餐厅"
        : "About Moo Moo Moo Restaurant - Authentic Chinese Restaurant in Abu Dhabi",
      description: isZh
        ? "了解牛牛牛餐厅的历史、营业时间、联系方式。位于阿布扎比Al Danah区，提供正宗川菜、粤菜、北京菜。"
        : "Learn about Moo Moo Moo Restaurant's history, hours, and contact info. Located in Abu Dhabi Al Danah, serving authentic Sichuan, Cantonese, and Beijing cuisine.",
      type: "website",
      locale: locale === "zh" ? "zh_CN" : "en_US",
    },
    alternates: {
      canonical: `https://menuformoo.alonglfb.com/${locale}/about`,
      languages: {
        "zh-CN": "https://menuformoo.alonglfb.com/zh/about",
        "en-US": "https://menuformoo.alonglfb.com/en/about",
      },
    },
  };
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale });

  return (
    <div className="min-h-screen bg-background">
      <SEOStructuredData locale={locale} page="about" />
      <NavBar />

      <main className="container py-12">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="flex justify-center items-center space-x-4 mb-6">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-2xl">牛</span>
              </div>
              <h1 className="text-4xl font-bold">{t("header.title")}</h1>
            </div>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              {t("about.description")}
            </p>
          </div>

          {/* Content Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Hours */}
            <div className="card p-8">
              <h2 className="text-2xl font-semibold mb-6 flex items-center">
                <span className="mr-3">🕒</span>
                {t("about.hours")}
              </h2>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-4 bg-muted rounded-lg">
                  <span className="font-medium">{t("about.lunch")}</span>
                  <span className="text-muted-foreground">11:00 - 14:00</span>
                </div>
                <div className="flex justify-between items-center p-4 bg-muted rounded-lg">
                  <span className="font-medium">{t("about.dinner")}</span>
                  <span className="text-muted-foreground">17:00 - 22:00</span>
                </div>
              </div>
            </div>

            {/* Contact */}
            <div className="card p-8">
              <h2 className="text-2xl font-semibold mb-6 flex items-center">
                <span className="mr-3">📞</span>
                {t("about.contact")}
              </h2>
              <div className="space-y-4">
                <div>
                  <div className="font-medium mb-1">{t("about.manager")}</div>
                  <div className="text-muted-foreground">
                    {t("about.restaurantManager")}
                  </div>
                </div>
                <div>
                  <div className="font-medium mb-1">{t("about.phone")}</div>
                  <a
                    href="tel:+971056496686"
                    className="text-primary hover:text-primary/80 transition-colors"
                  >
                    +971 056 496 6886
                  </a>
                </div>
                <div>
                  <div className="font-medium mb-1">{t("about.whatsapp")}</div>
                  <a
                    href="https://wa.me/971056496686"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:text-primary/80 transition-colors"
                  >
                    +971 056 496 6886
                  </a>
                </div>
              </div>
            </div>

            {/* Location */}
            <div className="card p-8 md:col-span-2">
              <h2 className="text-2xl font-semibold mb-6 flex items-center">
                <span className="mr-3">📍</span>
                {t("about.address")}
              </h2>
              <div className="bg-muted rounded-lg p-6">
                <p className="text-lg leading-relaxed">
                  {t("about.fullAddress")}
                </p>
                <div className="mt-4">
                  <a
                    href="https://maps.app.goo.gl/RPzMRD8PJ8kqfxKo6"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-primary hover:text-primary/80 transition-colors"
                  >
                    <span className="mr-2">🗺️</span>
                    {t("about.viewOnMaps")}
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Features */}
          <div className="mt-16">
            <h2 className="text-3xl font-bold text-center mb-12">
              {t("about.whyChoose")}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl">🥢</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">
                  {t("about.features.authentic.title")}
                </h3>
                <p className="text-muted-foreground">
                  {t("about.features.authentic.description")}
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl">🍃</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">
                  {t("about.features.fresh.title")}
                </h3>
                <p className="text-muted-foreground">
                  {t("about.features.fresh.description")}
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl">👨‍🍳</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">
                  {t("about.features.expert.title")}
                </h3>
                <p className="text-muted-foreground">
                  {t("about.features.expert.description")}
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
