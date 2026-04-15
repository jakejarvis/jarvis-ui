import type { RegistryItemDefinition } from "@/lib/registry/metadata";

export const registryItem = {
  name: "cookie-consent",
  type: "registry:component",
  title: "Cookie Consent",
  description: "A compact cookie consent card with pluggable accept and decline handlers.",
  registryDependencies: ["button"],
  files: [
    {
      path: "registry/base-nova/cookie-consent/cookie-consent.tsx",
      type: "registry:component",
    },
  ],
} satisfies RegistryItemDefinition;
