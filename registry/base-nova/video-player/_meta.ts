import type { RegistryItemDefinition } from "@/lib/registry/metadata";

export const registryItem = {
  name: "video-player",
  type: "registry:ui",
  title: "Video Player",
  description: "A themed media-chrome video player with composable controls.",
  dependencies: ["media-chrome"],
  files: [
    {
      path: "registry/base-nova/video-player/video-player.tsx",
      type: "registry:ui",
    },
  ],
} satisfies RegistryItemDefinition;
