import { createFileRoute } from "@tanstack/react-router";

import { RegistryItemDoc, RegistryItemNotFound } from "@/components/docs/component-doc";
import { DocsLayout } from "@/components/docs/docs-layout";
import { getRegistryItem } from "@/lib/registry/catalog";

export const Route = createFileRoute("/blocks/$name")({
  component: BlockRoute,
});

function BlockRoute() {
  const { name } = Route.useParams();
  const item = getRegistryItem(name);

  return (
    <DocsLayout section="blocks">
      {!item || item.type !== "registry:block" ? (
        <RegistryItemNotFound name={name} />
      ) : (
        <RegistryItemDoc item={item} section="Blocks" sectionPath="/blocks" />
      )}
    </DocsLayout>
  );
}
