import { DB } from "../db/index.js";

export default async function routes(fastify, options) {
  fastify.get("/emails", async (request, reply) => {
    return DB.getEmails();
  });

  fastify.get("/emails/:id", async (request, reply) => {
    const { id } = request.params;
    return DB.getEmail(id);
  });
  fastify.post(
    "/emails",
    {
      schema: {
        body: {
          type: "object",
          required: ["to", "subject", "body"],
          properties: {
            to: { type: "array", items: { type: "string", format: "email" } },
            cc: { type: "array", items: { type: "string", format: "email" } },
            bcc: { type: "array", items: { type: "string", format: "email" } },
            subject: { type: "string" },
            body: { type: "string" },
          },
        },
      },
    },
    async (request, reply) => {
      return DB.addEmail(request.body);
    }
  );
  fastify.get("/search", async (request, reply) => {
    const { searchText } = request.query;
    return DB.searchEmails(searchText);
  });
}
