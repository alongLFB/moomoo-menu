import { getTranslations } from "next-intl/server";
import { NavBar } from "@/components/navbar";
import { Footer } from "@/components/footer";

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const t = await getTranslations({ locale });

  return {
    title: `${t("about.title")} | ${t("header.title")}`,
    description: t("about.description"),
  };
}

export default async function AboutPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const t = await getTranslations({ locale });

  return (
    <div className="min-h-screen bg-background">
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
                    Restaurant Manager
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
                  <div className="font-medium mb-1">WhatsApp</div>
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
                    href="https://maps.google.com/?q=Electra+Abdullah+Bin+Humaid+Al+Rumaithi+St+Al+Danah+Zone+1+Abu+Dhabi"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-primary hover:text-primary/80 transition-colors"
                  >
                    <span className="mr-2">🗺️</span>
                    View on Google Maps
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Features */}
          <div className="mt-16">
            <h2 className="text-3xl font-bold text-center mb-12">
              Why Choose Moo Moo Moo?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl">🥢</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">
                  Authentic Cuisine
                </h3>
                <p className="text-muted-foreground">
                  Traditional Chinese flavors prepared with authentic recipes
                  and techniques.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl">🍃</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">
                  Fresh Ingredients
                </h3>
                <p className="text-muted-foreground">
                  We source the finest and freshest ingredients daily to ensure
                  quality.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl">👨‍🍳</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">Expert Chefs</h3>
                <p className="text-muted-foreground">
                  Our experienced chefs bring years of culinary expertise to
                  every dish.
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
