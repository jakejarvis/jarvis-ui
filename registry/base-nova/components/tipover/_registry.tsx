import { Button } from "@/components/ui/button";
import { defineRegistryItem } from "@/lib/registry/metadata";

import { Tipover, TipoverContent, TipoverTrigger } from "./tipover";

export const registryItem = defineRegistryItem({
  name: "tipover",
  type: "registry:ui",
  title: "Tipover",
  description: "A touch-friendly tooltip that falls back to a popover on coarse pointers.",
  dependencies: ["@base-ui/react"],
  files: [
    {
      path: "registry/base-nova/components/tipover/tipover.tsx",
      type: "registry:ui",
    },
    {
      path: "registry/base-nova/components/tipover/use-pointer-capability.ts",
      type: "registry:hook",
    },
  ],
});

export function Preview() {
  return (
    <div className="flex flex-col items-center gap-3 text-center">
      <Tipover>
        <TipoverTrigger render={<Button variant="outline" />}>What is Tipover?</TipoverTrigger>
        <TipoverContent side="top" className="max-w-56 text-center">
          A tooltip on hover devices and a popover on touch devices.
        </TipoverContent>
      </Tipover>
      <p className="max-w-sm text-sm text-muted-foreground">
        Hover, focus, or tap the trigger to use the same hint across pointer types.
      </p>
    </div>
  );
}
