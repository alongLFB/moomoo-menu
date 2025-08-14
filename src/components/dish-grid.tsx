"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { DishCard } from "./dish-card";
import { MenuFilters } from "./menu-filters";
import type { Dish } from "@/lib/db/schema";

export function DishGrid() {
  const [dishes, setDishes] = useState<Dish[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState({
    search: "",
    category: "all",
    priceRanges: [] as string[],
  });
  const t = useTranslations();
  const searchParams = useSearchParams();

  // Fetch dishes based on filters
  useEffect(() => {
    const fetchDishes = async () => {
      setLoading(true);
      setError(null);

      try {
        const params = new URLSearchParams();

        if (filters.search) {
          params.append("q", filters.search);
        }

        if (filters.category !== "all") {
          params.append("cat", filters.category);
        }

        // Convert price ranges to min/max
        if (filters.priceRanges.length > 0) {
          const priceRangeMap = {
            under50: { min: 0, max: 50 },
            between50100: { min: 50, max: 100 },
            over100: { min: 100, max: 9999 },
          };

          let minPrice = Infinity;
          let maxPrice = 0;

          filters.priceRanges.forEach((range) => {
            const priceRange =
              priceRangeMap[range as keyof typeof priceRangeMap];
            if (priceRange) {
              minPrice = Math.min(minPrice, priceRange.min);
              maxPrice = Math.max(maxPrice, priceRange.max);
            }
          });

          if (minPrice !== Infinity)
            params.append("priceMin", minPrice.toString());
          if (maxPrice !== 0 && maxPrice !== 9999)
            params.append("priceMax", maxPrice.toString());
        }

        const response = await fetch(`/api/v1/dishes?${params.toString()}`);
        const data = await response.json();

        if (data.success) {
          setDishes(data.data);
        } else {
          setError(data.error || "Failed to fetch dishes");
        }
      } catch (err) {
        setError("Failed to fetch dishes");
        console.error("Error fetching dishes:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchDishes();
  }, [filters]);

  // Handle URL-based filters (from category pages, etc.)
  useEffect(() => {
    const category = searchParams.get("category");
    const search = searchParams.get("q");

    if (category || search) {
      setFilters((prev) => ({
        ...prev,
        category: category || "all",
        search: search || "",
      }));
    }
  }, [searchParams]);

  if (loading) {
    return <DishGridSkeleton />;
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <div className="text-destructive mb-4">{error}</div>
        <button
          onClick={() => window.location.reload()}
          className="button-primary"
        >
          {t("common.retry")}
        </button>
      </div>
    );
  }

  if (dishes.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-6xl mb-4">🔍</div>
        <h3 className="text-xl font-semibold mb-2">{t("menu.noResults")}</h3>
        <p className="text-muted-foreground">
          Try adjusting your search or filter criteria
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Mobile Filters */}
      <div className="lg:hidden">
        <MenuFilters onFiltersChange={setFilters} />
      </div>

      {/* Desktop Filters */}
      <div className="hidden lg:block">
        <MenuFilters onFiltersChange={setFilters} />
      </div>

      {/* Results */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {dishes.map((dish) => (
          <DishCard key={dish.id} dish={dish} />
        ))}
      </div>
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
