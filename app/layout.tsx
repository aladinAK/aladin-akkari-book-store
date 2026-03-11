import type { Metadata } from "next";
import "./globals.css";

const SITE_URL = "https://chroniques-de-jez.fr"; // à mettre à jour avec le vrai domaine

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),

  title: {
    default: "Les Chroniques de Jez — Aladin Akkari",
    template: "%s | Les Chroniques de Jez",
  },
  description:
    "Une épopée de Dark Fantasy par Aladin Akkari. Guerre, secrets et destinée brisée à travers quatre tomes implacables. Découvrez la saga Les Chroniques de Jez.",
  keywords: [
    "Les Chroniques de Jez",
    "Aladin Akkari",
    "dark fantasy français",
    "roman fantastique",
    "saga fantasy",
    "épée légendaire",
    "roman dark fantasy",
    "livre fantasy",
    "Jez",
    "Aros Lethra",
  ],
  authors: [{ name: "Aladin Akkari", url: SITE_URL }],
  creator: "Aladin Akkari",
  publisher: "Aladin Akkari",

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  openGraph: {
    title: "Les Chroniques de Jez — Aladin Akkari",
    description:
      "Une épopée de Dark Fantasy par Aladin Akkari. Guerre, secrets et destinée brisée à travers quatre tomes implacables.",
    url: SITE_URL,
    siteName: "Les Chroniques de Jez",
    locale: "fr_FR",
    type: "website",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Les Chroniques de Jez — Aladin Akkari",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Les Chroniques de Jez — Aladin Akkari",
    description:
      "Une épopée de Dark Fantasy par Aladin Akkari. Guerre, secrets et destinée brisée à travers quatre tomes.",
    images: ["/og-image.jpg"],
  },

  alternates: {
    canonical: SITE_URL,
    languages: {
      "fr-FR": SITE_URL,
    },
  },

  category: "book",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: "Les Chroniques de Jez",
      description:
        "Site officiel de la saga dark fantasy Les Chroniques de Jez par Aladin Akkari.",
      inLanguage: "fr-FR",
    },
    {
      "@type": "Person",
      "@id": `${SITE_URL}/#author`,
      name: "Aladin Akkari",
      url: SITE_URL,
      sameAs: ["https://www.amazon.ca/s?k=chroniques+de+jez+akkari"],
    },
    {
      "@type": "BookSeries",
      "@id": `${SITE_URL}/#bookseries`,
      name: "Les Chroniques de Jez",
      url: SITE_URL,
      author: { "@id": `${SITE_URL}/#author` },
      numberOfBooks: 4,
      genre: ["Dark Fantasy", "Fantasy", "Roman"],
      inLanguage: "fr-FR",
      description:
        "Une épopée de guerre, de secrets et de destinée brisée en quatre tomes.",
    },
    {
      "@type": "Book",
      name: "L'Épée de la Dernière Chance",
      author: { "@id": `${SITE_URL}/#author` },
      isPartOf: { "@id": `${SITE_URL}/#bookseries` },
      bookEdition: "Tome I",
      inLanguage: "fr-FR",
      genre: "Dark Fantasy",
      url: "https://www.amazon.ca/s?k=chroniques+de+jez+akkari+tome+1",
    },
    {
      "@type": "Book",
      name: "L'Épée des Trois Serments",
      author: { "@id": `${SITE_URL}/#author` },
      isPartOf: { "@id": `${SITE_URL}/#bookseries` },
      bookEdition: "Tome II",
      inLanguage: "fr-FR",
      genre: "Dark Fantasy",
      url: "https://www.amazon.ca/s?k=chroniques+de+jez+akkari+tome+2",
    },
    {
      "@type": "Book",
      name: "L'Épée des Mensonges Tissés",
      author: { "@id": `${SITE_URL}/#author` },
      isPartOf: { "@id": `${SITE_URL}/#bookseries` },
      bookEdition: "Tome III",
      inLanguage: "fr-FR",
      genre: "Dark Fantasy",
      url: "https://www.amazon.ca/s?k=chroniques+de+jez+akkari+tome+3",
    },
    {
      "@type": "Book",
      name: "L'Épée des Héritages Brisés",
      author: { "@id": `${SITE_URL}/#author` },
      isPartOf: { "@id": `${SITE_URL}/#bookseries` },
      bookEdition: "Tome IV",
      inLanguage: "fr-FR",
      genre: "Dark Fantasy",
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="noise">{children}</body>
    </html>
  );
}
