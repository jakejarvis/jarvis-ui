import { useRouterState } from "@tanstack/react-router";
import type * as React from "react";

import { getRegistryItemsByType } from "@/lib/registry/catalog";

import { DocsSidebar } from "./docs-sidebar";

type DocsLayoutProps = {
  section: "components" | "blocks";
  children: React.ReactNode;
};

const docsSectionConfig = {
  components: {
    title: "Components",
    basePath: "/components",
    registryType: "registry:component",
  },
  blocks: {
    title: "Blocks",
    basePath: "/blocks",
    registryType: "registry:block",
  },
} as const;

export function DocsLayout({ section, children }: DocsLayoutProps) {
  const pathname = useRouterState({
    select: (state) => state.location.pathname,
  });
  const sectionConfig = docsSectionConfig[section];
  const items = getRegistryItemsByType(sectionConfig.registryType);

  return (
    <div className="mx-auto flex w-full max-w-screen-2xl gap-8 px-4 sm:px-6 lg:px-8">
      <aside className="sticky top-14 hidden h-[calc(100vh-3.5rem)] w-56 shrink-0 overflow-y-auto py-8 lg:block">
        <DocsSidebar
          title={sectionConfig.title}
          items={items}
          basePath={sectionConfig.basePath}
          pathname={pathname}
        />
      </aside>
      <main className="min-w-0 flex-1 py-8">
        <div className="mx-auto max-w-3xl">{children}</div>
      </main>
    </div>
  );
}
