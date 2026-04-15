import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

type MetricCardProps = {
  label?: string;
  value?: string;
  change?: string;
  description?: string;
  trend?: "up" | "down" | "neutral";
};

export function MetricCard({
  label = "Monthly revenue",
  value = "$48,240",
  change = "+12.5%",
  description = "Compared with the previous period",
  trend = "up",
}: MetricCardProps) {
  const badgeVariant = trend === "down" ? "destructive" : "secondary";

  return (
    <Card size="sm" className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>{label}</CardTitle>
        <CardDescription>Live metric</CardDescription>
        <CardAction>
          <Badge variant={badgeVariant}>{change}</Badge>
        </CardAction>
      </CardHeader>
      <CardContent className="flex flex-col gap-2">
        <div className="text-3xl font-semibold tabular-nums">{value}</div>
        <p className="text-sm text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  );
}
