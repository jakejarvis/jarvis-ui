import { registryItems, type RegistryCatalogItem } from "./catalog";
import {
  registryConfig,
  registryItemSchema,
  type RegistryFileDefinition,
  type RegistryItemDefinition,
} from "./metadata";
import { getRegistryItemWithSources } from "./source.server";

export const registryJsonResponseHeaders = {
  "Cache-Control": "public, max-age=0, s-maxage=3600, stale-while-revalidate=86400",
} as const;

type RegistryIndexJson = typeof registryConfig & {
  items: RegistryItemDefinition[];
};

type RegistryItemFileJson = RegistryFileDefinition & {
  content: string;
};

type RegistryItemJson = Omit<RegistryItemDefinition, "files"> & {
  $schema: typeof registryItemSchema;
  files: RegistryItemFileJson[];
};

export function getRegistryIndexJson(): RegistryIndexJson {
  return {
    ...registryConfig,
    items: registryItems.map(toRegistryItemDefinition),
  };
}

export function getRegistryItemJson(name: string): RegistryItemJson | null {
  const item = registryItems.find((registryItem) => registryItem.name === name);

  return item ? toRegistryItemJson(item) : null;
}

export function getRegistryValidationErrors() {
  const errors: string[] = [];
  const names = new Map<string, string>();

  for (const item of registryItems) {
    const existingName = names.get(item.name);

    if (existingName) {
      errors.push(
        `Duplicate registry item name "${item.name}" in ${existingName} and ${item.name}.`,
      );
    }

    names.set(item.name, item.name);

    if (!item.name || !item.title || !item.description || !item.type) {
      errors.push(`Registry item "${item.name}" has incomplete metadata.`);
    }

    if (item.files.length === 0) {
      errors.push(`Registry item "${item.name}" must list at least one registry file.`);
    }

    for (const file of item.files) {
      if (!file.path.startsWith("registry/")) {
        errors.push(
          `Registry item "${item.name}" contains a file path outside registry/: ${file.path}`,
        );
      }

      if (file.path.endsWith("_meta.ts") || file.path.endsWith("_preview.tsx")) {
        errors.push(`Registry item "${item.name}" must not publish metadata or preview files.`);
      }

      if ((file.type === "registry:file" || file.type === "registry:page") && !file.target) {
        errors.push(`Registry item "${item.name}" file ${file.path} must include target.`);
      }
    }

    const itemWithSources = getRegistryItemWithSources(item);

    for (const file of itemWithSources.sourceFiles) {
      if (file.source.length === 0) {
        errors.push(`Registry item "${item.name}" references a missing file: ${file.path}`);
      }
    }
  }

  return errors;
}

function toRegistryItemJson(item: RegistryCatalogItem): RegistryItemJson {
  const itemWithSources = getRegistryItemWithSources(item);
  const missingFiles = itemWithSources.sourceFiles
    .filter((file) => file.source.length === 0)
    .map((file) => file.path);

  if (missingFiles.length > 0) {
    throw new Error(`Missing registry source file(s): ${missingFiles.join(", ")}`);
  }

  const registryItem: RegistryItemJson = {
    $schema: registryItemSchema,
    name: item.name,
    title: item.title,
    description: item.description,
    files: itemWithSources.sourceFiles.map(toRegistryItemFileJson),
    type: item.type,
  };

  if (item.dependencies) {
    registryItem.dependencies = item.dependencies;
  }

  if (item.devDependencies) {
    registryItem.devDependencies = item.devDependencies;
  }

  if (item.registryDependencies) {
    registryItem.registryDependencies = item.registryDependencies;
  }

  return registryItem;
}

function toRegistryItemDefinition(item: RegistryCatalogItem): RegistryItemDefinition {
  const registryItem: RegistryItemDefinition = {
    name: item.name,
    type: item.type,
    title: item.title,
    description: item.description,
    files: item.files,
  };

  if (item.dependencies) {
    registryItem.dependencies = item.dependencies;
  }

  if (item.devDependencies) {
    registryItem.devDependencies = item.devDependencies;
  }

  if (item.registryDependencies) {
    registryItem.registryDependencies = item.registryDependencies;
  }

  return registryItem;
}

function toRegistryItemFileJson(
  file: RegistryCatalogItem["sourceFiles"][number] & { source: string },
): RegistryItemFileJson {
  const registryFile: RegistryItemFileJson = {
    path: file.path,
    type: file.type,
    content: file.source,
  };

  if (file.target) {
    registryFile.target = file.target;
  }

  return registryFile;
}
