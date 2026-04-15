import {
  registryConfig,
  type RegistryFileDefinition,
  type RegistryItemDefinition,
} from "./metadata";

export const siteConfig = {
  name: "@jarvis-ui",
  registryName: registryConfig.name,
  namespace: "@jarvis-ui",
  homepage: registryConfig.homepage,
  registryPath: "/r",
  displayBaseUrl: "https://ui.jarv.is",
  description:
    "An intentionally random collection of components and blocks, likely only useful to one person (me).",
} as const;

type RegistryItem = RegistryItemDefinition;
export type RegistryFile = RegistryFileDefinition;
export type RegistryType = RegistryItem["type"];
type RegistryMetaModule = {
  registryItem?: RegistryItemDefinition;
};

const registryMetaModules = import.meta.glob<RegistryMetaModule>(
  "../../../registry/base-nova/**/_meta.ts",
  {
    eager: true,
  },
);

const metaByPath = normalizeGlobFiles(registryMetaModules);
const registryItemCollator = new Intl.Collator("en", {
  numeric: true,
  sensitivity: "base",
});

export const registryMetadataItems = Object.values(metaByPath)
  .flatMap((module) => (module.registryItem ? [module.registryItem] : []))
  .toSorted(compareRegistryItemNames);

export type RegistrySourceFile = RegistryFile & {
  fileName: string;
};

export type RegistryPreviewSourceFile = {
  path: string;
  fileName: string;
};

export type RegistryCatalogItem = RegistryItem & {
  sourceFiles: RegistrySourceFile[];
  previewSourceFile: RegistryPreviewSourceFile;
};

export const registryItems = registryMetadataItems.map((item) =>
  Object.assign({}, item, {
    sourceFiles: item.files.map((file) =>
      Object.assign({}, file, {
        fileName: getFileName(file.path),
      }),
    ),
    previewSourceFile: getPreviewSourceFile(item),
  }),
) satisfies RegistryCatalogItem[];

export function getRegistryItem(name: string) {
  return registryItems.find((item) => item.name === name);
}

export function getRegistryItemsByType(type: RegistryType) {
  return registryItems.filter((item) => item.type === type);
}

function normalizeGlobFiles<T>(files: Record<string, T>) {
  return Object.fromEntries(
    Object.entries(files).map(([path, source]) => [normalizeGlobPath(path), source]),
  );
}

function normalizeGlobPath(path: string) {
  return path.replace(/^(\.\.\/){3}/, "");
}

function compareRegistryItemNames(
  a: Pick<RegistryItemDefinition, "name" | "title">,
  b: Pick<RegistryItemDefinition, "name" | "title">,
) {
  return (
    registryItemCollator.compare(a.title, b.title) || registryItemCollator.compare(a.name, b.name)
  );
}

function getPreviewSourceFile(item: RegistryItem): RegistryPreviewSourceFile {
  const path = `${getRegistryItemRoot(item)}/_preview.tsx`;

  return {
    path,
    fileName: getFileName(path),
  };
}

function getRegistryItemRoot(item: RegistryItem) {
  const [firstFile] = item.files;

  if (!firstFile) {
    return `registry/base-nova/${item.name}`;
  }

  const segments = firstFile.path.split("/");
  const itemNameIndex = segments.indexOf(item.name);

  if (itemNameIndex === -1) {
    return segments.slice(0, -1).join("/");
  }

  return segments.slice(0, itemNameIndex + 1).join("/");
}

function getFileName(path: string) {
  return path.split("/").at(-1) ?? path;
}
