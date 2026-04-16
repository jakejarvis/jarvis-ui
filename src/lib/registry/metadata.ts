import type {
  RegistryBaseItem as ShadcnRegistryBaseItem,
  RegistryFontItem as ShadcnRegistryFontItem,
  RegistryItem as ShadcnRegistryItem,
} from "shadcn/schema";

export const registryConfig = {
  $schema: "https://ui.shadcn.com/schema/registry.json",
  name: "jarvis-ui",
  homepage: "https://ui.jarv.is",
} as const;

export const registryItemSchema = "https://ui.shadcn.com/schema/registry-item.json";

type ShadcnRegistryFile = NonNullable<ShadcnRegistryItem["files"]>[number];
type PrivateRegistryType = "registry:example" | "registry:internal";
type PublicRegistryFileDefinition<T extends ShadcnRegistryFile> = T extends unknown
  ? Omit<T, "content" | "type"> & { type: Exclude<T["type"], PrivateRegistryType> }
  : never;

export type RegistryItemType = Exclude<ShadcnRegistryItem["type"], PrivateRegistryType>;

export type RegistryFileDefinition = PublicRegistryFileDefinition<ShadcnRegistryFile>;

export type RegistryFileType = RegistryFileDefinition["type"];

export type RegistryItemDefinition = Omit<ShadcnRegistryItem, "$schema" | "files" | "type"> & {
  type: RegistryItemType;
  title: string;
  description: string;
  files: RegistryFileDefinition[];
  config?: ShadcnRegistryBaseItem["config"];
  font?: ShadcnRegistryFontItem["font"];
};
