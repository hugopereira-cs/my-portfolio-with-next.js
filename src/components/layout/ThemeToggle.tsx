"use client";

import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

interface ThemeToggleProps {
  className?: string;
}

export function ThemeToggle({ className = "" }: ThemeToggleProps) {
  const [mounted, setMounted] = useState(false);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    setMounted(true);
    const root = document.documentElement;
    const isCurrentlyDark = root.classList.contains("dark");
    setIsDark(isCurrentlyDark);
    root.style.colorScheme = isCurrentlyDark ? "dark" : "light";

    const observer = new MutationObserver(() => {
      const darkActive = root.classList.contains("dark");
      setIsDark(darkActive);
      root.style.colorScheme = darkActive ? "dark" : "light";
    });

    observer.observe(root, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

  const toggleTheme = () => {
    const root = document.documentElement;
    const willBeDark = !root.classList.contains("dark");

    if (willBeDark) {
      root.classList.add("dark");
      root.style.colorScheme = "dark";
      localStorage.setItem("theme", "dark");
      setIsDark(true);
    } else {
      root.classList.remove("dark");
      root.style.colorScheme = "light";
      localStorage.setItem("theme", "light");
      setIsDark(false);
    }
  };

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={
        mounted
          ? isDark
            ? "Alternar para tema claro"
            : "Alternar para tema escuro"
          : "Alternar tema"
      }
      title={
        mounted
          ? isDark
            ? "Alternar para tema claro"
            : "Alternar para tema escuro"
          : "Alternar tema"
      }
      className={`inline-flex h-9 w-9 items-center justify-center rounded-lg border border-foreground/10 text-foreground/70 transition-colors hover:border-foreground/25 hover:bg-foreground/5 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/20 cursor-pointer ${className}`}
    >
      {mounted ? (
        isDark ? (
          <Sun className="h-4 w-4" aria-hidden="true" />
        ) : (
          <Moon className="h-4 w-4" aria-hidden="true" />
        )
      ) : (
        <span className="h-4 w-4" aria-hidden="true" />
      )}
    </button>
  );
}
