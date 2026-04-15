import { IconCheck, IconCopy } from "@tabler/icons-react";
import * as React from "react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type CodeBlockProps = {
  code: string;
  highlightedCode?: React.ReactNode;
  className?: string;
};

export function CodeBlock({ code, highlightedCode, className }: CodeBlockProps) {
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
    <div
      className={cn("relative min-w-0 overflow-hidden rounded-lg border bg-muted/40", className)}
    >
      <Button
        variant="ghost"
        size="icon-sm"
        className="absolute top-2 right-2 bg-muted/80"
        onClick={() => void copyCode()}
      >
        {copied ? <IconCheck /> : <IconCopy />}
        <span className="sr-only">Copy code</span>
      </Button>
      {highlightedCode ? (
        <div className="overflow-x-auto py-3 pr-12 pl-6 text-sm leading-6">{highlightedCode}</div>
      ) : (
        <pre className="overflow-x-auto py-3 pr-12 pl-6 text-sm leading-6">
          <code>{code}</code>
        </pre>
      )}
    </div>
  );
}
