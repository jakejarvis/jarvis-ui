import type { RegistryComponent } from "@/lib/registry/catalog";

import { CodeBlock } from "./code-block";

type InstallCommandProps = {
  item: RegistryComponent;
};

export function InstallCommand({ item }: InstallCommandProps) {
  return <CodeBlock code={item.installCommand} label="Bun" />;
}
