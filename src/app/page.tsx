// =============================================================================
// Home page (/) — Server Component
// Ref: spec 00 § 4.1 (Home / Hero)
// Dados carregados dos arquivos locais em src/data
// =============================================================================

import { HeroSection } from "@/components/ui/HeroSection";
import { PageContainer } from "@/components/ui/PageContainer";
import { getProfile } from "@/lib/data";
import { connection } from "next/server";

export default async function Home() {
  await connection();
  await new Promise((resolve) => setTimeout(resolve, 5000));

  const profile = getProfile();
  return (
    <PageContainer className="py-8">
      <HeroSection profile={profile} />
    </PageContainer>
  );
}
