import type { RegistryItemDefinition } from "@/lib/registry/metadata";

export const registryItem = {
  name: "toast",
  type: "registry:component",
  title: "Toast",
  description:
    "An opinionated toast manager and toaster built on Base UI with a Sonner-adjacent API.",
  dependencies: ["@base-ui/react", "@tabler/icons-react"],
  registryDependencies: ["spinner"],
  files: [
    {
      path: "registry/base-nova/toast/toast.tsx",
      type: "registry:component",
    },
  ],
} satisfies RegistryItemDefinition;
