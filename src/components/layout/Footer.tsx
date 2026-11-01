import { getProfile } from "@/lib/data";

export function Footer() {
  const { name, contacts } = getProfile();
  const footerContacts = contacts.filter(
    (contact) => contact.type === "linkedin" || contact.type === "github"
  );

  return (
    <footer className="mt-auto w-full border-t border-foreground/10">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-4 px-6 py-6 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-foreground/60">
          © 2026 {name}
        </p>

        <nav aria-label="Links de contato no rodapé">
          <ul className="flex flex-wrap gap-x-5 gap-y-2">
            {footerContacts.map((contact) => {
              const opensNewTab = contact.url.startsWith("https://");

              return (
                <li key={contact.type}>
                  <a
                    href={contact.url}
                    target={opensNewTab ? "_blank" : undefined}
                    rel={opensNewTab ? "noreferrer" : undefined}
                    className="text-sm text-foreground/60 underline-offset-4 transition-colors hover:text-foreground hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/50"
                  >
                    {contact.name}
                    {opensNewTab && <span className="sr-only"> (abre em nova aba)</span>}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </footer>
  );
}
