import type { RegistryItemDefinition } from "@/lib/registry/metadata";

export const registryItem = {
  name: "notice-banner",
  type: "registry:component",
  title: "Notice Banner",
  description: "A responsive announcement banner with a badge, message, and action.",
  registryDependencies: ["badge", "button"],
  files: [
    {
      path: "registry/base-nova/notice-banner/notice-banner.tsx",
      type: "registry:component",
    },
  ],
} satisfies RegistryItemDefinition;
