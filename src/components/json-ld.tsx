type JsonLdData = Record<string, unknown>;

export function JsonLd({ data }: { data: JsonLdData }) {
  return (
    <script
      type="application/ld+json"
      // biome-ignore lint/security/noDangerouslySetInnerHtml: Safe - serializing our own static data for structured data
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "billui",
  url: "https://billui.com",
  description: "Beautiful billing UI components for your Next.js app.",
  author: {
    "@type": "Person",
    name: "0xDecker",
    url: "https://x.com/0xDecker",
  },
};

export const softwareJsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "billui",
  applicationCategory: "DeveloperApplication",
  operatingSystem: "Any",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
  description: "Beautiful billing UI components for your Next.js app.",
  url: "https://billui.com",
  author: {
    "@type": "Person",
    name: "0xDecker",
  },
};
