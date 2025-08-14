"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useTranslations, useLocale } from "next-intl";
import { PlusIcon } from "@heroicons/react/24/outline";
import { useCart } from "@/contexts/cart-context";
import { DishDialog } from "./dish-dialog";
import type { Dish } from "@/lib/db/schema";

interface DishCardProps {
  dish: Dish;
}

export function DishCard({ dish }: DishCardProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { addItem } = useCart();
  const t = useTranslations();
  const locale = useLocale();

  const name = locale === "zh" ? dish.nameZh : dish.nameEn;
  const description = locale === "zh" ? dish.descriptionZh : dish.descriptionEn;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addItem(dish, 1);
  };

  const tags = dish.tags ? JSON.parse(dish.tags) : [];

  return (
    <>
      <motion.div
        layout
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ y: -4 }}
        transition={{ duration: 0.2 }}
        className="card overflow-hidden cursor-pointer group"
        onClick={() => setIsDialogOpen(true)}
      >
        {/* Image */}
        <div className="relative aspect-square overflow-hidden">
          <Image
            src={dish.imageThumbnail}
            alt={name}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />

          {/* Tags */}
          {tags.length > 0 && (
            <div className="absolute top-2 left-2 flex flex-wrap gap-1">
              {tags.map((tag: any) => (
                <span
                  key={tag.key}
                  className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-primary text-primary-foreground"
                >
                  <span className="mr-1">{tag.icon}</span>
                  {locale === "zh" ? tag.labelZh : tag.labelEn}
                </span>
              ))}
            </div>
          )}

          {/* Quick Add Button */}
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            whileHover={{ opacity: 1, scale: 1 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleAddToCart}
            className="absolute bottom-2 right-2 p-2 bg-background rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200"
            aria-label={t("menu.addToCart")}
          >
            <PlusIcon className="w-5 h-5" />
          </motion.button>
        </div>

        {/* Content */}
        <div className="p-4">
          <div className="flex items-start justify-between mb-2">
            <h3 className="font-semibold text-lg leading-tight line-clamp-2">
              {name}
            </h3>
            <span className="text-lg font-bold text-primary ml-2 shrink-0">
              {dish.price.toFixed(2)} AED
            </span>
          </div>

          {description && (
            <p className="text-muted-foreground text-sm line-clamp-2 mb-3">
              {description}
            </p>
          )}

          {/* Prep Time */}
          {dish.prepTime && (
            <div className="flex items-center text-xs text-muted-foreground">
              <span>⏱️</span>
              <span className="ml-1">
                {dish.prepTime} {t("dish.minutes")}
              </span>
            </div>
          )}
        </div>
      </motion.div>

      <DishDialog
        dish={dish}
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
      />
    </>
  );
}
