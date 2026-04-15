export type RegistryDetailType = "registry:block" | "registry:component";

export type RegistryItemDetailInput = {
  name: string;
  expectedType: RegistryDetailType;
};
