import { Router } from "https://deno.land/x/oak/mod.ts";
import {
  getProducts,
  getProduct,
  addProduct,
  updateProduct,
  deleteProduct,
} from "./handlers/products.ts";

const router = new Router();

router
  .get("/api/v1/products", getProducts)
  .get<{ id: string }>("/api/v1/products/:id", getProduct)
  .post("/api/v1/products", addProduct)
  .put<{ id: string }>("/api/v1/products/:id", updateProduct)
  .delete<{ id: string }>("/api/v1/products/:id", deleteProduct);

export default router;
