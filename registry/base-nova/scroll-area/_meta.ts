import type { RegistryItemDefinition } from "@/lib/registry/metadata";

export const registryItem = {
  name: "scroll-area",
  type: "registry:component",
  title: "Scroll Area",
  description: "A scroll container with overlay scrollbars and automatic edge fades.",
  dependencies: ["@base-ui/react"],
  files: [
    {
      path: "registry/base-nova/scroll-area/scroll-area.tsx",
      type: "registry:component",
    },
  ],
} satisfies RegistryItemDefinition;
