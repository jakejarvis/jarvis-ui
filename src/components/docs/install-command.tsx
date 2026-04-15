import { IconPackage } from "@tabler/icons-react";

import { Badge } from "@/components/ui/badge";
import type { RegistryCatalogItem } from "@/lib/registry/catalog";

import { CodeBlock } from "./code-block";

type InstallCommandProps = {
  item: RegistryCatalogItem;
};

export function InstallCommand({ item }: InstallCommandProps) {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-2 text-sm font-medium">
        <IconPackage data-icon="inline-start" />
        Install with Bun
      </div>
      <CodeBlock code={item.installCommand} label="Bun" />
      {item.registryDependencies?.length ? (
        <div className="flex flex-wrap gap-2">
          {item.registryDependencies.map((dependency) => (
            <Badge key={dependency} variant="secondary">
              {dependency}
            </Badge>
          ))}
        </div>
      ) : null}
    </div>
  );
}
