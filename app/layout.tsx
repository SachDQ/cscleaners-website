import type { Metadata } from "next";
import { Inter, Syne } from "next/font/google";
import Script from "next/script";
import AdPixels from "@/components/AdPixels";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://cscleaners.com.au"),
  title: {
    default: "Central Sea Cleaning | Melbourne's Trusted Cleaning Service",
    template: "%s | Central Sea Cleaning",
  },
  description:
    "Melbourne's friendliest cleaning company. Residential, end-of-lease, commercial & specialist cleaning. Eco-friendly products, police-checked staff, bond-back guarantee. Get an instant quote today.",
  keywords: [
    "cleaning Melbourne",
    "bond clean Melbourne",
    "end of lease cleaning Melbourne",
    "house cleaning Melbourne",
    "commercial cleaning Melbourne",
    "office cleaning Melbourne",
    "builders clean Melbourne",
    "carpet cleaning Melbourne",
    "cscleaners",
    "central sea cleaning",
  ],
  openGraph: {
    type: "website",
    locale: "en_AU",
    url: "https://cscleaners.com.au",
    siteName: "Central Sea Cleaning",
    title: "Central Sea Cleaning | Melbourne's Trusted Cleaning Service",
    description:
      "Eco-friendly, police-checked, guaranteed. Residential, bond & commercial cleaning across all Melbourne suburbs.",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Central Sea Cleaning Melbourne" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Central Sea Cleaning | Melbourne's Trusted Cleaning Service",
    description: "Eco-friendly, police-checked, guaranteed. Residential, bond & commercial cleaning across all Melbourne suburbs.",
    images: ["/og-image.png"],
  },
  alternates: { canonical: "https://cscleaners.com.au" },
  robots: { index: true, follow: true },
  verification: { google: "onJvqUg6acim4u44dvyaLqIo01RoEB-fqN-WDFqYeag" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": "https://cscleaners.com.au/#business",
  name: "Central Sea Cleaning",
  url: "https://cscleaners.com.au",
  logo: "https://cscleaners.com.au/logo.png",
  image: "https://cscleaners.com.au/og-image.png",
  description: "Melbourne's friendliest cleaning company. Eco-friendly products, police-checked staff, bond-back guarantee.",
  telephone: "+61404378911",
  email: "info@cscleaners.com.au",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Melbourne",
    addressRegion: "VIC",
    addressCountry: "AU",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: -37.8136,
    longitude: 144.9631,
  },
  areaServed: {
    "@type": "State",
    name: "Victoria",
  },
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"],
    opens: "07:00",
    closes: "19:00",
  },
  priceRange: "$$",
  currenciesAccepted: "AUD",
  paymentAccepted: "Cash, Credit Card, Bank Transfer",
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Cleaning Services",
    itemListElement: [
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Residential Cleaning" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "End-of-Lease Cleaning" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Commercial Cleaning" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Deep Cleaning" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Builders Clean" } },
    ],
  },
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.9",
    reviewCount: "127",
    bestRating: "5",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-AU" className={`${inter.variable} ${syne.variable} h-full`}>
      <head>
        <link rel="icon" href="/favicon-32.png" type="image/png" sizes="32x32" />
        <link rel="icon" href="/favicon-48.png" type="image/png" sizes="48x48" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <meta name="theme-color" content="#023E8A" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className="min-h-full flex flex-col antialiased"
        style={{ fontFamily: "var(--font-inter), system-ui, sans-serif" }}
      >
        {children}
        <AdPixels />
        {/* GA4 — replace G-XXXXXXXXXX with your Measurement ID */}
        {process.env.NEXT_PUBLIC_GA_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
              strategy="afterInteractive"
            />
            <Script id="ga4-init" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}');
              `}
            </Script>
          </>
        )}
      </body>
    </html>
  );
}
