import componentsConfig from "../../../components.json";
import type { RegistryFileType } from "./metadata";

type RegistryDisplaySourceFile = {
  path: string;
  source: string;
};

type RegistryDisplayPublishedFile = RegistryDisplaySourceFile & {
  type: RegistryFileType;
  target?: string;
};

type RegistryDisplaySourceItem = {
  sourceFiles: readonly RegistryDisplayPublishedFile[];
};

const importSpecifierPattern =
  /(\bfrom\s*["']|\bimport\s*["']|\bimport\s*\(\s*["'])(\.{1,2}\/[^"']+)(["'])/gu;

export function getRegistryDisplaySource(
  item: RegistryDisplaySourceItem,
  file: RegistryDisplaySourceFile,
) {
  const displayImportPaths = new Map(
    item.sourceFiles.flatMap((sourceFile) => {
      const importPath = getRegistryFileDisplayImportPath(sourceFile);

      return importPath ? [[sourceFile.path, importPath]] : [];
    }),
  );

  return file.source.replace(
    importSpecifierPattern,
    (match: string, prefix: string, specifier: string, suffix: string) => {
      const sourcePath = resolveRegistrySourceImportPath(file.path, specifier, displayImportPaths);

      return sourcePath ? `${prefix}${displayImportPaths.get(sourcePath)}${suffix}` : match;
    },
  );
}

function getRegistryFileDisplayImportPath(file: RegistryDisplayPublishedFile) {
  if (file.target) {
    return stripCodeExtension(getAliasImportPathForTarget(file.target));
  }

  const alias = getAliasForRegistryFileType(file.type);

  return alias ? joinImportPath(alias, stripCodeExtension(getFileName(file.path))) : null;
}

function getAliasImportPathForTarget(target: string) {
  const normalizedTarget = target.replace(/^\.?\//u, "").replace(/^src\//u, "");

  if (normalizedTarget.startsWith("components/ui/")) {
    return joinImportPath(
      componentsConfig.aliases.ui,
      normalizedTarget.replace(/^components\/ui\//u, ""),
    );
  }

  if (normalizedTarget.startsWith("components/")) {
    return joinImportPath(
      componentsConfig.aliases.components,
      normalizedTarget.replace(/^components\//u, ""),
    );
  }

  if (normalizedTarget.startsWith("hooks/")) {
    return joinImportPath(
      componentsConfig.aliases.hooks,
      normalizedTarget.replace(/^hooks\//u, ""),
    );
  }

  if (normalizedTarget.startsWith("lib/")) {
    return joinImportPath(componentsConfig.aliases.lib, normalizedTarget.replace(/^lib\//u, ""));
  }

  return target;
}

function getAliasForRegistryFileType(type: RegistryFileType) {
  if (type === "registry:component" || type === "registry:ui") {
    return componentsConfig.aliases.ui;
  }

  if (type === "registry:hook") {
    return componentsConfig.aliases.hooks;
  }

  if (type === "registry:lib") {
    return componentsConfig.aliases.lib;
  }

  return null;
}

function resolveRegistrySourceImportPath(
  importerPath: string,
  specifier: string,
  displayImportPaths: Map<string, string>,
) {
  const normalizedPath = normalizePath([
    ...importerPath.split("/").slice(0, -1),
    ...specifier.split(/[?#]/u)[0].split("/"),
  ]);
  const candidatePaths = [
    normalizedPath,
    `${normalizedPath}.ts`,
    `${normalizedPath}.tsx`,
    `${normalizedPath}/index.ts`,
    `${normalizedPath}/index.tsx`,
  ];

  return candidatePaths.find((candidatePath) => displayImportPaths.has(candidatePath)) ?? null;
}

function normalizePath(segments: string[]) {
  const normalizedSegments: string[] = [];

  for (const segment of segments) {
    if (segment === "" || segment === ".") {
      continue;
    }

    if (segment === "..") {
      normalizedSegments.pop();
      continue;
    }

    normalizedSegments.push(segment);
  }

  return normalizedSegments.join("/");
}

function joinImportPath(basePath: string, childPath: string) {
  return `${basePath.replace(/\/$/u, "")}/${childPath.replace(/^\/+/u, "")}`;
}

function getFileName(path: string) {
  return path.split("/").at(-1) ?? path;
}

function stripCodeExtension(path: string) {
  return path.replace(/\.[cm]?[jt]sx?$/u, "");
}
