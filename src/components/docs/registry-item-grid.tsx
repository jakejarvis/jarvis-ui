import { Link } from "@tanstack/react-router";

import type { RegistryCatalogItem } from "@/lib/registry/catalog";

type RegistryItemListProps = {
  title: string;
  description: string;
  items: RegistryCatalogItem[];
  detailRoute: "/components/$name" | "/blocks/$name";
};

export function RegistryItemList({
  title,
  description,
  items,
  detailRoute,
}: RegistryItemListProps) {
  return (
    <div className="flex w-full flex-col gap-6">
      <header className="flex flex-col gap-2">
        <h1 className="font-heading text-3xl font-bold tracking-tight">{title}</h1>
        <p className="text-muted-foreground">{description}</p>
      </header>

      <div className="flex flex-col">
        {items.map((item) => (
          <Link
            key={item.name}
            to={detailRoute}
            params={{ name: item.name }}
            className="flex flex-col gap-1 border-b py-3 transition-colors first:border-t hover:text-foreground"
          >
            <span className="text-sm font-medium">{item.title}</span>
            <span className="text-sm text-muted-foreground">{item.description}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
