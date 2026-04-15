import { IconCheck, IconCopy } from "@tabler/icons-react";
import * as React from "react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type CodeBlockProps = {
  code: string;
  label?: string;
  className?: string;
};

export function CodeBlock({ code, label, className }: CodeBlockProps) {
  const [copied, setCopied] = React.useState(false);

  async function copyCode() {
    if (!navigator.clipboard) {
      return;
    }

    await navigator.clipboard.writeText(code);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1200);
  }

  return (
    <div className={cn("min-w-0 overflow-hidden rounded-lg border bg-muted/40", className)}>
      <div className="flex min-h-10 items-center justify-between gap-3 border-b px-3">
        <span className="min-w-0 truncate text-xs font-medium text-muted-foreground">
          {label ?? "Code"}
        </span>
        <Button variant="ghost" size="icon-sm" onClick={() => void copyCode()}>
          {copied ? <IconCheck /> : <IconCopy />}
          <span className="sr-only">Copy code</span>
        </Button>
      </div>
      <pre className="overflow-x-auto p-4 text-sm leading-6">
        <code>{code}</code>
      </pre>
    </div>
  );
}
