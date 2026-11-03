import { MapPin } from "lucide-react";
import Image from "next/image";
import type { Profile } from "@/types";

interface HeroSectionProps {
  profile: Pick<
    Profile,
    "name" | "role" | "slogan" | "location" | "availability" | "photos"
  >;
}

export function HeroSection({ profile }: HeroSectionProps) {
  const { name, role, slogan, location, availability } = profile;

  return (
    <section aria-labelledby="hero-heading" className="w-full pb-8 sm:pb-12">
      {/* Capa / Banner Widescreen */}
      <div className="relative aspect-video w-full overflow-hidden mb-3 rounded-t-2xl border border-foreground/10 bg-muted shadow-sm sm:mb-6">
        <Image
          src="/images/banner.png"
          alt={`Banner ilustrado de ${name}`}
          fill
          priority
          sizes="(max-width: 768px) 100vw, 768px"
          className="object-cover object-center"
        />
      </div>

      {/* Linha do Avatar + Badge de Disponibilidade */}

      {/* Conteúdo textual */}
      <div className="flex flex-col sm:flex-row justify-between">
        <div className="flex flex-col gap-3 px-2 sm:px-4">
          {/* Nome + Cargo */}
          <div className="flex flex-col gap-1">
            <h1
              id="hero-heading"
              className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl"
            >
              {name}
            </h1>
            <p className="font-mono text-base text-foreground/60 sm:text-lg">
              {role}
            </p>
          </div>
          {/* Slogan */}
          <p className="max-w-xl text-base leading-relaxed text-foreground/75">
            {slogan}
          </p>
          {/* Localização */}
          <p className="inline-flex items-center gap-1.5 text-sm text-foreground/50">
            <MapPin
              aria-hidden="true"
              className="h-4 w-4 shrink-0 text-foreground/40"
            />
            {location}
          </p>
        </div>
        <div className="flex mt-4 sm:mt-0 flex-wrap items-start justify-between gap-3 px-2 sm:px-4">
          {/* Badge de disponibilidade */}
          <span className="inline-flex items-center rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-600 dark:text-emerald-400">
            <span
              aria-hidden="true"
              className="mr-2 h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500"
            />
            {availability}
          </span>
        </div>
      </div>
    </section>
  );
}
