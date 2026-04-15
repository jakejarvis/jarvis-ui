import { StatusBoard } from "./components/status-board";

export const usage = `import { StatusBoard } from "@/components/status-board"

export function OperationsPanel() {
  return (
    <StatusBoard
      title="Launch readiness"
      description="Review the operational signals before release."
      actionLabel="Open launch queue"
    />
  )
}`;

export function Preview() {
  return <StatusBoard />;
}
