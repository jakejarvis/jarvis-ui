import { renderServerComponent } from "@tanstack/react-start/rsc";

import { getRegistryItem } from "./catalog";
import type { RegistryItemDetailInput } from "./detail.types";
import { highlightCodeToHtml } from "./highlight.server";
import {
  getRegistryItemWithSources,
  type RegistryCatalogItemWithSources,
  type RegistryPreviewSourceFileWithSource,
  type RegistrySourceFileWithSource,
} from "./source.server";

type HighlightedCodeRenderable = Awaited<ReturnType<typeof renderCode>>;

export type HighlightedRegistrySourceFile = RegistrySourceFileWithSource & {
  highlightedCode: HighlightedCodeRenderable;
};

export type HighlightedRegistryPreviewSourceFile = RegistryPreviewSourceFileWithSource & {
  highlightedCode: HighlightedCodeRenderable;
};

export type RegistryItemDetail = Omit<
  RegistryCatalogItemWithSources,
  "previewSourceFile" | "sourceFiles"
> & {
  previewSourceFile: HighlightedRegistryPreviewSourceFile;
  sourceFiles: HighlightedRegistrySourceFile[];
};

export async function getRegistryItemDetailData(data: RegistryItemDetailInput) {
  const item = getRegistryItem(data.name);

  if (!item || item.type !== data.expectedType) {
    return {
      name: data.name,
      item: null,
    };
  }

  return {
    name: data.name,
    item: await highlightRegistryItem(getRegistryItemWithSources(item)),
  };
}

async function highlightRegistryItem(
  item: RegistryCatalogItemWithSources,
): Promise<RegistryItemDetail> {
  const [previewSourceFile, sourceFiles] = await Promise.all([
    highlightPreviewSourceFile(item.previewSourceFile),
    Promise.all(item.sourceFiles.map((file) => highlightSourceFile(file))),
  ]);

  return {
    ...item,
    previewSourceFile,
    sourceFiles,
  };
}

async function highlightPreviewSourceFile(
  file: RegistryPreviewSourceFileWithSource,
): Promise<HighlightedRegistryPreviewSourceFile> {
  return {
    ...file,
    highlightedCode: await renderCode(file),
  };
}

async function highlightSourceFile(
  file: RegistrySourceFileWithSource,
): Promise<HighlightedRegistrySourceFile> {
  return {
    ...file,
    highlightedCode: await renderCode(file),
  };
}

async function renderCode(file: { path: string; source: string }) {
  const html = await highlightCodeToHtml(file.source, file.path);

  return renderServerComponent(<HighlightedCode html={html} />);
}

function HighlightedCode({ html }: { html: string }) {
  return <div className="contents" dangerouslySetInnerHTML={{ __html: html }} />;
}
