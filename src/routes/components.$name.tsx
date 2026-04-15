import { createFileRoute } from "@tanstack/react-router";

import { RegistryItemDoc, RegistryItemNotFound } from "@/components/docs/component-doc";
import { DocsLayout } from "@/components/docs/docs-layout";
import { getRegistryItemDetail } from "@/lib/registry/detail.functions";

export const Route = createFileRoute("/components/$name")({
  loader: ({ params }) =>
    getRegistryItemDetail({
      data: {
        name: params.name,
        expectedType: "registry:component",
      },
    }),
  component: ComponentRoute,
});

function ComponentRoute() {
  const { item } = Route.useLoaderData();

  return (
    <DocsLayout section="components">
      {!item ? (
        <RegistryItemNotFound />
      ) : (
        <RegistryItemDoc item={item} section="Components" sectionPath="/components" />
      )}
    </DocsLayout>
  );
}
