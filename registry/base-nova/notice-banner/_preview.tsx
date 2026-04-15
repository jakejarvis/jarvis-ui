import { NoticeBanner } from "./notice-banner";

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
