import { RouterContext } from "https:/deno.land/x/oak/mod.ts";
import { v4 } from "https://deno.land/std/uuid/mod.ts";
import { Product } from "../types.ts";

let products: Product[] = [
  {
    id: "1",
    name: "Product One",
    description: "This is Product One",
    price: 59.99,
  },
  {
    id: "2",
    name: "Product Two",
    description: "This is Product Two",
    price: 10.99,
  },
  {
    id: "3",
    name: "Product Three",
    description: "This is Product Three",
    price: 49.99,
  },
  {
    id: "4",
    name: "Product Four",
    description: "This is Product Four",
    price: 29.99,
  },
  {
    id: "5",
    name: "Product Five",
    description: "This is Product Five",
    price: 9.99,
  },
];

// @desc    Get all Products
// @route   GET /api/v1/products
const getProducts = ({ response }: RouterContext) => {
  response.body = {
    success: true,
    data: products,
  };
};

// @desc    Get a single Product
// @route   GET /api/v1/products/:id
const getProduct = (
  { params, response }: RouterContext,
) => {
  const product: Product | undefined = products.find((p) => p.id === params.id);

  if (product) {
    response.status = 200;
    response.body = {
      success: true,
      data: product,
    };
  } else {
    response.status = 404;
    response.body = {
      success: false,
      data: "Product not found",
    };
  }
};

// @desc    Add a Product
// @route   Post /api/v1/products
const addProduct = async (
  { request, response }: RouterContext,
) => {
  const body = await request.body();

  if (!request.hasBody) {
    response.status = 400;
    response.body = {
      success: false,
      data: "No Data",
    };
  } else {
    const product: Product = body.value;
    product.id = v4.generate();
    products.push(product);
    response.status = 201;
    response.body = {
      success: true,
      data: product,
    };
  }
};

// @desc    Update a Product
// @route   PUT /api/v1/products/:id
const updateProduct = async (
  { params, request, response }: RouterContext,
) => {
  const product: Product | undefined = products.find((p) => p.id === params.id);

  if (product) {
    const body = await request.body();
    const updateProduct: {
      name?: string;
      description?: string;
      price?: number;
    } = body.value;

    products = products.map((p) =>
      p.id === params.id ? { ...p, ...updateProduct } : p
    );

    response.status = 200;
    response.body = {
      success: true,
      data: products,
    };
  } else {
    response.status = 400;
    response.body = {
      success: false,
      data: "Product not found",
    };
  }
};

// @desc    delete a Product
// @route   DELETE /api/v1/products/:id
const deleteProduct = (
  { params, response }: RouterContext,
) => {
  products = products.filter((p) => p.id !== params.id);
  response.status = 200;
  response.body = {
    success: true,
    msg: `Product with id: ${params.id} removed`,
    data: products,
  };
};

export { getProducts, getProduct, addProduct, updateProduct, deleteProduct };
