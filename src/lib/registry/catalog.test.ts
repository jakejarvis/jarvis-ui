import { describe, expect, test } from "vitest";

import {
  getRegistryItemsByType,
  registryMetadataItems,
  registryItems,
} from "@/lib/registry/catalog";
import {
  getRegistryIndexJson,
  getRegistryItemJson,
  getRegistryValidationErrors,
} from "@/lib/registry/json.server";
import { registryItemSchema } from "@/lib/registry/metadata";
import {
  getMissingRegistryPreviewPaths,
  getMissingRegistrySourcePaths,
  getRegistryItemWithSources,
  trimBlankTrailingLines,
} from "@/lib/registry/source.server";

const registryItemCollator = new Intl.Collator("en", {
  numeric: true,
  sensitivity: "base",
});

describe("registry catalog", () => {
  test("has unique item names", () => {
    const names = registryItems.map((item) => item.name);

    expect(new Set(names).size).toBe(names.length);
  });

  test("orders registry item lists alphabetically", () => {
    expect(registryItems.map((item) => item.name)).toEqual(getAlphabetizedItemNames(registryItems));
    expect(registryMetadataItems.map((item) => item.name)).toEqual(
      getAlphabetizedItemNames(registryMetadataItems),
    );
    expect(getRegistryIndexJson().items.map((item) => item.name)).toEqual(
      getAlphabetizedItemNames(getRegistryIndexJson().items),
    );

    for (const type of ["registry:block", "registry:component"] as const) {
      const items = getRegistryItemsByType(type);

      expect(items.map((item) => item.name)).toEqual(getAlphabetizedItemNames(items));
    }
  });

  test("matches the registry index", () => {
    const catalogNames = registryItems.map((item) => item.name).toSorted();
    const registryNames = getRegistryIndexJson()
      .items.map((item) => item.name)
      .toSorted();

    expect(catalogNames).toEqual(registryNames);
  });

  test("builds the registry index from item metadata", () => {
    expect(getRegistryIndexJson().items).toEqual(registryMetadataItems);
  });

  test("builds shadcn registry item JSON with file contents", () => {
    for (const item of registryItems) {
      const registryItemJson = getRegistryItemJson(item.name);

      expect(registryItemJson).not.toBeNull();
      expect(registryItemJson?.$schema).toBe(registryItemSchema);
      expect(registryItemJson?.name).toBe(item.name);
      expect(registryItemJson?.files.map(toRegistryFileDefinition)).toEqual(item.files);
      expect(registryItemJson?.files.every((file) => file.content.length > 0)).toBe(true);
    }
  });

  test("returns null for unknown registry item JSON", () => {
    expect(getRegistryItemJson("missing-item")).toBeNull();
  });

  test("validates published registry metadata and sources", () => {
    expect(getRegistryValidationErrors()).toEqual([]);
  });

  test("has preview snippets for every item", () => {
    for (const item of registryItems) {
      expect(getRegistryItemWithSources(item).previewSourceFile.source).toContain(
        `export function Preview`,
      );
    }
  });

  test("loads source for every published file", () => {
    expect(getMissingRegistrySourcePaths()).toEqual([]);
  });

  test("loads preview source for every item", () => {
    expect(getMissingRegistryPreviewPaths()).toEqual([]);
  });

  test("trims blank trailing lines from imported source", () => {
    expect(trimBlankTrailingLines("const value = 1;\n\n \n\t")).toBe("const value = 1;");
    expect(trimBlankTrailingLines("const value = 1;  \n")).toBe("const value = 1;  ");

    for (const item of registryItems) {
      const itemWithSources = getRegistryItemWithSources(item);

      expect(itemWithSources.previewSourceFile.source).not.toMatch(/\n[ \t]*$/u);

      for (const file of itemWithSources.sourceFiles) {
        expect(file.source).not.toMatch(/\n[ \t]*$/u);
      }
    }
  });

  test("publishes blocks as multi-file registry items", () => {
    const blocks = registryItems.filter((item) => item.type === "registry:block");

    for (const block of blocks) {
      expect(block.files.length).toBeGreaterThan(1);
    }
  });
});

function getAlphabetizedItemNames(items: Array<{ name: string; title: string }>) {
  return items.toSorted(compareRegistryItemNames).map((item) => item.name);
}

function compareRegistryItemNames(
  a: { name: string; title: string },
  b: { name: string; title: string },
) {
  return (
    registryItemCollator.compare(a.title, b.title) || registryItemCollator.compare(a.name, b.name)
  );
}

function toRegistryFileDefinition(file: {
  path: string;
  type: string;
  target?: string;
  content: string;
}) {
  return file.target
    ? { path: file.path, type: file.type, target: file.target }
    : {
        path: file.path,
        type: file.type,
      };
}
