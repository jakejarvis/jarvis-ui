import { IconBook, IconCode } from "@tabler/icons-react";
import { Link, useRouterState } from "@tanstack/react-router";
import * as React from "react";

import { Separator } from "@/components/ui/separator";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarSeparator,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { getRegistryItemsByType, siteConfig } from "@/lib/registry/catalog";

import { ThemeToggle } from "./theme-toggle";

type DocsShellProps = {
  children: React.ReactNode;
};

export function DocsShell({ children }: DocsShellProps) {
  return (
    <SidebarProvider>
      <Sidebar collapsible="offcanvas">
        <DocsSidebar />
      </Sidebar>
      <SidebarInset className="min-w-0">
        <header className="sticky top-0 z-20 flex h-14 items-center gap-3 border-b bg-background/95 px-4 backdrop-blur lg:hidden">
          <SidebarTrigger />
          <Separator orientation="vertical" className="h-5" />
          <div className="flex min-w-0 items-center gap-2">
            <img src="/logo192.png" alt="" className="size-6 rounded-md" />
            <span className="truncate font-heading text-sm font-medium">{siteConfig.name}</span>
          </div>
        </header>
        <main className="mx-auto flex w-full max-w-5xl flex-1 flex-col px-4 py-8 sm:px-6 md:px-5 lg:px-8">
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}

function DocsSidebar() {
  const pathname = useRouterState({
    select: (state) => state.location.pathname,
  });
  const componentItems = getRegistryItemsByType("registry:component");
  const blockItems = getRegistryItemsByType("registry:block");

  return (
    <>
      <SidebarHeader>
        <Link to="/" className="flex min-w-0 items-center gap-3 rounded-lg p-2">
          <img src="/logo192.png" alt="" className="size-8 rounded-lg" />
          <div className="flex min-w-0 flex-col">
            <span className="truncate font-heading text-sm font-medium">{siteConfig.name}</span>
            <span className="truncate text-xs text-sidebar-foreground/70">
              {siteConfig.namespace}
            </span>
          </div>
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Start</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  isActive={pathname === "/"}
                  tooltip="Overview"
                  render={<Link to="/" activeOptions={{ exact: true }} />}
                >
                  <IconBook />
                  <span>Overview</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  tooltip="Registry JSON"
                  render={
                    <a href="/r/registry.json">
                      <IconCode />
                      <span className="font-mono text-xs">registry.json</span>
                    </a>
                  }
                />
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarSeparator />
        <SidebarGroup>
          <SidebarGroupLabel render={<Link to="/components" />}>Components</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {componentItems.map((item) => (
                <SidebarMenuItem key={item.name}>
                  <SidebarMenuButton
                    isActive={pathname === `/components/${item.name}`}
                    tooltip={item.title}
                    render={<Link to="/components/$name" params={{ name: item.name }} />}
                  >
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarSeparator />
        <SidebarGroup>
          <SidebarGroupLabel render={<Link to="/blocks" />}>Blocks</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {blockItems.map((item) => (
                <SidebarMenuItem key={item.name}>
                  <SidebarMenuButton
                    isActive={pathname === `/blocks/${item.name}`}
                    tooltip={item.title}
                    render={<Link to="/blocks/$name" params={{ name: item.name }} />}
                  >
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <ThemeToggle />
      </SidebarFooter>
    </>
  );
}
