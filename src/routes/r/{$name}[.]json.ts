import { createFileRoute } from "@tanstack/react-router";

import { getRegistryItemJson, registryJsonResponseHeaders } from "@/lib/registry/json.server";

export const Route = createFileRoute("/r/{$name}.json")({
  server: {
    handlers: {
      GET: ({ params }) => {
        const item = getRegistryItemJson(params.name);

        if (!item) {
          return Response.json(
            { error: "Registry item not found." },
            {
              headers: registryJsonResponseHeaders,
              status: 404,
            },
          );
        }

        return Response.json(item, { headers: registryJsonResponseHeaders });
      },
    },
  },
});
