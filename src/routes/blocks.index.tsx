import { createFileRoute } from "@tanstack/react-router";

import { DocsLayout } from "@/components/docs/docs-layout";
import { RegistryItemList } from "@/components/docs/registry-item-grid";
import { getRegistryItemsByType } from "@/lib/registry/catalog";

export const Route = createFileRoute("/blocks/")({ component: BlocksIndex });

function BlocksIndex() {
  return (
    <DocsLayout section="blocks">
      <RegistryItemList
        title="Blocks"
        description="Larger composed UI patterns you can install into your project."
        items={getRegistryItemsByType("registry:block")}
        detailRoute="/blocks/$name"
      />
    </DocsLayout>
  );
}
