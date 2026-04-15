import { createFileRoute } from "@tanstack/react-router";

import { RegistryItemDoc, RegistryItemNotFound } from "@/components/docs/component-doc";
import { DocsLayout } from "@/components/docs/docs-layout";
import { getRegistryItem } from "@/lib/registry/catalog";

export const Route = createFileRoute("/components/$name")({
  component: ComponentRoute,
});

function ComponentRoute() {
  const { name } = Route.useParams();
  const item = getRegistryItem(name);

  return (
    <DocsLayout section="components">
      {!item || item.type !== "registry:component" ? (
        <RegistryItemNotFound />
      ) : (
        <RegistryItemDoc item={item} section="Components" sectionPath="/components" />
      )}
    </DocsLayout>
  );
}
