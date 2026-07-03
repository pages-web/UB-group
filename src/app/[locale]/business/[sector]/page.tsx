import SectorProjectsClient from "./SectorProjectsClient";

const sectorSlugs = [
  "barilgyn-tusluud",
  "sankhuu-khurungu-oruulalt",
  "teever-logistik",
  "laifstail-uilchilgee",
  "menejment",
];

export function generateStaticParams() {
  const locales = ["mn", "en"];

  return locales.flatMap((locale) =>
    sectorSlugs.map((sector) => ({
      locale,
      sector,
    })),
  );
}

export default async function SectorPage({
  params,
}: {
  params: Promise<{ locale: string; sector: string }>;
}) {
  const { locale, sector } = await params;

  return <SectorProjectsClient sectorSlug={sector} locale={locale} />;
}
