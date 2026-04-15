import { Link } from "@tanstack/react-router";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { type RegistryCatalogItem } from "@/lib/registry/catalog";

import { CodeBlock } from "./code-block";
import { ComponentPreview } from "./component-preview";
import { InstallCommand } from "./install-command";

type RegistryItemDocProps = {
  item: RegistryCatalogItem;
  section: "Components" | "Blocks";
  sectionPath: "/components" | "/blocks";
};

export function RegistryItemDoc({ item, section, sectionPath }: RegistryItemDocProps) {
  return (
    <article className="flex min-w-0 flex-col gap-8">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink render={<Link to={sectionPath} />}>{section}</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{item.title}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <header className="flex max-w-3xl flex-col gap-2">
        <h1 className="font-heading text-3xl font-bold tracking-tight">{item.title}</h1>
        <p className="text-lg text-muted-foreground">{item.description}</p>
      </header>

      <Tabs defaultValue="preview">
        <TabsList>
          <TabsTrigger value="preview">Preview</TabsTrigger>
          <TabsTrigger value="code">Code</TabsTrigger>
        </TabsList>
        <TabsContent value="preview">
          <ComponentPreview name={item.name} />
        </TabsContent>
        <TabsContent value="code">
          {item.previewSourceFile.source ? (
            <CodeBlock code={item.previewSourceFile.source} />
          ) : (
            <p className="text-sm text-muted-foreground">No preview source is available.</p>
          )}
        </TabsContent>
      </Tabs>

      <section className="flex flex-col gap-4">
        <h2 className="font-heading text-xl font-semibold tracking-tight">Installation</h2>
        <Tabs defaultValue="cli">
          <TabsList>
            <TabsTrigger value="cli">CLI</TabsTrigger>
            <TabsTrigger value="manual">Manual</TabsTrigger>
          </TabsList>
          <TabsContent value="cli">
            <InstallCommand item={item} />
          </TabsContent>
          <TabsContent value="manual">
            <div className="flex flex-col gap-4">
              {item.sourceFiles.map((file) => (
                <CodeBlock key={file.path} code={file.source} />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </section>
    </article>
  );
}

export function RegistryItemNotFound({ name }: { name: string }) {
  return (
    <div className="flex min-h-96 flex-col items-start justify-center gap-4">
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
