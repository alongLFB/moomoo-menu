"use client";

interface SEOStructuredDataProps {
  locale: string;
  page: "home" | "about";
}

export function SEOStructuredData({ locale, page }: SEOStructuredDataProps) {
  const isZh = locale === "zh";
  
  const restaurantData = {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    "name": "Moo Moo Moo Restaurant",
    "alternateName": "牛牛牛餐厅",
    "description": isZh 
      ? "位于阿布扎比Al Danah区的正宗中餐厅，提供传统川菜、粤菜、北京菜。"
      : "Authentic Chinese restaurant in Abu Dhabi Al Danah, serving traditional Sichuan, Cantonese, and Beijing cuisine.",
    "url": "https://menuformoo.alonglfb.com",
    "telephone": "+971-056-496-6886",
    "servesCuisine": ["Chinese", "Sichuan", "Cantonese", "Beijing"],
    "priceRange": "$$",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Electra Abdullah Bin Humaid Al Rumaithi St",
      "addressLocality": "Al Danah",
      "addressRegion": "Zone 1", 
      "addressCountry": "AE",
      "postalCode": "00000"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "24.4851",
      "longitude": "54.3525"
    },
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
        "opens": "11:00",
        "closes": "14:00"
      },
      {
        "@type": "OpeningHoursSpecification", 
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
        "opens": "17:00",
        "closes": "22:00"
      }
    ],
    "menu": `https://menuformoo.alonglfb.com/${locale}`,
    "image": "https://menuformoo.alonglfb.com/images/restaurant-exterior.jpg",
    "logo": "https://menuformoo.alonglfb.com/images/logo.png",
    "sameAs": [
      "https://wa.me/971056496686"
    ],
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "reviewCount": "150"
    }
  };

  const breadcrumbData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": isZh ? "首页" : "Home",
        "item": `https://menuformoo.alonglfb.com/${locale}`
      },
      ...(page === "about" ? [{
        "@type": "ListItem",
        "position": 2,
        "name": isZh ? "关于我们" : "About Us",
        "item": `https://menuformoo.alonglfb.com/${locale}/about`
      }] : [])
    ]
  };

  const localBusinessData = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": "https://menuformoo.alonglfb.com",
    "name": "Moo Moo Moo Restaurant",
    "alternateName": "牛牛牛餐厅",
    "description": isZh 
      ? "阿布扎比Al Danah区的正宗中餐厅"
      : "Authentic Chinese restaurant in Abu Dhabi Al Danah",
    "url": "https://menuformoo.alonglfb.com",
    "telephone": "+971-056-496-6886",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Electra Abdullah Bin Humaid Al Rumaithi St",
      "addressLocality": "Al Danah",
      "addressRegion": "Abu Dhabi",
      "addressCountry": "AE"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "24.4851",
      "longitude": "54.3525"
    },
    "openingHours": [
      "Mo-Su 11:00-14:00",
      "Mo-Su 17:00-22:00"
    ],
    "paymentAccepted": "Cash, Credit Card",
    "currenciesAccepted": "AED"
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(restaurantData),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbData),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(localBusinessData),
        }}
      />
    </>
  );
}
