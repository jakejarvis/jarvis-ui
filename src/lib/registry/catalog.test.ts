import { describe, expect, test } from "vitest";

import {
  getMissingRegistrySourcePaths,
  getRegistryItemsMissingUsage,
  getRegistryJsonItemNames,
  registryItems,
} from "@/lib/registry/catalog";

describe("registry catalog", () => {
  test("has unique item names", () => {
    const names = registryItems.map((item) => item.name);

    expect(new Set(names).size).toBe(names.length);
  });

  test("matches the registry index", () => {
    const catalogNames = registryItems.map((item) => item.name).sort();
    const registryNames = getRegistryJsonItemNames().sort();

    expect(catalogNames).toEqual(registryNames);
  });

  test("has install commands and snippets for every item", () => {
    for (const item of registryItems) {
      expect(item.installCommand).toContain(`/r/${item.name}.json`);
      expect(item.usage).toContain(`import`);
    }
  });

  test("loads source for every published file", () => {
    expect(getMissingRegistrySourcePaths()).toEqual([]);
  });

  test("has usage docs for every item", () => {
    expect(getRegistryItemsMissingUsage()).toEqual([]);
  });

  test("publishes blocks as multi-file registry items", () => {
    const blocks = registryItems.filter((item) => item.type === "registry:block");

    for (const block of blocks) {
      expect(block.files.length).toBeGreaterThan(1);
    }
  });
});
