import { Application } from "https:/deno.land/x/oak/mod.ts";
import { timer, logger, errorHandler } from "./middleware/middleware.ts";
import router from "./routes.ts";

const port = 5000;
const app = new Application();

// Server Middleware
app.use(timer);
app.use(logger);
app.use(errorHandler);

// Router Middleware
app.use(router.routes());
app.use(router.allowedMethods());

console.log(`Server listening on port ${port}`);

app.listen({ port });
