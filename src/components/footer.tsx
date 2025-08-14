"use client";

import { useTranslations, useLocale } from "next-intl";
import Link from "next/link";

export function Footer() {
  const t = useTranslations();
  const locale = useLocale();

  return (
    <footer className="bg-muted border-t border-border mt-16">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Restaurant Info */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-lg">牛</span>
              </div>
              <span className="font-bold text-xl">{t("header.title")}</span>
            </div>
            <p className="text-muted-foreground mb-4">
              {t("about.description")}
            </p>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-semibold text-lg mb-4">{t("about.contact")}</h3>
            <div className="space-y-2 text-muted-foreground">
              <div>
                <strong>{t("about.manager")}</strong>
              </div>
              <div>{t("about.phone")}: +971 056 496 6886</div>
              <div className="text-sm">
                {t("about.address")}:<br />
                {t("about.fullAddress")}
              </div>
            </div>
          </div>

          {/* Hours */}
          <div>
            <h3 className="font-semibold text-lg mb-4">{t("about.hours")}</h3>
            <div className="space-y-2 text-muted-foreground">
              <div>{t("about.lunch")}</div>
              <div>{t("about.dinner")}</div>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-border pt-8 mt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-muted-foreground text-sm">
              © 2025 Moo Moo Moo Restaurant. All rights reserved.
            </div>
            <div className="flex items-center space-x-4 mt-4 md:mt-0">
              <Link
                href={`/${locale}`}
                className="text-muted-foreground hover:text-foreground transition-colors text-sm"
              >
                {t("header.menu")}
              </Link>
              <Link
                href={`/${locale}/about`}
                className="text-muted-foreground hover:text-foreground transition-colors text-sm"
              >
                {t("header.about")}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
