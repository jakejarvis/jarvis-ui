import type { RegistryItemDefinition } from "@/lib/registry/metadata";

export const registryItem = {
  name: "copyable-field",
  type: "registry:ui",
  title: "Copyable Field",
  description: "A selectable, horizontally scrollable field with a copy action.",
  registryDependencies: [
    "https://ui.jarv.is/r/copy-button.json",
    "field",
    "input-group",
    "https://ui.jarv.is/r/scroll-area.json",
  ],
  files: [
    {
      path: "registry/base-nova/copyable-field/copyable-field.tsx",
      type: "registry:ui",
    },
  ],
} satisfies RegistryItemDefinition;
