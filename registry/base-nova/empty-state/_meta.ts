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

export const usage = `import { EmptyState } from "@/components/empty-state"

export function ComponentsTable() {
  return (
    <EmptyState
      title="No results"
      description="Try another filter or add a component to the registry."
      actionLabel="Add item"
    />
  )
}`;
