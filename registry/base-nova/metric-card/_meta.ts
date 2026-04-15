import type { RegistryItemDefinition } from "@/lib/registry/metadata";

export const registryItem = {
  name: "metric-card",
  type: "registry:component",
  title: "Metric Card",
  description: "A compact metric card with a trend badge and supporting copy.",
  registryDependencies: ["card", "badge"],
  files: [
    {
      path: "registry/base-nova/metric-card/metric-card.tsx",
      type: "registry:component",
    },
  ],
} satisfies RegistryItemDefinition;

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
