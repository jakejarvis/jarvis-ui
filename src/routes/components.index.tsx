import { createFileRoute } from "@tanstack/react-router";

import { RegistryItemGrid } from "@/components/docs/registry-item-grid";
import { getRegistryItemsByType } from "@/lib/registry/catalog";

export const Route = createFileRoute("/components/")({ component: ComponentsIndex });

function ComponentsIndex() {
  return (
    <RegistryItemGrid
      eyebrow="Components"
      title="Registry components"
      items={getRegistryItemsByType("registry:component")}
      detailRoute="/components/$name"
    />
  );
}
