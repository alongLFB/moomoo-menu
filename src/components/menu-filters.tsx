"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { MagnifyingGlassIcon, FunnelIcon } from "@heroicons/react/24/outline";
import { motion, AnimatePresence } from "framer-motion";

interface MenuFiltersProps {
  onFiltersChange?: (filters: {
    search: string;
    category: string;
    priceRanges: string[];
  }) => void;
}

export function MenuFilters({ onFiltersChange }: MenuFiltersProps) {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedPriceRanges, setSelectedPriceRanges] = useState<string[]>([]);
  const [categories, setCategories] = useState([]);
  const [isExpanded, setIsExpanded] = useState(false);
  const t = useTranslations();

  // Fetch categories
  useEffect(() => {
    fetch("/api/v1/categories")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setCategories(data.data);
        }
      })
      .catch(console.error);
  }, []);

  // Notify parent of filter changes
  useEffect(() => {
    onFiltersChange?.({
      search,
      category: selectedCategory,
      priceRanges: selectedPriceRanges,
    });
  }, [search, selectedCategory, selectedPriceRanges, onFiltersChange]);

  const priceRanges = [
    { value: "under50", label: t("menu.under50"), min: 0, max: 50 },
    { value: "between50100", label: t("menu.between50100"), min: 50, max: 100 },
    { value: "over100", label: t("menu.over100"), min: 100, max: Infinity },
  ];

  const handlePriceRangeChange = (value: string) => {
    setSelectedPriceRanges((prev) =>
      prev.includes(value) ? prev.filter((r) => r !== value) : [...prev, value]
    );
  };

  const clearFilters = () => {
    setSearch("");
    setSelectedCategory("all");
    setSelectedPriceRanges([]);
  };

  return (
    <div className="space-y-6">
      {/* Mobile Filter Toggle */}
      <div className="lg:hidden">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center justify-between w-full p-3 border border-border rounded-lg bg-card"
        >
          <span className="flex items-center space-x-2">
            <FunnelIcon className="w-5 h-5" />
            <span className="font-medium">{t("common.filter")}</span>
          </span>
          <motion.div
            animate={{ rotate: isExpanded ? 180 : 0 }}
            transition={{ duration: 0.2 }}
          >
            ▼
          </motion.div>
        </button>
      </div>

      {/* Filters Content */}
      <AnimatePresence>
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{
            height: isExpanded || window.innerWidth >= 1024 ? "auto" : 0,
            opacity: isExpanded || window.innerWidth >= 1024 ? 1 : 0,
          }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="space-y-6 overflow-hidden"
        >
          {/* Search */}
          <div>
            <label className="block text-sm font-medium mb-2">
              {t("common.search")}
            </label>
            <div className="relative">
              <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder={t("menu.searchPlaceholder")}
                className="input pl-10"
              />
            </div>
          </div>

          {/* Categories */}
          <div>
            <label className="block text-sm font-medium mb-2">
              {t("menu.categories")}
            </label>
            <div className="space-y-2">
              <label className="flex items-center">
                <input
                  type="radio"
                  value="all"
                  checked={selectedCategory === "all"}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="mr-2"
                />
                {t("menu.allCategories")}
              </label>
              {categories.map((category: any) => (
                <label key={category.id} className="flex items-center">
                  <input
                    type="radio"
                    value={category.id.toString()}
                    checked={selectedCategory === category.id.toString()}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="mr-2"
                  />
                  {t(`categories.${category.slug}`)}
                </label>
              ))}
            </div>
          </div>

          {/* Price Range */}
          <div>
            <label className="block text-sm font-medium mb-2">
              {t("menu.priceRange")}
            </label>
            <div className="space-y-2">
              {priceRanges.map((range) => (
                <label key={range.value} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={selectedPriceRanges.includes(range.value)}
                    onChange={() => handlePriceRangeChange(range.value)}
                    className="mr-2"
                  />
                  {range.label}
                </label>
              ))}
            </div>
          </div>

          {/* Clear Filters */}
          <button onClick={clearFilters} className="w-full button-secondary">
            {t("common.clear")}
          </button>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
