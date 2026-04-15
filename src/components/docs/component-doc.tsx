import { Link } from "@tanstack/react-router";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { type RegistryComponent } from "@/lib/registry/catalog";

import { CodeBlock } from "./code-block";
import { ComponentPreview } from "./component-preview";
import { InstallCommand } from "./install-command";

type ComponentDocProps = {
  item: RegistryComponent;
};

export function ComponentDoc({ item }: ComponentDocProps) {
  return (
    <article className="flex flex-col gap-8">
      <header className="flex flex-col gap-4">
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="secondary">{item.type}</Badge>
          <Badge variant="outline">{item.name}</Badge>
        </div>
        <div className="flex max-w-3xl flex-col gap-3">
          <h1 className="font-heading text-4xl font-semibold text-balance">{item.title}</h1>
          <p className="text-lg text-muted-foreground">{item.description}</p>
        </div>
      </header>

      <ComponentPreview name={item.name} />

      <div className="flex flex-col gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Install</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <InstallCommand item={item} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Usage</CardTitle>
            <CardDescription>
              Install the item, then import it from your components directory.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="example">
              <TabsList>
                <TabsTrigger value="example">Example</TabsTrigger>
                <TabsTrigger value="source">Source</TabsTrigger>
              </TabsList>
              <TabsContent value="example">
                <CodeBlock code={item.usage} label="Example" />
              </TabsContent>
              <TabsContent value="source">
                <CodeBlock code={item.source} label="Component source" />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </article>
  );
}

export function ComponentNotFound({ name }: { name: string }) {
  return (
    <div className="flex min-h-96 flex-col items-start justify-center gap-4">
      <Badge variant="outline">Not found</Badge>
      <div className="flex max-w-xl flex-col gap-2">
        <h1 className="font-heading text-3xl font-semibold">No component named {name}</h1>
        <p className="text-muted-foreground">
          Check the registry overview for the components currently published by this site.
        </p>
      </div>
      <Button variant="outline" render={<Link to="/" />}>
        Back to overview
      </Button>
    </div>
  );
}
