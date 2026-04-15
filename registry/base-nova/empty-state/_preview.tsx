import { EmptyState } from "./empty-state";

export function Preview() {
  return (
    <EmptyState
      title="Nothing published"
      description="Draft a component, add it to registry.json, then run the registry build."
      actionLabel="Add draft"
    />
  );
}
