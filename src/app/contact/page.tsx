import { ArrowUpRight, ExternalLink, Mail } from "lucide-react";
import { LuLinkedin } from "react-icons/lu";
import { SiGithub } from "react-icons/si";
import { PageContainer } from "@/components/ui/PageContainer";
import { getProfile } from "@/lib/data";

export const metadata = {
  title: "Contato",
};

type ContactIconProps = {
  type: string;
  className: string;
};

function ContactIcon({ type, className }: ContactIconProps) {
  switch (type) {
    case "email":
      return <Mail aria-hidden="true" className={className} />;
    case "github":
      return <SiGithub aria-hidden="true" className={className} />;
    case "linkedin":
      return <LuLinkedin aria-hidden="true" className={className} />;
    default:
      return <ExternalLink aria-hidden="true" className={className} />;
  }
}

export default function ContactPage() {
  const { contacts } = getProfile();

  return (
    <PageContainer className="py-10 sm:py-14">
      <header className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Contato</h1>
        <p className="mt-3 max-w-2xl text-foreground/70">
          Estou aberto a conversar sobre oportunidades, projetos e tecnologia. Escolha o canal que
          preferir para entrar em contato.
        </p>
      </header>

      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {contacts.map((contact) => {
          const opensNewTab = contact.url.startsWith("https://");

          return (
            <li key={contact.type}>
              <a
                href={contact.url}
                target={opensNewTab ? "_blank" : undefined}
                rel={opensNewTab ? "noreferrer" : undefined}
                className="group flex h-full min-h-36 flex-col justify-between rounded-xl border border-foreground/10 bg-foreground/3 p-5 transition-colors hover:border-foreground/20 hover:bg-foreground/6 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/50"
              >
                <div className="flex items-start justify-between">
                  <span className="inline-flex rounded-lg border border-foreground/10 bg-background p-2.5 text-foreground/70 transition-colors group-hover:text-foreground">
                    <ContactIcon type={contact.type} className="h-5 w-5" />
                  </span>
                  {opensNewTab && (
                    <ArrowUpRight
                      aria-hidden="true"
                      className="h-4 w-4 text-foreground/40 transition-colors group-hover:text-foreground"
                    />
                  )}
                </div>
                <span className="mt-5">
                  <span className="block font-semibold text-foreground">{contact.name}</span>
                  <span className="mt-1 block break-all text-sm text-foreground/60">
                    {contact.handle}
                  </span>
                </span>
              </a>
            </li>
          );
        })}
      </ul>
    </PageContainer>
  );
}
