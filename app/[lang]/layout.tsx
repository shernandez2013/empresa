import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { hasLocale } from "../dictionaries";

const metadata_es: Metadata = {
  metadataBase: new URL("https://orbexasystems.com"),
  title: "Orbexa Systems | Desarrollo de Software a Medida en México",
  description:
    "Consultora de software en México. Desarrollamos aplicaciones web, automatizamos procesos e integramos sistemas. Fundada por ingenieros con 15+ años de experiencia en banca, seguros y telecom.",
  keywords: [
    "desarrollo de software México",
    "desarrollo de software a medida",
    "desarrollo de aplicaciones web",
    "automatización de negocios",
    "soluciones en la nube",
    "consultoría de software",
    "landing pages profesionales",
    "integraciones API",
    "inteligencia artificial para negocios",
    "Orbexa Systems",
  ],
  openGraph: {
    type: "website",
    locale: "es_MX",
    url: "https://orbexasystems.com/es",
    siteName: "Orbexa Systems",
    title: "Orbexa Systems | Desarrollo de Software a Medida en México",
    description:
      "Consultora de software fundada por ingenieros con 15+ años de experiencia. Aplicaciones web, automatización de procesos, integraciones y cloud.",
  },
};

const metadata_en: Metadata = {
  metadataBase: new URL("https://orbexasystems.com"),
  title: "Orbexa Systems | Custom Software Development in Mexico",
  description:
    "Software consultancy in Mexico. We build web applications, automate processes and integrate systems. Founded by engineers with 15+ years of experience in banking, insurance and telecom.",
  keywords: [
    "custom software development Mexico",
    "web application development",
    "business process automation",
    "cloud solutions",
    "software consulting",
    "professional landing pages",
    "API integrations",
    "artificial intelligence for business",
    "Orbexa Systems",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://orbexasystems.com/en",
    siteName: "Orbexa Systems",
    title: "Orbexa Systems | Custom Software Development in Mexico",
    description:
      "Software consultancy founded by engineers with 15+ years of experience. Web applications, process automation, integrations and cloud.",
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  return lang === "en" ? metadata_en : metadata_es;
}

export async function generateStaticParams() {
  return [{ lang: "es" }, { lang: "en" }];
}

export default async function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  return <>{children}</>;
}
