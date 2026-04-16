import { defineRegistryItem } from "@/lib/registry/metadata";

import { CopyableField } from "./copyable-field";

export const registryItem = defineRegistryItem({
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
});

export function Preview() {
  return (
    <div className="flex w-full max-w-xl flex-col gap-4">
      <CopyableField
        label="Install"
        value="bunx --bun shadcn@latest add https://ui.jarv.is/r/copyable-field.json"
      />
      <CopyableField label="Token" value="jui_live_7vK8x8e8f95hK2hVv4sYQxB3" showLabel={false} />
    </div>
  );
}
