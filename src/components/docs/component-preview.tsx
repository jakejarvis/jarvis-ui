import type * as React from "react";

type PreviewModule = {
  Preview?: React.ComponentType;
};

const previewModules = import.meta.glob<PreviewModule>(
  "../../../registry/base-nova/**/_preview.tsx",
  {
    eager: true,
  },
);

const previewByName: Record<string, React.ComponentType | undefined> = {};

for (const [path, module] of Object.entries(previewModules)) {
  const name = getRegistryItemName(path);

  if (name && module.Preview) {
    previewByName[name] = module.Preview;
  }
}

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
