import type { RegistryItemDefinition } from "@/lib/registry/metadata";

export const registryItem = {
  name: "stepper",
  type: "registry:component",
  title: "Stepper",
  description: "A keyboard-navigable multi-step flow with flexible triggers and panels.",
  dependencies: ["@base-ui/react"],
  files: [
    {
      path: "registry/base-nova/stepper/stepper.tsx",
      type: "registry:component",
    },
  ],
} satisfies RegistryItemDefinition;
