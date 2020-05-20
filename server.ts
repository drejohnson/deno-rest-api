import { Application } from "https:/deno.land/x/oak/mod.ts";
import router from "./routes.ts";

const port = 5000;
const app = new Application();

// Middleware
app.use(router.routes());
app.use(router.allowedMethods());

console.log(`Server listening on port ${port}`);

app.listen({ port });
