export type StatusBoardItem = {
  label: string;
  value: string;
  detail: string;
  status: "healthy" | "watch" | "blocked";
};

export const defaultStatusBoardItems = [
  {
    label: "Production sync",
    value: "99.98%",
    detail: "All regions reporting inside the expected window.",
    status: "healthy",
  },
  {
    label: "Review queue",
    value: "18",
    detail: "Five items are waiting on owner feedback.",
    status: "watch",
  },
  {
    label: "Incident response",
    value: "2",
    detail: "Follow-up actions remain assigned to support.",
    status: "blocked",
  },
] satisfies StatusBoardItem[];

export function getStatusBoardSummary(items: StatusBoardItem[]) {
  return {
    healthy: items.filter((item) => item.status === "healthy").length,
    watch: items.filter((item) => item.status === "watch").length,
    blocked: items.filter((item) => item.status === "blocked").length,
  };
}
