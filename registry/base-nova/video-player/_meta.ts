import type { RegistryItemDefinition } from "@/lib/registry/metadata";

export const registryItem = {
  name: "video-player",
  type: "registry:component",
  title: "Video Player",
  description: "A themed media-chrome video player with composable controls.",
  dependencies: ["media-chrome"],
  files: [
    {
      path: "registry/base-nova/video-player/video-player.tsx",
      type: "registry:component",
    },
  ],
} satisfies RegistryItemDefinition;
