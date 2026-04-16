import type { RegistryItemDefinition } from "@/lib/registry/metadata";

export const registryItem = {
  name: "browser-window",
  type: "registry:ui",
  title: "Browser Window",
  description: "A compact browser chrome frame for screenshots and previews.",
  files: [
    {
      path: "registry/base-nova/browser-window/browser-window.tsx",
      type: "registry:ui",
    },
  ],
} satisfies RegistryItemDefinition;
