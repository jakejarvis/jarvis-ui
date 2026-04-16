import { IconBrandGithub, IconMenu2 } from "@tabler/icons-react";
import { Link, useRouterState } from "@tanstack/react-router";
import * as React from "react";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import {
  componentRegistryTypes,
  getRegistryItemsByType,
  getRegistryItemsByTypes,
  siteConfig,
} from "@/lib/registry/catalog";
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
            <IconMenu2 data-icon />
            <span className="sr-only">Toggle menu</span>
          </SheetTrigger>
          <SheetContent side="left" className="w-72 p-0">
            <SheetTitle className="sr-only">Navigation</SheetTitle>
            <MobileNav pathname={pathname} onNavigate={() => setOpen(false)} />
          </SheetContent>
        </Sheet>

        <Link to="/" className="flex items-center gap-2.5">
          <JarvisLogo className="size-5 shrink-0" aria-hidden="true" />
          <span className="font-mono text-sm font-semibold tracking-tighter">
            {siteConfig.name}
          </span>
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
            <IconBrandGithub data-icon />
            <span className="sr-only">GitHub</span>
          </Button>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}

function MobileNav({ pathname, onNavigate }: { pathname: string; onNavigate: () => void }) {
  const componentItems = getRegistryItemsByTypes(componentRegistryTypes);
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
        {navLinks.map((link) => (
          <Link
            key={link.href}
            to={link.href}
            onClick={onNavigate}
            className={cn(
              "rounded-md px-3 py-1.5 text-sm transition-colors hover:text-foreground",
              pathname.startsWith(link.href)
                ? "font-medium text-foreground"
                : "text-muted-foreground",
            )}
          >
            {link.label}
          </Link>
        ))}
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

function JarvisLogo(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 32 32" fill="currentColor" focusable="false" {...props}>
      <path d="m30.48 7.625 -28.95 0 0 -4.57 -1.53 0 0 25.9 1.53 0 0 -19.81 28.95 0 0 19.81 1.52 0 0 -25.9 -1.52 0 0 4.57z" />
      <path d="M1.53 28.955h28.95v1.52H1.53Z" />
      <path d="M25.91 19.815h1.52v4.57h-1.52Z" />
      <path d="M24.38 24.385h1.53v1.52h-1.53Z" />
      <path d="M24.38 18.285h1.53v1.53h-1.53Z" />
      <path d="M19.81 25.905h4.57v1.53h-4.57Z" />
      <path d="m24.38 18.285 0 -1.52 -1.52 0 0 -6.09 -18.29 0 0 9.14 3.05 0 0 -1.53 -1.52 0 0 -6.09 15.24 0 0 4.57 -1.53 0 0 1.52 4.57 0z" />
      <path d="M18.29 24.385h1.52v1.52h-1.52Z" />
      <path d="M18.29 18.285h1.52v1.53h-1.52Z" />
      <path d="M16.76 19.815h1.53v4.57h-1.53Z" />
      <path d="M9.14 4.575h1.53v1.52H9.14Z" />
      <path d="m6.1 21.335 0 1.53 -1.53 0 0 1.52 10.67 0 0 -4.57 -1.52 0 0 -1.53 -1.53 0 0 -1.52 -1.52 0 0 1.52 -1.53 0 0 1.53 -1.52 0z" />
      <path d="M6.1 4.575h1.52v1.52H6.1Z" />
      <path d="M3.05 4.575h1.52v1.52H3.05Z" />
      <path d="M1.53 1.525h28.95v1.53H1.53Z" />
    </svg>
  );
}
