"use client";

import { usePathname, useRouter } from "next/navigation";
import { useLocale } from "next-intl";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { Menu, Transition } from "@headlessui/react";
import { Fragment } from "react";

const locales = [
  { code: "zh", name: "中文", flag: "🇨🇳" },
  { code: "en", name: "English", flag: "🇬🇧" },
];

export function LocaleSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  const currentLocale = locales.find((l) => l.code === locale);

  const switchLocale = (newLocale: string) => {
    const segments = pathname.split("/");
    segments[1] = newLocale;
    const newPath = segments.join("/");
    router.push(newPath);
  };

  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="inline-flex w-full justify-center items-center space-x-2 rounded-md px-3 py-2 text-sm font-medium hover:bg-accent transition-colors">
          <span>{currentLocale?.flag}</span>
          <span>{currentLocale?.name}</span>
          <ChevronDownIcon className="ml-2 -mr-1 h-4 w-4" aria-hidden="true" />
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 mt-2 w-32 origin-top-right rounded-md bg-popover shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
          <div className="py-1">
            {locales.map((loc) => (
              <Menu.Item key={loc.code}>
                {({ active }) => (
                  <button
                    onClick={() => switchLocale(loc.code)}
                    className={`${active ? "bg-accent" : ""} ${
                      locale === loc.code ? "font-semibold" : ""
                    } group flex w-full items-center space-x-2 px-4 py-2 text-sm transition-colors`}
                  >
                    <span>{loc.flag}</span>
                    <span>{loc.name}</span>
                  </button>
                )}
              </Menu.Item>
            ))}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
