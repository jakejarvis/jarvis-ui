import type { RegistryItemDefinition } from "@/lib/registry/metadata";

export const registryItem = {
  name: "copy-button",
  type: "registry:ui",
  title: "Copy Button",
  description: "A button that copies text to the clipboard with built-in success feedback.",
  dependencies: ["@tabler/icons-react"],
  registryDependencies: ["button"],
  files: [
    {
      path: "registry/base-nova/copy-button/copy-button.tsx",
      type: "registry:ui",
    },
  ],
} satisfies RegistryItemDefinition;
