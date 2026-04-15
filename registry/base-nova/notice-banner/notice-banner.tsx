import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

type NoticeBannerProps = {
  eyebrow?: string;
  title?: string;
  description?: string;
  actionLabel?: string;
};

export function NoticeBanner({
  eyebrow = "Release note",
  title = "Registry components now support dark mode.",
  description = "Use semantic tokens in every item so installed components adapt to the consumer app.",
  actionLabel = "View changes",
}: NoticeBannerProps) {
  return (
    <section className="flex w-full max-w-2xl flex-col gap-4 rounded-lg border bg-card p-4 text-card-foreground sm:flex-row sm:items-center sm:justify-between">
      <div className="flex min-w-0 flex-col gap-2">
        <Badge variant="outline" className="w-fit">
          {eyebrow}
        </Badge>
        <div className="flex flex-col gap-1">
          <h3 className="font-heading text-base font-medium">{title}</h3>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
      </div>
      <Button variant="outline" size="sm" className="w-fit">
        {actionLabel}
      </Button>
    </section>
  );
}
