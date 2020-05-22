import { Middleware } from "https:/deno.land/x/oak/mod.ts";

export const timer: Middleware = async (ctx, next) => {
  const start = Date.now();
  await next();
  const duration = Date.now() - start;
  console.log(`from timer: ${duration}ms`);
  ctx.response.headers.set("X-Response-Time", `${duration}ms`);
};

export const logger: Middleware = async (ctx, next) => {
  await next();
  const duration = ctx.response.headers.get("X-Response-Time");
  console.log(`${ctx.request.method} ${ctx.request.url} - ${duration}ms`);
};

export const errorHandler: Middleware = async (ctx, next) => {
  try {
    await next();
  } catch (error) {
    console.log(error);
    ctx.response.status = 500;
    ctx.response.body = { error: "Server error" };
  }
};
