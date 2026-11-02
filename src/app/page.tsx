import { connection } from "next/server";
import { HeroSection } from "@/components/ui/HeroSection";
import { PageContainer } from "@/components/ui/PageContainer";
import { getProfile } from "@/lib/data";

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
