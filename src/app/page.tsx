import { HeroSection } from "@/components/ui/HeroSection";
import { PageContainer } from "@/components/ui/PageContainer";
import { getProfile } from "@/lib/data";

export default function Home() {
  const profile = getProfile();
  return (
    <PageContainer className="py-8">
      <HeroSection profile={profile} />
    </PageContainer>
  );
}
