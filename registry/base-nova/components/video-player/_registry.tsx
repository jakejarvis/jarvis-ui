import { defineRegistryItem } from "@/lib/registry/metadata";

import {
  VideoPlayer,
  VideoPlayerContent,
  VideoPlayerControlBar,
  VideoPlayerMuteButton,
  VideoPlayerPlayButton,
  VideoPlayerSeekBackwardButton,
  VideoPlayerSeekForwardButton,
  VideoPlayerTimeDisplay,
  VideoPlayerTimeRange,
  VideoPlayerVolumeRange,
} from "./video-player";

export const registryItem = defineRegistryItem({
  name: "video-player",
  type: "registry:ui",
  title: "Video Player",
  description: "A themed media-chrome video player with composable controls.",
  dependencies: ["media-chrome"],
});

export function Preview() {
  return (
    <div className="flex w-full max-w-2xl flex-col gap-3">
      <VideoPlayer className="aspect-video w-full overflow-hidden rounded-lg border bg-card">
        <VideoPlayerContent
          src="/Isabel_Waller_-_Poached_(2018).webm"
          poster="/Isabel_Waller_-_Poached_(2018).jpg"
          preload="metadata"
        />
        <VideoPlayerControlBar>
          <VideoPlayerPlayButton />
          <VideoPlayerSeekBackwardButton />
          <VideoPlayerTimeRange />
          <VideoPlayerTimeDisplay />
          <VideoPlayerSeekForwardButton />
          <VideoPlayerMuteButton />
          <VideoPlayerVolumeRange />
        </VideoPlayerControlBar>
      </VideoPlayer>
      <p className="text-center text-sm text-muted-foreground">
        Video credit:{" "}
        <a
          href="https://vimeo.com/274135837"
          rel="noreferrer"
          target="_blank"
          className="underline underline-offset-4"
        >
          Isabel Waller, Poached (2018)
        </a>
      </p>
    </div>
  );
}
