import { MetricCard } from "./metric-card";

export const usage = `import { MetricCard } from "@/components/metric-card"

export function DashboardSummary() {
  return (
    <MetricCard
      label="Active users"
      value="12,480"
      change="+8.2%"
      description="Across the last 30 days"
    />
  )
}`;

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
