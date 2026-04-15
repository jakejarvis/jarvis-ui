import { EmptyState } from "./empty-state";

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

export function Preview() {
  return (
    <EmptyState
      title="Nothing published"
      description="Draft a component, add it to registry.json, then run the registry build."
      actionLabel="Add draft"
    />
  );
}
