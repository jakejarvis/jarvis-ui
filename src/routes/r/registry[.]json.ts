import { createFileRoute } from "@tanstack/react-router";

import { getRegistryIndexJson, registryJsonResponseHeaders } from "@/lib/registry/json.server";

export const Route = createFileRoute("/r/registry.json")({
  server: {
    handlers: {
      GET: () => Response.json(getRegistryIndexJson(), { headers: registryJsonResponseHeaders }),
    },
  },
});
