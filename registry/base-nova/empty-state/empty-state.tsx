import { Button } from "@/components/ui/button";

type EmptyStateProps = {
  title?: string;
  description?: string;
  actionLabel?: string;
};

export function EmptyState({
  title = "No components yet",
  description = "Add your first registry item to start building a reusable component system.",
  actionLabel = "Create component",
}: EmptyStateProps) {
  return (
    <section className="flex w-full max-w-md flex-col items-center gap-4 rounded-lg border bg-card p-8 text-center text-card-foreground">
      <div className="flex size-12 items-center justify-center rounded-lg border bg-muted font-heading text-sm font-medium text-muted-foreground">
        UI
      </div>
      <div className="flex flex-col gap-1">
        <h3 className="font-heading text-lg font-medium">{title}</h3>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
      <Button size="sm">{actionLabel}</Button>
    </section>
  );
}
