import { IconBlocks, IconBrandGithub } from "@tabler/icons-react";
import { Link, createFileRoute } from "@tanstack/react-router";

import { Button } from "@/components/ui/button";
import { siteConfig } from "@/lib/registry/catalog";

export const Route = createFileRoute("/")({ component: HomePage });

function HomePage() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center px-4 py-24 sm:py-32">
      <div className="mx-auto flex max-w-2xl flex-col items-center gap-6 text-center">
        <h1 className="font-heading text-4xl font-bold tracking-tight sm:text-5xl">
          {siteConfig.name}
        </h1>
        <p className="max-w-lg text-lg text-muted-foreground">{siteConfig.description}</p>
        <div className="flex items-center gap-3">
          <Button size="lg" nativeButton={false} render={<Link to="/components" />}>
            <IconBlocks data-icon="inline-start" />
            Browse
          </Button>
          <Button
            variant="outline"
            size="lg"
            nativeButton={false}
            render={
              <a
                href="https://github.com/jakejarvis/jarvis-ui"
                target="_blank"
                rel="noopener noreferrer"
              />
            }
          >
            <IconBrandGithub data-icon="inline-start" />
            GitHub
          </Button>
        </div>
      </div>
    </div>
  );
}
