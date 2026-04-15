import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  defaultStatusBoardItems,
  getStatusBoardSummary,
  type StatusBoardItem,
} from "@/registry/base-nova/blocks/status-board/lib/status-board-data";

type StatusBoardProps = {
  title?: string;
  description?: string;
  actionLabel?: string;
  items?: StatusBoardItem[];
};

export function StatusBoard({
  title = "Operations status",
  description = "Track the signals that need attention before the next review.",
  actionLabel = "Open queue",
  items = defaultStatusBoardItems,
}: StatusBoardProps) {
  const summary = getStatusBoardSummary(items);

  return (
    <section className="grid w-full max-w-4xl gap-4 lg:grid-cols-[18rem_minmax(0,1fr)]">
      <Card>
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <div className="grid grid-cols-3 gap-2">
            <SummaryTile label="Clear" value={summary.healthy} />
            <SummaryTile label="Watch" value={summary.watch} />
            <SummaryTile label="Blocked" value={summary.blocked} />
          </div>
          <Button size="sm" className="w-fit">
            {actionLabel}
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Current signals</CardTitle>
          <CardDescription>Sorted by the order your team reviews them.</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col">
          {items.map((item, index) => (
            <div key={item.label} className="flex flex-col">
              {index > 0 ? <Separator /> : null}
              <div className="grid gap-3 py-4 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-start">
                <div className="flex min-w-0 flex-col gap-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-medium">{item.label}</span>
                    <StatusBadge status={item.status} />
                  </div>
                  <p className="text-sm text-muted-foreground">{item.detail}</p>
                </div>
                <div className="text-2xl font-semibold tabular-nums">{item.value}</div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </section>
  );
}

function SummaryTile({ label, value }: { label: string; value: number }) {
  return (
    <div className="flex flex-col gap-1 rounded-lg border bg-muted/40 p-3">
      <span className="text-xs text-muted-foreground">{label}</span>
      <span className="text-2xl font-semibold tabular-nums">{value}</span>
    </div>
  );
}

function StatusBadge({ status }: { status: StatusBoardItem["status"] }) {
  if (status === "blocked") {
    return <Badge variant="destructive">Blocked</Badge>;
  }

  if (status === "watch") {
    return <Badge variant="outline">Watch</Badge>;
  }

  return <Badge variant="secondary">Healthy</Badge>;
}
