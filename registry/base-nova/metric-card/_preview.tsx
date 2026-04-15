import { MetricCard } from "./metric-card";

export function Preview() {
  return (
    <MetricCard
      label="Active projects"
      value="128"
      change="+18.4%"
      description="Synced from connected workspaces"
    />
  );
}
