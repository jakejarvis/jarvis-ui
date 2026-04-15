import { IconBrandGithub, IconMenu2 } from "@tabler/icons-react";
import { Link, useRouterState } from "@tanstack/react-router";
import * as React from "react";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { getRegistryItemsByType, siteConfig } from "@/lib/registry/catalog";
import { cn } from "@/lib/utils";

import { DocsSidebar } from "./docs-sidebar";
import { ThemeToggle } from "./theme-toggle";

const navLinks = [
  { label: "Components", href: "/components" },
  { label: "Blocks", href: "/blocks" },
] as const;

export function SiteHeader() {
  const pathname = useRouterState({
    select: (state) => state.location.pathname,
  });
  const [open, setOpen] = React.useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
      <div className="mx-auto flex h-14 max-w-screen-2xl items-center gap-4 px-4 sm:px-6 lg:px-8">
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger render={<Button variant="ghost" size="icon" className="lg:hidden" />}>
            <IconMenu2 />
            <span className="sr-only">Toggle menu</span>
          </SheetTrigger>
          <SheetContent side="left" className="w-72 p-0">
            <SheetTitle className="sr-only">Navigation</SheetTitle>
            <MobileNav pathname={pathname} onNavigate={() => setOpen(false)} />
          </SheetContent>
        </Sheet>

        <Link to="/" className="flex items-center gap-2">
          <img src="/logo192.png" alt="" className="size-6 rounded-md" />
          <span className="font-heading text-sm font-semibold">{siteConfig.name}</span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              className={cn(
                "rounded-md px-3 py-1.5 text-sm transition-colors hover:text-foreground",
                pathname.startsWith(link.href) ? "text-foreground" : "text-muted-foreground",
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon"
            nativeButton={false}
            render={
              <a
                href="https://github.com/jakejarvis/jarvis-ui"
                target="_blank"
                rel="noopener noreferrer"
              />
            }
          >
            <IconBrandGithub />
            <span className="sr-only">GitHub</span>
          </Button>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}

function MobileNav({ pathname, onNavigate }: { pathname: string; onNavigate: () => void }) {
  const componentItems = getRegistryItemsByType("registry:component");
  const blockItems = getRegistryItemsByType("registry:block");

  return (
    <div className="flex flex-col gap-4 overflow-y-auto p-4 pt-12">
      <div className="flex flex-col gap-1">
        <Link
          to="/"
          onClick={onNavigate}
          className={cn(
            "rounded-md px-3 py-1.5 text-sm transition-colors hover:text-foreground",
            pathname === "/" ? "font-medium text-foreground" : "text-muted-foreground",
          )}
        >
          Home
        </Link>
      </div>

      {componentItems.length > 0 && (
        <DocsSidebar
          title="Components"
          items={componentItems}
          basePath="/components"
          pathname={pathname}
          onNavigate={onNavigate}
        />
      )}

      {blockItems.length > 0 && (
        <DocsSidebar
          title="Blocks"
          items={blockItems}
          basePath="/blocks"
          pathname={pathname}
          onNavigate={onNavigate}
        />
      )}
    </div>
  );
}
