import { createFileRoute } from "@tanstack/react-router";

import { RegistryItemGrid } from "@/components/docs/registry-item-grid";
import { getRegistryItemsByType } from "@/lib/registry/catalog";

export const Route = createFileRoute("/blocks/")({ component: BlocksIndex });

function BlocksIndex() {
  return (
    <RegistryItemGrid
      eyebrow="Blocks"
      title="Registry blocks"
      items={getRegistryItemsByType("registry:block")}
      detailRoute="/blocks/$name"
    />
  );
}
