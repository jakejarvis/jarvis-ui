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
