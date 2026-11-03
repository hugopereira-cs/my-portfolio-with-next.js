import { MapPin, User } from "lucide-react";
import Image from "next/image";
import { Suspense } from "react";
import { AboutTabs } from "@/components/about/AboutTabs";
import { PageContainer } from "@/components/ui/PageContainer";
import { getProfile, getTechnologies } from "@/lib/data";

export const metadata = {
  title: "Sobre",
};

function AboutLoading() {
  return <p role="status">Carregando informações...</p>;
}

async function AboutContent() {
  const profile = getProfile();
  const technologies = getTechnologies({ skills: true });

  return (
    <>
      <div className="flex flex-col sm:flex-row items-center rounded-xl justify-evenly border border-foreground/10 px-5 py-8 text-center text-foreground/75">
        <div className="relative flex -mx-auto h-48 w-48 overflow-hidden rounded-full">
          <Image
            src={profile.photos.about}
            alt="Foto de perfil de Hugo Pereira"
            fill
            sizes="192px"
            className="object-cover"
          />
        </div>
        <div className="flex flex-col items-start sm:w-[60%]">
          <div className="max-w-2xl mb-4 text-foreground/75">
            <ul className="flex flex-col items-start gap-0.5">
              <li className="flex flex-row items-center gap-1">
                <User size={14} />
                {profile.name}, {profile.age} anos
              </li>
              <li className="flex flex-row items-center gap-1">
                <MapPin size={14} />
                {profile.location}
              </li>
            </ul>
          </div>
          <p className="mt-4 text-left sm:mt-0">{profile.about}</p>
        </div>
      </div>
      <section
        aria-label="Competências, idiomas, educação e experiência"
        className="mt-10"
      >
        <AboutTabs
          technologies={technologies}
          languages={profile.languages}
          education={profile.education}
          experience={profile.experience}
        />
      </section>
    </>
  );
}

export default async function AboutPage() {
  return (
    <PageContainer className="py-10 sm:py-14">
      <header className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight mb-2 sm:text-4xl">
          Sobre
        </h1>
        <span className="max-w-2xl text-foreground/70">
          Conheça um pouco mais sobre mim.
        </span>
      </header>
      <Suspense fallback={<AboutLoading />}>
        <AboutContent />
      </Suspense>
    </PageContainer>
  );
}
