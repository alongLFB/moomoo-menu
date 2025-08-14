"use client";

import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import {
  XMarkIcon,
  TrashIcon,
  MinusIcon,
  PlusIcon,
} from "@heroicons/react/24/outline";
import { useTranslations, useLocale } from "next-intl";
import { motion } from "framer-motion";
import Image from "next/image";
import { useCart } from "@/contexts/cart-context";
import type { CartItem } from "@/types";

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
  const { items, updateQuantity, removeItem, clearCart, total } = useCart();
  const t = useTranslations();
  const locale = useLocale();

  const generateOrderSummary = () => {
    if (items.length === 0) return;

    const itemsList = items
      .map((item) => {
        const name = locale === "zh" ? item.nameZh : item.nameEn;
        return `${item.quantity}× ${name} ￠ ${(
          item.price * item.quantity
        ).toFixed(2)} AED`;
      })
      .join("\n");

    const summary = `Moo Moo Moo ${t("cart.title")}
----------------
${itemsList}
----------------
${t("cart.total")}: ${total.toFixed(2)} AED
${t("about.contact")}: ${t("about.manager")} (+971 056 496 6886)
${t("about.address")}: ${t("about.fullAddress")}`;

    navigator.clipboard.writeText(summary);
    // You might want to show a toast notification here
  };

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-in-out duration-500"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in-out duration-500"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/50 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-500"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                  <div className="flex h-full flex-col bg-background shadow-xl">
                    {/* Header */}
                    <div className="flex items-center justify-between p-4 border-b border-border">
                      <Dialog.Title className="text-lg font-semibold">
                        {t("cart.title")}{" "}
                        {items.length > 0 && `(${items.length})`}
                      </Dialog.Title>
                      <button
                        type="button"
                        className="rounded-md p-2 hover:bg-accent transition-colors"
                        onClick={onClose}
                      >
                        <XMarkIcon className="h-6 w-6" />
                      </button>
                    </div>

                    {/* Content */}
                    <div className="flex-1 overflow-y-auto p-4">
                      {items.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-full text-center">
                          <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
                            <span className="text-2xl">🛒</span>
                          </div>
                          <p className="text-muted-foreground">
                            {t("cart.empty")}
                          </p>
                        </div>
                      ) : (
                        <div className="space-y-4">
                          {items.map((item) => (
                            <CartItemComponent
                              key={item.id}
                              item={item}
                              locale={locale}
                              onUpdateQuantity={updateQuantity}
                              onRemove={removeItem}
                            />
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Footer */}
                    {items.length > 0 && (
                      <div className="border-t border-border p-4 space-y-4">
                        <div className="flex justify-between text-lg font-semibold">
                          <span>{t("cart.total")}</span>
                          <span>{total.toFixed(2)} AED</span>
                        </div>

                        <div className="space-y-2">
                          <button
                            onClick={generateOrderSummary}
                            className="w-full button-primary"
                          >
                            {t("cart.copyOrder")}
                          </button>

                          <button
                            onClick={clearCart}
                            className="w-full button-secondary"
                          >
                            {t("cart.clearAll")}
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}

interface CartItemComponentProps {
  item: CartItem;
  locale: string;
  onUpdateQuantity: (id: number, quantity: number) => void;
  onRemove: (id: number) => void;
}

function CartItemComponent({
  item,
  locale,
  onUpdateQuantity,
  onRemove,
}: CartItemComponentProps) {
  const t = useTranslations();
  const name = locale === "zh" ? item.nameZh : item.nameEn;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="flex items-center space-x-3 p-3 border border-border rounded-lg"
    >
      <div className="relative w-16 h-16 rounded-md overflow-hidden bg-muted">
        <Image
          src={item.imageThumbnail}
          alt={name}
          fill
          className="object-cover"
          sizes="64px"
        />
      </div>

      <div className="flex-1 min-w-0">
        <h4 className="font-medium text-sm truncate">{name}</h4>
        <p className="text-sm text-muted-foreground">
          {item.price.toFixed(2)} AED
        </p>
      </div>

      <div className="flex items-center space-x-2">
        <button
          onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
          className="p-1 rounded-md hover:bg-accent transition-colors"
          disabled={item.quantity <= 1}
        >
          <MinusIcon className="w-4 h-4" />
        </button>

        <span className="w-8 text-center text-sm font-medium">
          {item.quantity}
        </span>

        <button
          onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
          className="p-1 rounded-md hover:bg-accent transition-colors"
        >
          <PlusIcon className="w-4 h-4" />
        </button>

        <button
          onClick={() => onRemove(item.id)}
          className="p-1 rounded-md hover:bg-accent text-destructive transition-colors ml-2"
        >
          <TrashIcon className="w-4 h-4" />
        </button>
      </div>
    </motion.div>
  );
}
