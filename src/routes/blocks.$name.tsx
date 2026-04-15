import { createFileRoute } from "@tanstack/react-router";

import { RegistryItemDoc, RegistryItemNotFound } from "@/components/docs/component-doc";
import { DocsLayout } from "@/components/docs/docs-layout";
import { getRegistryItemDetail } from "@/lib/registry/detail.functions";

export const Route = createFileRoute("/blocks/$name")({
  loader: ({ params }) =>
    getRegistryItemDetail({
      data: {
        name: params.name,
        expectedType: "registry:block",
      },
    }),
  component: BlockRoute,
});

function BlockRoute() {
  const { item } = Route.useLoaderData();

  return (
    <DocsLayout section="blocks">
      {!item ? (
        <RegistryItemNotFound />
      ) : (
        <RegistryItemDoc item={item} section="Blocks" sectionPath="/blocks" />
      )}
    </DocsLayout>
  );
}
