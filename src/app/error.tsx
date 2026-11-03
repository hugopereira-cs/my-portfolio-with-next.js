"use client";

export default function GlobalError({ reset }: { reset: () => void }) {
  return (
    <main>
      <h1>Algo deu errado</h1>
      <button type="button" onClick={reset}>
        Tentar novamente
      </button>
    </main>
  );
}
