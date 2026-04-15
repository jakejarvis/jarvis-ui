import type { RegistryItemDefinition } from "@/lib/registry/metadata";

export const registryItem = {
  name: "copyable-field",
  type: "registry:component",
  title: "Copyable Field",
  description: "A selectable, horizontally scrollable field with a copy action.",
  registryDependencies: ["copy-button", "field", "input-group", "scroll-area"],
  files: [
    {
      path: "registry/base-nova/copyable-field/copyable-field.tsx",
      type: "registry:component",
    },
  ],
} satisfies RegistryItemDefinition;
