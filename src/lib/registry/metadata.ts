export type RegistryFileType =
  | "registry:component"
  | "registry:lib"
  | "registry:hook"
  | "registry:ui"
  | "registry:block"
  | "registry:page"
  | "registry:file"
  | "registry:style"
  | "registry:theme";

export type RegistryItemType =
  | "registry:block"
  | "registry:component"
  | "registry:hook"
  | "registry:lib"
  | "registry:page"
  | "registry:style"
  | "registry:theme"
  | "registry:ui";

export type RegistryFileDefinition = {
  path: string;
  type: RegistryFileType;
  target?: string;
};

export type RegistryItemDefinition = {
  name: string;
  type: RegistryItemType;
  title: string;
  description: string;
  dependencies?: string[];
  devDependencies?: string[];
  registryDependencies?: string[];
  files: RegistryFileDefinition[];
};
