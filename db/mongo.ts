import { MongoClient } from "https://deno.land/x/mongo@v0.7.0/mod.ts";
import { config } from "https://deno.land/x/dotenv/mod.ts";

config({ safe: true, export: true });

const client = new MongoClient();
client.connectWithUri(String(Deno.env.get("MONGO_URI")));

const db = client.database("test");

export default db;
