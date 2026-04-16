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
    <div
      data-slot="component-preview"
      className="grid min-h-72 place-items-center rounded-lg border bg-background p-6"
    >
      {Preview ? (
        <div
          data-slot="component-preview-stage"
          className="grid min-h-60 w-full place-items-center"
        >
          <Preview />
        </div>
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
