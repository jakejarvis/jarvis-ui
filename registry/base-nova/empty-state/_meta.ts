import type { RegistryItemDefinition } from "@/lib/registry/metadata";

export const registryItem = {
  name: "empty-state",
  type: "registry:component",
  title: "Empty State",
  description: "A centered empty state for dashboards, tables, and registry sections.",
  registryDependencies: ["button"],
  files: [
    {
      path: "registry/base-nova/empty-state/empty-state.tsx",
      type: "registry:component",
    },
  ],
} satisfies RegistryItemDefinition;
