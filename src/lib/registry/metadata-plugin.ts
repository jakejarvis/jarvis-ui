import { readFile } from "node:fs/promises";

import {
  Node,
  Project,
  ScriptTarget,
  type CallExpression,
  type Node as MorphNode,
  type ObjectLiteralExpression,
  type SourceFile,
  type VariableDeclaration,
} from "ts-morph";
import type { Plugin } from "vite";

const registryMetadataQuery = "registry-metadata";
const registryMetadataImport = `import { defineRegistryItem } from "@/lib/registry/metadata";`;

export function registryMetadataPlugin(): Plugin {
  return {
    name: "jarvis-ui:registry-metadata",
    enforce: "pre",
    async load(id) {
      const filename = getRegistryMetadataFilename(id);

      if (!filename) {
        return null;
      }

      const source = await readFile(filename, "utf8");

      return {
        code: extractRegistryMetadataModule(source, filename),
        map: null,
      };
    },
  };
}

export function extractRegistryMetadataModule(source: string, filename: string): string {
  const project = new Project({
    compilerOptions: {
      target: ScriptTarget.Latest,
    },
    skipAddingFilesFromTsConfig: true,
    useInMemoryFileSystem: true,
  });
  const sourceFile = project.createSourceFile(filename, source, { overwrite: true });
  const declarations = getRegistryItemDeclarations(sourceFile);

  if (declarations.length === 0) {
    throw new Error(`Missing exported registryItem metadata in ${filename}.`);
  }

  if (declarations.length > 1) {
    throw new Error(
      `Expected exactly one exported registryItem metadata declaration in ${filename}.`,
    );
  }

  const registryItemExpression = getRegistryItemExpression(declarations[0], sourceFile);
  const metadataObject = getRegistryItemObject(registryItemExpression, sourceFile);
  const metadataSource = metadataObject.getText();

  return `${registryMetadataImport}\n\nexport const registryItem = defineRegistryItem(${metadataSource});\n`;
}

function getRegistryMetadataFilename(id: string): string | null {
  const queryIndex = id.indexOf("?");

  if (queryIndex === -1) {
    return null;
  }

  const query = id.slice(queryIndex + 1).split("&");

  if (!query.includes(registryMetadataQuery)) {
    return null;
  }

  return id.slice(0, queryIndex).replace(/^\/@fs\//u, "/");
}

function getRegistryItemDeclarations(sourceFile: SourceFile): VariableDeclaration[] {
  return sourceFile
    .getVariableDeclarations()
    .filter((declaration) => declaration.getName() === "registryItem" && declaration.isExported());
}

function getRegistryItemExpression(
  declaration: VariableDeclaration | undefined,
  sourceFile: SourceFile,
): CallExpression {
  const initializer = declaration?.getInitializer();

  if (!initializer || !Node.isCallExpression(initializer)) {
    throwUnsupportedRegistryItem(declaration ?? sourceFile, sourceFile);
  }

  const expression = initializer.getExpression();

  if (
    !Node.isIdentifier(expression) ||
    expression.getText() !== "defineRegistryItem" ||
    initializer.getArguments().length !== 1
  ) {
    throwUnsupportedRegistryItem(initializer, sourceFile);
  }

  return initializer;
}

function getRegistryItemObject(
  expression: CallExpression,
  sourceFile: SourceFile,
): ObjectLiteralExpression {
  const metadata = expression.getArguments()[0];

  if (!metadata || !Node.isObjectLiteralExpression(metadata)) {
    throwUnsupportedRegistryItem(expression, sourceFile);
  }

  return metadata;
}

function throwUnsupportedRegistryItem(node: MorphNode, sourceFile: SourceFile): never {
  const { line, column } = sourceFile.getLineAndColumnAtPos(node.getStart());

  throw new Error(
    `Unsupported registryItem metadata in ${sourceFile.getFilePath()}:${line}:${column}. Use export const registryItem = defineRegistryItem({ ... }).`,
  );
}
