import { useRouterState } from "@tanstack/react-router";
import type * as React from "react";

import { getRegistryItemsByType } from "@/lib/registry/catalog";

import { DocsSidebar } from "./docs-sidebar";

type DocsLayoutProps = {
  section: "components" | "blocks";
  children: React.ReactNode;
};

export function DocsLayout({ section, children }: DocsLayoutProps) {
  const pathname = useRouterState({
    select: (state) => state.location.pathname,
  });

  const items =
    section === "components"
      ? getRegistryItemsByType("registry:component")
      : getRegistryItemsByType("registry:block");

  const basePath = section === "components" ? "/components" : "/blocks";
  const title = section === "components" ? "Components" : "Blocks";

  return (
    <div className="mx-auto flex w-full max-w-screen-2xl gap-8 px-4 sm:px-6 lg:px-8">
      <aside className="sticky top-14 hidden h-[calc(100vh-3.5rem)] w-56 shrink-0 overflow-y-auto py-8 lg:block">
        <DocsSidebar title={title} items={items} basePath={basePath} pathname={pathname} />
      </aside>
      <main className="min-w-0 flex-1 py-8">
        <div className="mx-auto max-w-3xl">{children}</div>
      </main>
    </div>
  );
}
