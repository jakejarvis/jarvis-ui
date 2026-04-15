import babel from "@rolldown/plugin-babel";
import tailwindcss from "@tailwindcss/vite";
import { devtools } from "@tanstack/devtools-vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact, { reactCompilerPreset } from "@vitejs/plugin-react";
import rsc from "@vitejs/plugin-rsc";
import { nitro } from "nitro/vite";
import { defineConfig } from "vite-plus";

const config = defineConfig({
  staged: {
    "*": "vp check --fix",
  },
  fmt: {
    sortImports: {
      groups: [
        "builtin",
        "external",
        ["internal", "subpath"],
        ["parent", "sibling", "index"],
        "style",
        "unknown",
      ],
      internalPattern: ["@/", "@/registry/"],
      newlinesBetween: true,
      order: "asc",
    },
    sortTailwindcss: {
      stylesheet: "src/styles.css",
      functions: ["clsx", "cn", "cva", "classList"],
    },
    overrides: [
      {
        files: ["**/*.json", "**/*.jsonc"],
        options: {
          trailingComma: "none",
        },
      },
    ],
    ignorePatterns: [
      "src/routeTree.gen.ts",
      "AGENTS.md",
      "README.md",
      ".cta.json",
      "registry.json",
      "public/r/**/*",
    ],
  },
  lint: {
    plugins: ["oxc", "eslint", "typescript", "react", "import", "unicorn", "vitest", "jsx-a11y"],
    options: { typeAware: true, typeCheck: true },
    env: {
      builtin: true,
    },
    categories: {
      correctness: "error",
      suspicious: "warn",
      perf: "warn",
    },
    rules: {
      "react/react-in-jsx-scope": "off",
      "jsx-a11y/anchor-has-content": "off",
    },
    overrides: [
      {
        files: ["**/*.test.ts", "**/*.test.tsx"],
        rules: {
          "typescript/no-unused-vars": "off",
        },
      },
      {
        files: ["scripts/**/*.ts"],
        rules: {
          "typescript/no-unsafe-type-assertion": "off",
        },
      },
    ],
    ignorePatterns: ["src/routeTree.gen.ts", "registry.json", "public/r/**/*"],
  },
  resolve: { tsconfigPaths: true },
  plugins: [
    devtools(),
    tailwindcss(),
    tanstackStart({
      prerender: {
        enabled: true,
        crawlLinks: true,
        failOnError: true,
      },
      rsc: {
        enabled: true,
      },
    }),
    rsc(),
    viteReact(),
    babel({
      presets: [reactCompilerPreset()],
    }),
    nitro(),
  ],
});

export default config;
