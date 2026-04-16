import {
  componentRegistryTypes,
  getRegistryItemsByTypes,
  type RegistryCatalogItem,
} from "./catalog";
import type { RegistryDetailType } from "./detail.types";

export type RegistrySection = "components" | "blocks";

export type RegistrySectionConfig = {
  id: RegistrySection;
  title: "Components" | "Blocks";
  description: string;
  basePath: "/components" | "/blocks";
  detailRoute: "/components/$name" | "/blocks/$name";
  registryTypes: readonly RegistryDetailType[];
};

export type RegistrySectionWithItems = RegistrySectionConfig & {
  items: RegistryCatalogItem[];
};

export const registrySections = {
  components: {
    id: "components",
    title: "Components",
    description: "Reusable UI components you can install into your project.",
    basePath: "/components",
    detailRoute: "/components/$name",
    registryTypes: componentRegistryTypes,
  },
  blocks: {
    id: "blocks",
    title: "Blocks",
    description: "Larger composed UI patterns you can install into your project.",
    basePath: "/blocks",
    detailRoute: "/blocks/$name",
    registryTypes: ["registry:block"],
  },
} as const satisfies Record<RegistrySection, RegistrySectionConfig>;

export const registrySectionList = [registrySections.components, registrySections.blocks] as const;

export function getRegistrySectionItems(section: RegistrySection): RegistryCatalogItem[] {
  return getRegistryItemsByTypes(registrySections[section].registryTypes);
}

export function getRegistrySectionsWithItems(): RegistrySectionWithItems[] {
  return registrySectionList.flatMap((section) => {
    const items = getRegistrySectionItems(section.id);

    return items.length > 0 ? [{ ...section, items }] : [];
  });
}
