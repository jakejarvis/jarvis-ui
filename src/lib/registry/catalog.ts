import registryIndex from "../../../registry.json";
import emptyStateSource from "../../../registry/base-nova/empty-state/empty-state.tsx?raw";
import metricCardSource from "../../../registry/base-nova/metric-card/metric-card.tsx?raw";
import noticeBannerSource from "../../../registry/base-nova/notice-banner/notice-banner.tsx?raw";

export const siteConfig = {
  name: "Jarvis UI",
  registryName: registryIndex.name,
  namespace: "@jarvis-ui",
  homepage: registryIndex.homepage,
  registryPath: "/r",
  displayBaseUrl: "https://your-domain.com",
  description: "A minimal shadcn-compatible registry for reusable product components.",
} as const;

const sourceByName = {
  "metric-card": metricCardSource,
  "notice-banner": noticeBannerSource,
  "empty-state": emptyStateSource,
} satisfies Record<string, string>;

const usageByName = {
  "metric-card": `import { MetricCard } from "@/components/metric-card"

export function DashboardSummary() {
  return (
    <MetricCard
      label="Active users"
      value="12,480"
      change="+8.2%"
      description="Across the last 30 days"
    />
  )
}`,
  "notice-banner": `import { NoticeBanner } from "@/components/notice-banner"

export function ReleaseNotice() {
  return (
    <NoticeBanner
      eyebrow="Beta"
      title="New reporting blocks are ready."
      description="Install the registry item and adapt the copy to your product."
      actionLabel="Read docs"
    />
  )
}`,
  "empty-state": `import { EmptyState } from "@/components/empty-state"

export function ComponentsTable() {
  return (
    <EmptyState
      title="No results"
      description="Try another filter or add a component to the registry."
      actionLabel="Add item"
    />
  )
}`,
} satisfies Record<string, string>;

type RegistryItem = (typeof registryIndex.items)[number];

export type RegistryComponent = RegistryItem & {
  source: string;
  usage: string;
  installCommand: string;
  namespaceCommand: string;
};

export const registryItems = registryIndex.items.map((item) => ({
  ...item,
  source: sourceByName[item.name as keyof typeof sourceByName],
  usage: usageByName[item.name as keyof typeof usageByName],
  installCommand: `bunx --bun shadcn@latest add ${siteConfig.displayBaseUrl}${siteConfig.registryPath}/${item.name}.json`,
  namespaceCommand: `bunx --bun shadcn@latest add ${siteConfig.namespace}/${item.name}`,
})) satisfies RegistryComponent[];

export function getRegistryItem(name: string) {
  return registryItems.find((item) => item.name === name);
}

export function getRegistryJsonItemNames() {
  return registryIndex.items.map((item) => item.name);
}
