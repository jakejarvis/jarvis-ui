"use client";

import { defineRegistryItem } from "@/lib/registry/metadata";

import { CopyButton } from "./copy-button";

export const registryItem = defineRegistryItem({
  name: "copy-button",
  type: "registry:ui",
  title: "Copy Button",
  description: "A button that copies text to the clipboard with optional feedback.",
  registryDependencies: ["button"],
});

export function Preview() {
  return (
    <div className="flex w-full max-w-sm flex-wrap items-center justify-center gap-2">
      <CopyButton value="bunx --bun shadcn@latest add https://ui.jarv.is/r/copy-button.json" />
      <CopyButton
        value="jui_live_7vK8x8e8f95hK2hVv4sYQxB3"
        variant="outline"
        showLabel
        copyLabel="Copy token"
      />
    </div>
  );
}
