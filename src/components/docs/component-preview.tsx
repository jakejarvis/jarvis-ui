import type * as React from "react";

type PreviewModule = {
  Preview?: React.ComponentType;
};

const previewModules = import.meta.glob("../../../registry/base-nova/**/_preview.tsx", {
  eager: true,
}) as Record<string, PreviewModule>;

const previewByName = Object.fromEntries(
  Object.entries(previewModules).flatMap(([path, module]) => {
    const name = getRegistryItemName(path);

    return name && module.Preview ? [[name, module.Preview]] : [];
  }),
) as Record<string, React.ComponentType | undefined>;

type ComponentPreviewProps = {
  name: string;
};

export function ComponentPreview({ name }: ComponentPreviewProps) {
  const Preview = previewByName[name];

  return (
    <div className="flex min-h-72 items-center justify-center rounded-lg border bg-background p-6">
      {Preview ? (
        <Preview />
      ) : (
        <p className="text-sm text-muted-foreground">No preview is available for this item.</p>
      )}
    </div>
  );
}

function getRegistryItemName(path: string) {
  const segments = path.split("/");
  const previewIndex = segments.indexOf("_preview.tsx");

  if (previewIndex <= 0) {
    return null;
  }

  return segments[previewIndex - 1];
}
