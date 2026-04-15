import { Link, createFileRoute } from "@tanstack/react-router";
import { IconArrowRight } from "@tabler/icons-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { registryItems } from "@/lib/registry/catalog";

export const Route = createFileRoute("/components/")({ component: ComponentsIndex });

function ComponentsIndex() {
  return (
    <div className="flex w-full flex-col gap-8">
      <header className="flex max-w-2xl flex-col gap-3">
        <Badge variant="outline" className="w-fit">
          Components
        </Badge>
        <h1 className="font-heading text-4xl font-semibold text-balance">Registry items</h1>
      </header>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {registryItems.map((item) => (
          <Card key={item.name}>
            <CardHeader>
              <CardTitle>{item.title}</CardTitle>
              <CardDescription>{item.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary">{item.type}</Badge>
                <Badge variant="outline">/{item.name}</Badge>
              </div>
              <Button
                variant="outline"
                size="sm"
                render={
                  <Link
                    to="/components/$name"
                    params={{ name: item.name }}
                    aria-label={item.title}
                  />
                }
              >
                Open docs
                <IconArrowRight data-icon="inline-end" />
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
