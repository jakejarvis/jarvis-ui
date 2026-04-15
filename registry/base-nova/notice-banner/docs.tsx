import { NoticeBanner } from "./notice-banner";

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

export function Preview() {
  return (
    <NoticeBanner
      eyebrow="Registry"
      title="Installable blocks should be boring to adopt."
      description="Every component here is designed to copy cleanly into another shadcn project."
      actionLabel="Install"
    />
  );
}
