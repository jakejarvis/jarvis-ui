import { createFileRoute } from "@tanstack/react-router";

import { ComponentDoc, ComponentNotFound } from "@/components/docs/component-doc";
import { getRegistryItem } from "@/lib/registry/catalog";

export const Route = createFileRoute("/components/$name")({
  component: ComponentRoute,
});

function ComponentRoute() {
  const { name } = Route.useParams();
  const item = getRegistryItem(name);

  if (!item) {
    return <ComponentNotFound name={name} />;
  }

  return <ComponentDoc item={item} />;
}
