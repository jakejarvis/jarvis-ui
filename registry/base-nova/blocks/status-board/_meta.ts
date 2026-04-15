import type { RegistryItemDefinition } from "@/lib/registry/metadata";

export const registryItem = {
  name: "status-board",
  type: "registry:block",
  title: "Status Board",
  description: "A reusable operations block with summary counts and prioritized status rows.",
  registryDependencies: ["badge", "button", "card", "separator"],
  files: [
    {
      path: "registry/base-nova/blocks/status-board/components/status-board.tsx",
      type: "registry:component",
    },
    {
      path: "registry/base-nova/blocks/status-board/lib/status-board-data.ts",
      type: "registry:lib",
    },
  ],
} satisfies RegistryItemDefinition;
