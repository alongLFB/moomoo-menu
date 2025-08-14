"use client";

import { useState } from "react";
import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import {
  Bars3Icon,
  XMarkIcon,
  ShoppingCartIcon,
  SunIcon,
  MoonIcon,
} from "@heroicons/react/24/outline";
import { useCart } from "@/contexts/cart-context";
import { useTheme } from "@/contexts/theme-context";
import { CartDrawer } from "./cart-drawer";
import { LocaleSwitcher } from "./locale-switcher";

export function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { itemCount } = useCart();
  const { theme, toggleTheme } = useTheme();
  const t = useTranslations();
  const locale = useLocale();

  const navigation = [
    { name: t("header.menu"), href: `/${locale}` },
    { name: t("header.about"), href: `/${locale}/about` },
  ];

  return (
    <>
      <nav className="bg-background border-b border-border sticky top-0 z-40">
        <div className="container">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link href={`/${locale}`} className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-lg">牛</span>
              </div>
              <span className="font-bold text-xl text-foreground">
                {t("header.title")}
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-6">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-muted-foreground hover:text-foreground transition-colors duration-200"
                >
                  {item.name}
                </Link>
              ))}

              <LocaleSwitcher />

              <button
                onClick={toggleTheme}
                className="p-2 rounded-md hover:bg-accent transition-colors duration-200"
                aria-label={t("header.theme")}
              >
                {theme === "light" ? (
                  <MoonIcon className="w-5 h-5" />
                ) : (
                  <SunIcon className="w-5 h-5" />
                )}
              </button>

              <button
                onClick={() => setIsCartOpen(true)}
                className="relative p-2 rounded-md hover:bg-accent transition-colors duration-200"
                aria-label={t("header.cart")}
              >
                <ShoppingCartIcon className="w-5 h-5" />
                {itemCount > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center"
                  >
                    {itemCount}
                  </motion.span>
                )}
              </button>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center space-x-2">
              <button
                onClick={() => setIsCartOpen(true)}
                className="relative p-2 rounded-md hover:bg-accent transition-colors duration-200"
                aria-label={t("header.cart")}
              >
                <ShoppingCartIcon className="w-5 h-5" />
                {itemCount > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center"
                  >
                    {itemCount}
                  </motion.span>
                )}
              </button>

              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 rounded-md hover:bg-accent transition-colors duration-200"
                aria-label="Menu"
              >
                {isMenuOpen ? (
                  <XMarkIcon className="w-6 h-6" />
                ) : (
                  <Bars3Icon className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          <AnimatePresence>
            {isMenuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="md:hidden border-t border-border"
              >
                <div className="py-4 space-y-4">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="block text-muted-foreground hover:text-foreground transition-colors duration-200"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  ))}

                  <div className="flex items-center justify-between">
                    <LocaleSwitcher />
                    <button
                      onClick={toggleTheme}
                      className="p-2 rounded-md hover:bg-accent transition-colors duration-200"
                      aria-label={t("header.theme")}
                    >
                      {theme === "light" ? (
                        <MoonIcon className="w-5 h-5" />
                      ) : (
                        <SunIcon className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </nav>

      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
}
