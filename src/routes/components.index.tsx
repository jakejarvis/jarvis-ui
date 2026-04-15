import { createFileRoute } from "@tanstack/react-router";

import { DocsLayout } from "@/components/docs/docs-layout";
import { RegistryItemList } from "@/components/docs/registry-item-grid";
import { getRegistryItemsByType } from "@/lib/registry/catalog";

export const Route = createFileRoute("/components/")({ component: ComponentsIndex });

function ComponentsIndex() {
  return (
    <DocsLayout section="components">
      <RegistryItemList
        title="Components"
        description="Reusable UI components you can install into your project."
        items={getRegistryItemsByType("registry:component")}
        detailRoute="/components/$name"
      />
    </DocsLayout>
  );
}
