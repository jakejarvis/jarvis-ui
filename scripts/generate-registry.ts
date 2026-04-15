import { access, readdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { cwd, exit } from "node:process";
import { pathToFileURL } from "node:url";

import type { RegistryFileDefinition, RegistryItemDefinition } from "../src/lib/registry/metadata";

const registryConfig = {
  $schema: "https://ui.shadcn.com/schema/registry.json",
  name: "jarvis-ui",
  homepage: "https://ui.jarv.is",
} as const;

const registryRoot = path.resolve("registry/base-nova");
const registryJsonPath = path.resolve("registry.json");
const registryItemCollator = new Intl.Collator("en", {
  numeric: true,
  sensitivity: "base",
});

type RegistryMetaModule = {
  registryItem?: RegistryItemDefinition;
};

type RegistryItemRecord = {
  item: RegistryItemDefinition;
  metaPath: string;
};

async function main() {
  const metaPaths = await findMetaFiles(registryRoot);

  if (metaPaths.length === 0) {
    throw new Error("No _meta.ts files found under registry/base-nova.");
  }

  const records = await Promise.all(metaPaths.map(loadRegistryItemRecord));
  await validateRegistryItemRecords(records);

  const items = [...records].toSorted(compareRegistryItemRecords).map((record) => record.item);

  await writeFile(
    registryJsonPath,
    `${JSON.stringify(
      {
        ...registryConfig,
        items,
      },
      null,
      2,
    )}\n`,
  );

  console.log(`Generated registry.json with ${items.length} items.`);
}

async function findMetaFiles(directory: string): Promise<string[]> {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = await Promise.all(
    entries.map(async (entry) => {
      const entryPath = path.join(directory, entry.name);

      if (entry.isDirectory()) {
        return findMetaFiles(entryPath);
      }

      return entry.isFile() && entry.name === "_meta.ts" ? [entryPath] : [];
    }),
  );

  return files.flat();
}

async function loadRegistryItemRecord(metaPath: string): Promise<RegistryItemRecord> {
  const module = (await import(pathToFileURL(metaPath).href)) as RegistryMetaModule;

  if (!module.registryItem) {
    throw new Error(`${toRelativePath(metaPath)} must export registryItem.`);
  }

  return {
    item: module.registryItem,
    metaPath: toRelativePath(metaPath),
  };
}

async function validateRegistryItemRecords(records: RegistryItemRecord[]) {
  const names = new Map<string, string>();

  for (const record of records) {
    const existingPath = names.get(record.item.name);

    if (existingPath) {
      throw new Error(
        `Duplicate registry item name "${record.item.name}" in ${existingPath} and ${record.metaPath}.`,
      );
    }

    names.set(record.item.name, record.metaPath);
  }

  await Promise.all(records.map(validateRegistryItem));
}

async function validateRegistryItem(record: RegistryItemRecord) {
  const { item, metaPath } = record;

  if (!item.name || !item.title || !item.description || !item.type) {
    throw new Error(`${metaPath} has incomplete registryItem metadata.`);
  }

  if (item.files.length === 0) {
    throw new Error(`${metaPath} must list at least one registry file.`);
  }

  await Promise.all(item.files.map((file) => validateRegistryFile(file, metaPath)));
}

async function validateRegistryFile(file: RegistryFileDefinition, metaPath: string) {
  if (!file.path.startsWith("registry/")) {
    throw new Error(`${metaPath} contains a file path outside registry/: ${file.path}`);
  }

  if (file.path.endsWith("_meta.ts") || file.path.endsWith("_preview.tsx")) {
    throw new Error(`${metaPath} must not include metadata or preview files as registry payloads.`);
  }

  if ((file.type === "registry:file" || file.type === "registry:page") && !file.target) {
    throw new Error(`${metaPath} file ${file.path} must include target for ${file.type}.`);
  }

  await assertPathExists(file.path, metaPath);
}

async function assertPathExists(filePath: string, metaPath: string) {
  try {
    await access(path.resolve(filePath));
  } catch {
    throw new Error(`${metaPath} references a missing file: ${filePath}`);
  }
}

function compareRegistryItemRecords(a: RegistryItemRecord, b: RegistryItemRecord) {
  return (
    registryItemCollator.compare(a.item.title, b.item.title) ||
    registryItemCollator.compare(a.item.name, b.item.name) ||
    registryItemCollator.compare(a.metaPath, b.metaPath)
  );
}

function toRelativePath(filePath: string) {
  return path.relative(cwd(), filePath).split(path.sep).join("/");
}

main().catch((error: unknown) => {
  console.error(error instanceof Error ? error.message : error);
  exit(1);
});
