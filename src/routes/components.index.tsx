import { createFileRoute } from "@tanstack/react-router";

import { DocsLayout } from "@/components/docs/docs-layout";
import { RegistryItemList } from "@/components/docs/registry-item-grid";
import { componentRegistryTypes, getRegistryItemsByTypes } from "@/lib/registry/catalog";

export const Route = createFileRoute("/components/")({ component: ComponentsIndex });

function ComponentsIndex() {
  return (
    <DocsLayout section="components">
      <RegistryItemList
        title="Components"
        description="Reusable UI components you can install into your project."
        items={getRegistryItemsByTypes(componentRegistryTypes)}
        detailRoute="/components/$name"
      />
    </DocsLayout>
  );
}
