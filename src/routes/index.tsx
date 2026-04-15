import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({ component: App });

function App() {
  return (
    <div className="flex w-full max-w-3xl flex-col gap-8">
      <section className="flex flex-col gap-6">
        <div className="flex flex-col gap-3">
          <h1 className="font-heading text-4xl font-semibold text-balance">Jarvis UI</h1>
          <p className="max-w-2xl text-muted-foreground">
            An intentionally random collection of components likely only useful to one person (me).
          </p>
        </div>
      </section>
    </div>
  );
}
