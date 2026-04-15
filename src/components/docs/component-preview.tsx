import { EmptyState } from "../../../registry/base-nova/empty-state/empty-state";
import { MetricCard } from "../../../registry/base-nova/metric-card/metric-card";
import { NoticeBanner } from "../../../registry/base-nova/notice-banner/notice-banner";

type ComponentPreviewProps = {
  name: string;
};

export function ComponentPreview({ name }: ComponentPreviewProps) {
  return (
    <div className="flex min-h-72 items-center justify-center rounded-lg border bg-background p-6">
      {name === "metric-card" ? (
        <MetricCard
          label="Active projects"
          value="128"
          change="+18.4%"
          description="Synced from connected workspaces"
        />
      ) : null}
      {name === "notice-banner" ? (
        <NoticeBanner
          eyebrow="Registry"
          title="Installable blocks should be boring to adopt."
          description="Every component here is designed to copy cleanly into another shadcn project."
          actionLabel="Install"
        />
      ) : null}
      {name === "empty-state" ? (
        <EmptyState
          title="Nothing published"
          description="Draft a component, add it to registry.json, then run the registry build."
          actionLabel="Add draft"
        />
      ) : null}
    </div>
  );
}
