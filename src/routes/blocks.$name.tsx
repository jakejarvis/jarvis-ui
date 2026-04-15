import { createFileRoute } from "@tanstack/react-router";

import { RegistryItemDoc, RegistryItemNotFound } from "@/components/docs/component-doc";
import { getRegistryItem } from "@/lib/registry/catalog";

export const Route = createFileRoute("/blocks/$name")({
  component: BlockRoute,
});

function BlockRoute() {
  const { name } = Route.useParams();
  const item = getRegistryItem(name);

  if (!item || item.type !== "registry:block") {
    return <RegistryItemNotFound name={name} />;
  }

  return <RegistryItemDoc item={item} />;
}
