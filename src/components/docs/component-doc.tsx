import { Link } from "@tanstack/react-router";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getNamespaceConfigSnippet, type RegistryCatalogItem } from "@/lib/registry/catalog";

import { CodeBlock } from "./code-block";
import { ComponentPreview } from "./component-preview";
import { InstallCommand } from "./install-command";

type RegistryItemDocProps = {
  item: RegistryCatalogItem;
};

export function RegistryItemDoc({ item }: RegistryItemDocProps) {
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

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_18rem]">
        <Card>
          <CardHeader>
            <CardTitle>Usage</CardTitle>
            <CardDescription>
              Install the item, then import it from your components directory.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="usage">
              <TabsList>
                <TabsTrigger value="usage">Usage</TabsTrigger>
                <TabsTrigger value="source">Source</TabsTrigger>
                <TabsTrigger value="namespace">Namespace</TabsTrigger>
              </TabsList>
              <TabsContent value="usage">
                <CodeBlock code={item.usage} label="Example" />
              </TabsContent>
              <TabsContent value="source" className="flex flex-col gap-4">
                {item.sourceFiles.map((file) => (
                  <CodeBlock key={file.path} code={file.source} label={file.path} />
                ))}
              </TabsContent>
              <TabsContent value="namespace">
                <CodeBlock code={getNamespaceConfigSnippet()} label="components.json" />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        <aside className="flex flex-col gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Install</CardTitle>
            </CardHeader>
            <CardContent>
              <InstallCommand item={item} />
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Files</CardTitle>
              <CardDescription>Payload files included in this registry item.</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-2">
              {item.sourceFiles.map((file) => (
                <div
                  key={file.path}
                  className="flex flex-col gap-1 rounded-lg border bg-background px-3 py-2"
                >
                  <span className="text-sm font-medium">{file.fileName}</span>
                  <span className="text-xs text-muted-foreground">{file.type}</span>
                </div>
              ))}
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Registry artifact</CardTitle>
              <CardDescription>Static JSON served from public/r.</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-3">
              <code className="rounded-md bg-muted px-2 py-1 text-sm">/r/{item.name}.json</code>
              <Separator />
              <Button variant="outline" size="sm" render={<Link to="/" />}>
                Registry overview
              </Button>
            </CardContent>
          </Card>
        </aside>
      </div>
    </article>
  );
}

export function RegistryItemNotFound({ name }: { name: string }) {
  return (
    <div className="flex min-h-96 flex-col items-start justify-center gap-4">
      <Badge variant="outline">Not found</Badge>
      <div className="flex max-w-xl flex-col gap-2">
        <h1 className="font-heading text-3xl font-semibold">No registry item named {name}</h1>
        <p className="text-muted-foreground">
          Check the registry overview for the items currently published by this site.
        </p>
      </div>
      <Button variant="outline" render={<Link to="/" />}>
        Back to overview
      </Button>
    </div>
  );
}

export const ComponentDoc = RegistryItemDoc;
export const ComponentNotFound = RegistryItemNotFound;
