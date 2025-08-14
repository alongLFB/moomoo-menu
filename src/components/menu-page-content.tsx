"use client";

import { Suspense, useState, useCallback } from "react";
import { MenuFilters } from "./menu-filters";
import { DishGrid } from "./dish-grid";

export function MenuPageContent() {
  const [filters, setFilters] = useState({
    search: "",
    category: "all",
    priceRanges: [] as string[],
  });

  const handleFiltersChange = useCallback((newFilters: typeof filters) => {
    setFilters(newFilters);
  }, []);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
      {/* Filters Sidebar */}
      <div className="lg:col-span-1">
        <div className="sticky top-24">
          <Suspense
            fallback={
              <div className="animate-pulse bg-muted rounded-lg h-64" />
            }
          >
            <MenuFilters onFiltersChange={handleFiltersChange} />
          </Suspense>
        </div>
      </div>

      {/* Main Content */}
      <div className="lg:col-span-3">
        <Suspense fallback={<DishGridSkeleton />}>
          <DishGrid filters={filters} />
        </Suspense>
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
