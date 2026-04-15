import type { RegistryItemDefinition } from "@/lib/registry/metadata";

export const registryItem = {
  name: "notice-banner",
  type: "registry:component",
  title: "Notice Banner",
  description: "A responsive announcement banner with a badge, message, and action.",
  registryDependencies: ["badge", "button"],
  files: [
    {
      path: "registry/base-nova/notice-banner/notice-banner.tsx",
      type: "registry:component",
    },
  ],
} satisfies RegistryItemDefinition;

export const usage = `import { NoticeBanner } from "@/components/notice-banner"

export function ReleaseNotice() {
  return (
    <NoticeBanner
      eyebrow="Beta"
      title="New reporting blocks are ready."
      description="Install the registry item and adapt the copy to your product."
      actionLabel="Read docs"
    />
  )
}`;
