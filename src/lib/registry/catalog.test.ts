import { describe, expect, test } from "vitest";

import {
  getRegistryItemsByType,
  getRegistryJsonItems,
  getRegistryJsonItemNames,
  registryMetadataItems,
  registryItems,
} from "@/lib/registry/catalog";
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
    expect(getRegistryJsonItems().map((item) => item.name)).toEqual(
      getAlphabetizedItemNames(getRegistryJsonItems()),
    );

    for (const type of ["registry:block", "registry:component"] as const) {
      const items = getRegistryItemsByType(type);

      expect(items.map((item) => item.name)).toEqual(getAlphabetizedItemNames(items));
    }
  });

  test("matches the registry index", () => {
    const catalogNames = registryItems.map((item) => item.name).toSorted();
    const registryNames = getRegistryJsonItemNames().toSorted();

    expect(catalogNames).toEqual(registryNames);
  });

  test("registry index matches item metadata", () => {
    const metadataByName = new Map(registryMetadataItems.map((item) => [item.name, item]));

    expect([...metadataByName.keys()].toSorted()).toEqual(getRegistryJsonItemNames().toSorted());

    for (const item of getRegistryJsonItems()) {
      expect(item).toEqual(metadataByName.get(item.name));
    }
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
