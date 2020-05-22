import { RouterContext } from "https:/deno.land/x/oak/mod.ts";
import db from "../db/mongo.ts";
import { Product } from "../types.ts";

const products = db.collection("products");

// @desc    Get all Products
// @route   GET /api/v1/products
const getProducts = async ({ response }: RouterContext) => {
  response.body = {
    success: true,
    data: await products.find(),
  };
};

// @desc    Get a single Product
// @route   GET /api/v1/products/:id
const getProduct = async (
  { params, response }: RouterContext,
) => {
  try {
    const product = await products.findOne({ _id: { $oid: params.id } });

    if (!product) {
      response.status = 404;
      response.body = {
        success: false,
        msg: "Product not found",
      };
      return;
    }

    response.status = 200;
    response.body = {
      success: true,
      data: product,
    };
  } catch (error) {
    response.status = 500;
    response.body = {
      success: false,
      msg: error,
    };
  }
};

// @desc    Add a Product
// @route   POST /api/v1/products
const addProduct = async (
  { request, response }: RouterContext,
) => {
  try {
    const body = await request.body();

    if (!request.hasBody) {
      response.status = 400;
      response.body = {
        success: false,
        data: "No Data",
      };
      return;
    }

    const { name, description, price }: Product = body.value;
    const { $oid } = await products.insertOne({
      name,
      description,
      price,
    });

    const product = await products.findOne({ _id: { $oid } });

    response.status = 201;
    response.body = {
      success: true,
      data: product,
    };
  } catch (error) {
    response.status = 500;
    response.body = {
      success: false,
      msg: error,
    };
  }
};

// @desc    Update a Product
// @route   PUT /api/v1/products/:id
const updateProduct = async (
  { params, request, response }: RouterContext,
) => {
  try {
    const body = await request.body();
    const updateData: {
      name?: string;
      description?: string;
      price?: number;
    } = body.value;

    if (!updateData) {
      response.status = 500;
      response.body = {
        success: false,
        msg: "The posts could not be removed",
      };
      return;
    }

    const updatedProduct = await products.updateOne(
      { _id: { $oid: params.id } },
      {
        $set: {
          ...updateData,
        },
      },
    );

    if (!updatedProduct) {
      response.status = 404;
      response.body = {
        success: false,
        msg: "The product with the specified ID does not exist.",
      };
      return;
    }

    const product = await products.findOne({ _id: { $oid: params.id } });

    response.status = 200;
    response.body = {
      success: true,
      data: product,
    };
  } catch (error) {
    response.status = 500;
    response.body = {
      success: false,
      msg: error,
    };
  }
};

// @desc    delete a Product
// @route   DELETE /api/v1/products/:id
const deleteProduct = async (
  { params, response }: RouterContext,
) => {
  try {
    const removedProduct = await products.deleteOne(
      { _id: { $oid: params.id } },
    );
    if (!removedProduct) {
      response.status = 404;
      response.body = {
        success: false,
        msg: "Product not found",
      };
      return;
    }

    response.status = 200;
    response.body = {
      success: true,
      msg: `Product with id: ${params.id} was deleted`,
    };
  } catch (error) {
    response.status = 500;
    response.body = {
      success: false,
      data: error,
    };
  }
};

export { getProducts, getProduct, addProduct, updateProduct, deleteProduct };
