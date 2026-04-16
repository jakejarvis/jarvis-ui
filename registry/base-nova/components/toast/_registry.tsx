"use client";

import { Button } from "@/components/ui/button";
import { defineRegistryItem } from "@/lib/registry/metadata";

import { Toaster, toast } from "./toast";

export const registryItem = defineRegistryItem({
  name: "toast",
  type: "registry:ui",
  title: "Toast",
  description:
    "An opinionated toast manager and toaster built on Base UI with a Sonner-adjacent API.",
  dependencies: ["@base-ui/react", "@tabler/icons-react"],
  registryDependencies: ["spinner"],
});

export function Preview() {
  return (
    <div className="flex w-full max-w-2xl flex-wrap items-center justify-center gap-2">
      <Button
        type="button"
        variant="outline"
        onClick={() =>
          toast("Project saved", {
            description: "Your changes are ready to publish.",
          })
        }
      >
        Default
      </Button>
      <Button
        type="button"
        variant="outline"
        onClick={() =>
          toast.success("Deployment complete", {
            description: "Production is now serving the latest build.",
          })
        }
      >
        Success
      </Button>
      <Button
        type="button"
        variant="outline"
        onClick={() =>
          toast.error("Upload failed", {
            description: "Check the file and try again.",
            closeButton: true,
          })
        }
      >
        Error
      </Button>
      <Button
        type="button"
        variant="outline"
        onClick={() =>
          toast.info("Invite copied", {
            action: {
              label: "Undo",
              onClick: () => toast("Invite restored"),
            },
          })
        }
      >
        Action
      </Button>
      <Toaster closeButton richColors position="bottom-right" />
    </div>
  );
}
