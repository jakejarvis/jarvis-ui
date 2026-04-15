import { defineConfig } from "vite-plus";
import { devtools } from "@tanstack/devtools-vite";

import { tanstackStart } from "@tanstack/react-start/plugin/vite";

import viteReact from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

const config = defineConfig({
  staged: {
    "*": "vp check --fix",
  },
  fmt: {
    ignorePatterns: [
      "src/routeTree.gen.ts",
      "AGENTS.md",
      "README.md",
      ".cta.json",
      "registry.json",
      "public/registry.json",
      "public/r/**/*",
    ],
  },
  lint: {
    ignorePatterns: [
      "src/routeTree.gen.ts",
      "registry.json",
      "public/registry.json",
      "public/r/**/*",
    ],
    options: { typeAware: true, typeCheck: true },
  },
  resolve: { tsconfigPaths: true },
  plugins: [devtools(), tailwindcss(), tanstackStart(), viteReact()],
});

export default config;
