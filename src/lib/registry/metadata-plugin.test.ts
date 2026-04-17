import { describe, expect, test } from "vitest";

import { extractRegistryMetadataModule } from "./metadata-plugin";

describe("registry metadata plugin", () => {
  test("extracts metadata from a client preview module", () => {
    const metadataModule = extractRegistryMetadataModule(
      `"use client";

import { Button } from "@/components/ui/button";
import { defineRegistryItem } from "@/lib/registry/metadata";

import { Toaster } from "./toast";

export const registryItem = defineRegistryItem({
  name: "toast",
  type: "registry:ui",
  title: "Toast",
  description: "A toast manager.",
});

export function Preview() {
  return <Button><Toaster /></Button>;
}
`,
      "/registry/base-nova/components/toast/_registry.tsx",
    );

    expect(metadataModule).toContain(
      `import { defineRegistryItem } from "@/lib/registry/metadata";`,
    );
    expect(metadataModule).toContain(`name: "toast"`);
    expect(metadataModule).not.toContain(`from "@/components/ui/button"`);
    expect(metadataModule).not.toContain(`from "./toast"`);
    expect(metadataModule).not.toContain("Preview");
  });

  test("rejects indirect metadata definitions", () => {
    expect(() =>
      extractRegistryMetadataModule(
        `import { defineRegistryItem } from "@/lib/registry/metadata";

const metadata = {
  name: "toast",
};

export const registryItem = defineRegistryItem(metadata);
`,
        "/registry/base-nova/components/toast/_registry.tsx",
      ),
    ).toThrow(/Use export const registryItem = defineRegistryItem\(\{ \.\.\. \}\)/u);
  });
});
