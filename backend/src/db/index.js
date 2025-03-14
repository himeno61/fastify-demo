import knex from "knex";

const db = knex({
  client: "sqlite3", // or 'better-sqlite3'
  connection: {
    filename: "./db.sqlite",
  },
});

try {
  // await db.schema.dropTableIfExists("emails");
  const hasTable = await db.schema.hasTable("emails");
  if (!hasTable) {
    let uuidGenerationRaw =
      db.client.config.client === "sqlite3"
        ? `(lower(hex(randomblob(4))) || '-' || lower(hex(randomblob(2))) || '-4' || substr(lower(hex(randomblob(2))),2) || '-' || substr('89ab',abs(random()) % 4 + 1, 1) || substr(lower(hex(randomblob(2))),2) || '-' || lower(hex(randomblob(6))))`
        : `uuid_generate_v4()`;

    await db.schema.createTable("emails", (table) => {
      table.uuid("id").primary().defaultTo(db.raw(uuidGenerationRaw));
      table.text("to").index();
      table.text("cc").index();
      table.text("bcc").index();
      table.string("subject").index();
      table.string("body");
      table.timestamps(true, true);
    });
  }
} catch (e) {
  console.error(e);
}

export class DB {
  static async addEmail(data) {
    const newItem = await db("emails")
      .insert({
        ...data,
        to: JSON.stringify(data.to),
        cc: JSON.stringify(data.cc),
        bcc: JSON.stringify(data.bcc),
      })
      .returning("id");
    setTimeout(() => {
      console.log("Adding timeout to make API slower");
    }, 1000);
    return newItem[0];
  }
  static async getEmails() {
    return db("emails").select();
  }
  static async getEmail(id) {
    return db("emails").where({ id }).first();
  }
  static async searchEmails(searchText) {
    return db("emails")
      .where("to", "like", `%${searchText}%`)
      .orWhere("cc", "like", `%${searchText}%`)
      .orWhere("bcc", "like", `%${searchText}%`)
      .orWhere("subject", "like", `%${searchText}%`)
      .orWhere("body", "like", `%${searchText}%`)
      .select();
  }
}
