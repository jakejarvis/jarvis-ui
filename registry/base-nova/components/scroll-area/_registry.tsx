import { defineRegistryItem } from "@/lib/registry/metadata";

import { ScrollArea } from "./scroll-area";

export const registryItem = defineRegistryItem({
  name: "scroll-area",
  type: "registry:ui",
  title: "Scroll Area",
  description: "A scroll container with overlay scrollbars and automatic edge fades.",
  dependencies: ["@base-ui/react"],
});

const activity = [
  "Renewed domainstack.io",
  "Queued DNS audit",
  "Pinned registrar notes",
  "Updated MX records",
  "Synced billing contact",
  "Archived expired domains",
  "Reviewed transfer lock",
  "Checked nameserver drift",
  "Scheduled renewal reminder",
  "Exported portfolio report",
];

export function Preview() {
  return (
    <ScrollArea className="h-56 w-full max-w-sm rounded-lg border bg-card" scrollbarGutter>
      <div className="flex flex-col gap-3 p-4">
        {activity.map((item, index) => (
          <div key={item} className="flex items-center justify-between gap-4 text-sm">
            <span>{item}</span>
            <span className="shrink-0 text-muted-foreground">#{index + 1}</span>
          </div>
        ))}
      </div>
    </ScrollArea>
  );
}
