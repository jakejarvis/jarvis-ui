import registryIndex from "../../../registry.json";

export const siteConfig = {
  name: "Jarvis UI",
  registryName: registryIndex.name,
  namespace: "@jarvis-ui",
  homepage: registryIndex.homepage,
  registryPath: "/r",
  displayBaseUrl: "https://your-domain.com",
  description: "A minimal shadcn-compatible registry for reusable product components.",
} as const;

type RegistryItem = (typeof registryIndex.items)[number];
type RegistryFile = RegistryItem["files"][number];
type RegistryType = RegistryItem["type"];
type RegistryDocsModule = {
  usage?: string;
};

const registrySources = import.meta.glob("../../../registry/**/*.{ts,tsx}", {
  eager: true,
  import: "default",
  query: "?raw",
}) as Record<string, string>;

const registryDocsModules = import.meta.glob("../../../registry/base-nova/**/docs.tsx", {
  eager: true,
}) as Record<string, RegistryDocsModule>;

const registrySourceByPath = normalizeGlobFiles(registrySources);
const docsByPath = normalizeGlobFiles(registryDocsModules);

export type RegistrySourceFile = RegistryFile & {
  fileName: string;
  source: string;
};

export type RegistryCatalogItem = RegistryItem & {
  sourceFiles: RegistrySourceFile[];
  usage: string;
  installCommand: string;
  namespaceCommand: string;
};

export const registryItems = registryIndex.items.map((item) => ({
  ...item,
  sourceFiles: item.files.map((file) => ({
    ...file,
    fileName: getFileName(file.path),
    source: registrySourceByPath[file.path] ?? "",
  })),
  usage: docsByPath[getDocsPath(item)]?.usage ?? "",
  installCommand: `bunx --bun shadcn@latest add ${siteConfig.displayBaseUrl}${siteConfig.registryPath}/${item.name}.json`,
  namespaceCommand: `bunx --bun shadcn@latest add ${siteConfig.namespace}/${item.name}`,
})) satisfies RegistryCatalogItem[];

export function getRegistryItem(name: string) {
  return registryItems.find((item) => item.name === name);
}

export function getRegistryItemsByType(type: RegistryType) {
  return registryItems.filter((item) => item.type === type);
}

export function getRegistryJsonItemNames() {
  return registryIndex.items.map((item) => item.name);
}

export function getMissingRegistrySourcePaths() {
  return registryItems.flatMap((item) =>
    item.sourceFiles.filter((file) => file.source.length === 0).map((file) => file.path),
  );
}

export function getRegistryItemsMissingUsage() {
  return registryItems.filter((item) => item.usage.length === 0).map((item) => item.name);
}

export function getNamespaceConfigSnippet() {
  return JSON.stringify(
    {
      registries: {
        [siteConfig.namespace]: `${siteConfig.displayBaseUrl}${siteConfig.registryPath}/{name}.json`,
      },
    },
    null,
    2,
  );
}

function normalizeGlobFiles<T>(files: Record<string, T>) {
  return Object.fromEntries(
    Object.entries(files).map(([path, source]) => [normalizeGlobPath(path), source]),
  );
}

function normalizeGlobPath(path: string) {
  return path.replace(/^(\.\.\/){3}/, "");
}

function getDocsPath(item: RegistryItem) {
  return `${getRegistryItemRoot(item)}/docs.tsx`;
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
