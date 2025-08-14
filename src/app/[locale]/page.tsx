import { Suspense } from "react";
import { getTranslations } from "next-intl/server";
import { NavBar } from "@/components/navbar";
import { MenuFilters } from "@/components/menu-filters";
import { DishGrid } from "@/components/dish-grid";
import { Footer } from "@/components/footer";

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const t = await getTranslations({ locale });

  return {
    title: `${t("menu.title")} | ${t("header.title")}`,
    description: t("about.description"),
  };
}

export default async function HomePage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const t = await getTranslations({ locale });

  return (
    <div className="min-h-screen bg-background">
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

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <Suspense
                fallback={
                  <div className="animate-pulse bg-muted rounded-lg h-64" />
                }
              >
                <MenuFilters />
              </Suspense>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <Suspense fallback={<DishGridSkeleton />}>
              <DishGrid />
            </Suspense>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

function DishGridSkeleton() {
  return (
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
  );
}
