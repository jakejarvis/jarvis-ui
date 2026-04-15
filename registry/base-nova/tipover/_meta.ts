import type { RegistryItemDefinition } from "@/lib/registry/metadata";

export const registryItem = {
  name: "tipover",
  type: "registry:component",
  title: "Tipover",
  description: "A touch-friendly tooltip that falls back to a popover on coarse pointers.",
  dependencies: ["@base-ui/react"],
  files: [
    {
      path: "registry/base-nova/tipover/tipover.tsx",
      type: "registry:component",
    },
    {
      path: "registry/base-nova/tipover/use-pointer-capability.ts",
      type: "registry:hook",
    },
  ],
} satisfies RegistryItemDefinition;
