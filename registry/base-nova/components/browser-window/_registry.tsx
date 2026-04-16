import { defineRegistryItem } from "@/lib/registry/metadata";

import { BrowserWindow, BrowserWindowContent, BrowserWindowImage } from "./browser-window";

export const registryItem = defineRegistryItem({
  name: "browser-window",
  type: "registry:ui",
  title: "Browser Window",
  description: "A compact browser chrome frame for screenshots and previews.",
});

export function Preview() {
  return (
    <BrowserWindow
      address="ui.shadcn.com"
      addressHref="https://ui.shadcn.com"
      className="w-full max-w-2xl"
    >
      <BrowserWindowContent className="aspect-video">
        <BrowserWindowImage src="/screenshot-shadcn.png" alt="Screenshot of ui.shadcn.com" />
      </BrowserWindowContent>
    </BrowserWindow>
  );
}
