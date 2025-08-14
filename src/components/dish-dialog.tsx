"use client";

import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon, MinusIcon, PlusIcon } from "@heroicons/react/24/outline";
import { useTranslations, useLocale } from "next-intl";
import { motion } from "framer-motion";
import Image from "next/image";
import { useCart } from "@/contexts/cart-context";
import type { Dish } from "@/lib/db/schema";

interface DishDialogProps {
  dish: Dish;
  isOpen: boolean;
  onClose: () => void;
}

export function DishDialog({ dish, isOpen, onClose }: DishDialogProps) {
  const [quantity, setQuantity] = useState(1);
  const { addItem } = useCart();
  const t = useTranslations();
  const locale = useLocale();

  const name = locale === "zh" ? dish.nameZh : dish.nameEn;
  const description = locale === "zh" ? dish.descriptionZh : dish.descriptionEn;
  const ingredients = locale === "zh" ? dish.ingredientsZh : dish.ingredientsEn;
  const allergens = locale === "zh" ? dish.allergensZh : dish.allergensEn;

  const handleAddToCart = () => {
    addItem(dish, quantity);
    onClose();
    setQuantity(1);
  };

  const tags = dish.tags ? JSON.parse(dish.tags) : [];

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/50 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 scale-95"
              enterTo="opacity-100 translate-y-0 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 scale-100"
              leaveTo="opacity-0 translate-y-4 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-background text-left align-middle shadow-xl transition-all">
                {/* Header */}
                <div className="relative">
                  <div className="aspect-video relative overflow-hidden">
                    <Image
                      src={dish.imageFull || dish.imageThumbnail || 'https://via.placeholder.com/800x450/f3f4f6/9ca3af?text=Dish+Image'}
                      alt={name || dish.nameEn || dish.nameZh || "Dish image"}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />

                    {/* Close Button */}
                    <button
                      type="button"
                      className="absolute top-4 right-4 rounded-full bg-background/80 p-2 hover:bg-background transition-colors"
                      onClick={onClose}
                    >
                      <XMarkIcon className="h-6 w-6" />
                    </button>

                    {/* Tags */}
                    {tags.length > 0 && (
                      <div className="absolute top-4 left-4 flex flex-wrap gap-1">
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
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <Dialog.Title
                      as="h3"
                      className="text-xl font-semibold leading-6"
                    >
                      {name}
                    </Dialog.Title>
                    <span className="text-2xl font-bold text-primary ml-4">
                      {dish.price.toFixed(2)} AED
                    </span>
                  </div>

                  {description && (
                    <p className="text-muted-foreground mb-4">{description}</p>
                  )}

                  {/* Details */}
                  <div className="space-y-3 mb-6">
                    {ingredients && (
                      <div>
                        <h4 className="font-medium text-sm mb-1">
                          {t("dish.ingredients")}
                        </h4>
                        <p className="text-sm text-muted-foreground">
                          {ingredients}
                        </p>
                      </div>
                    )}

                    {allergens && (
                      <div>
                        <h4 className="font-medium text-sm mb-1">
                          {t("dish.allergens")}
                        </h4>
                        <p className="text-sm text-muted-foreground">
                          {allergens}
                        </p>
                      </div>
                    )}

                    {dish.prepTime && (
                      <div>
                        <h4 className="font-medium text-sm mb-1">
                          {t("dish.prepTime")}
                        </h4>
                        <p className="text-sm text-muted-foreground">
                          {dish.prepTime} {t("dish.minutes")}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Quantity & Add to Cart */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <span className="text-sm font-medium">
                        {t("dish.quantity")}
                      </span>
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => setQuantity(Math.max(1, quantity - 1))}
                          className="p-1 rounded-md hover:bg-accent transition-colors"
                          disabled={quantity <= 1}
                        >
                          <MinusIcon className="w-4 h-4" />
                        </button>
                        <span className="w-8 text-center font-medium">
                          {quantity}
                        </span>
                        <button
                          onClick={() => setQuantity(quantity + 1)}
                          className="p-1 rounded-md hover:bg-accent transition-colors"
                        >
                          <PlusIcon className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleAddToCart}
                      className="button-primary"
                    >
                      {t("dish.addToCart")} •{" "}
                      {(dish.price * quantity).toFixed(2)} AED
                    </motion.button>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
