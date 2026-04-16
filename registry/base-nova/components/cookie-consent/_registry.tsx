import { defineRegistryItem } from "@/lib/registry/metadata";

import { CookieConsent } from "./cookie-consent";

export const registryItem = defineRegistryItem({
  name: "cookie-consent",
  type: "registry:ui",
  title: "Cookie Consent",
  description: "A compact cookie consent card with pluggable accept and decline handlers.",
  registryDependencies: ["button"],
});

export function Preview() {
  return <CookieConsent />;
}
