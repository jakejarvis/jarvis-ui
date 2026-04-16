<!-- intent-skills:start -->
# Skill mappings - when working in these areas, load the linked skill file into context.
skills:
  - task: "add or change pages in src/routes and navigation links"
    load: "node_modules/@tanstack/router-core/skills/router-core/SKILL.md"
  - task: "add route loaders, pending states, errors, or route-based data fetching"
    load: "node_modules/@tanstack/router-core/skills/router-core/data-loading/SKILL.md"
  - task: "add server functions for forms, mutations, or server-only logic"
    load: "node_modules/@tanstack/start-client-core/skills/start-core/server-functions/SKILL.md"
  - task: "add API endpoints or server route handlers"
    load: "node_modules/@tanstack/start-client-core/skills/start-core/server-routes/SKILL.md"
  - task: "change the TanStack Start, Vite, or Devtools setup"
    load: "node_modules/@tanstack/start-client-core/skills/start-core/SKILL.md"
  - task: "work on Vite+ development workflow or CLI operations"
    load: "node_modules/vite-plus/skills/vite-plus/SKILL.md"
<!-- intent-skills:end -->

# Agent Instructions

## Package Manager
Use **Vite+**: `vp install`, `vp dev`, `vp build`, `vp test`

## Tooling
- **Vite+** (`vp`): dev/build/test/lint/fmt — config in `vite.config.ts`
- **Registry**: `/r/*.json` is served by TanStack Start server routes from `registry/base-nova/**/_registry.tsx` and raw source imports

## File-Scoped Commands
| Task | Command |
|------|---------|
| Check (fmt + lint + types) | `vp check path/to/file.tsx` |
| Check with auto-fix | `vp check --fix path/to/file.tsx` |
| Tests (filter) | `vp test run path/to/file.test.ts` |

## Commit Attribution
AI commits MUST include:
```
Co-Authored-By: (the agent's name and attribution byline)
```

## Key Conventions
- Routes: `src/routes/` — do not edit `src/routeTree.gen.ts`
- Registry catalog: `src/lib/registry/catalog.ts`; item sources under `registry/base-nova/`
- Docs chrome: `src/components/docs/`; shadcn UI: `src/components/ui/`; theme/CSS: `src/styles.css`
- See `README.md` for TanStack Start / routing overview
