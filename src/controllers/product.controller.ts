import { Request, Response } from "express";
import { STATUS_CODES } from "../utils/status-codes";
import CategoryProductService from "../services/category-product.service";
import slugify from "slugify";
import ProductService from "../services/product.service";
import AttributeProductService from "../services/attribute-product.service";
import paginationHelper from "../helpers/pagination.helper";
import { removeKeysObject } from "../utils/lodash.util";
import { cleanAndGroupProductVariants } from "../helpers/other.helper";

// [GET] /products/
export const product = async (req: Request, res: Response) => {
  const { limit, page, keyword } = req.query;

  const find: {
    deleted: boolean;
    status: string;
    search?: RegExp;
  } = {
    deleted: false,
    status: "active",
  };

  if (keyword) {
    const keywordSlug = slugify(`${keyword}`, {
      lower: true,
      replacement: " ",
    });
    const keywordRegex = new RegExp(keywordSlug, "i");
    find.search = keywordRegex;
  }

  const pagination = await paginationHelper({
    modelName: "Product",
    find: { deleted: false },
    limit: limit ? Number(limit) : 20,
    page: page ? Number(page) : 1,
  });

  const records = await ProductService.getAll({
    find,
    sort: { position: -1 },
    skip: pagination.skip,
    limit: pagination.limit,
  });

  res.status(STATUS_CODES.OK).json({
    code: STATUS_CODES.OK,
    status: "success",
    metadata: records.map((record) =>
      removeKeysObject(record, [
        "attributes",
        "status",
        "slug",
        "variants",
        "category",
        "content",
        "deleted",
        "deletedAt",
        "search",
        "__v",
        "createdAt",
        "updatedAt",
      ])
    ),
    pagination,
  });
};

// [GET] /products/:id
export const productDetail = async (req: Request, res: Response) => {
  const { id } = req.params;
  const record = await ProductService.getById(id, {
    deleted: false,
    status: "active",
  });

  res.status(STATUS_CODES.OK).json({
    code: STATUS_CODES.OK,
    status: "success",
    data: cleanAndGroupProductVariants(record),
  });
};

// [GET] /products/categories
export const category = async (req: Request, res: Response) => {
  const { limit, page, keyword } = req.query;
  const find: {
    search?: RegExp;
    status: string;
    deleted: boolean;
  } = {
    deleted: false,
    status: "active",
  };

  if (keyword) {
    const keywordSlug = slugify(`${keyword}`, {
      lower: true,
      replacement: " ",
    });
    const keywordRegex = new RegExp(keywordSlug, "i");
    find.search = keywordRegex;
  }

  const pagination = await paginationHelper({
    modelName: "CategoryProduct",
    find: { deleted: false },
    limit: limit ? Number(limit) : 20,
    page: page ? Number(page) : 1,
  });

  const records = await CategoryProductService.getAll({
    find,
    limit: limit ? Number(limit) : 20,
    skip: pagination.skip,
  });

  for (const record of records) {
    if (!record.parent) continue;
    const parent = await CategoryProductService.getById(record.parent);
    (record as any).parentName = parent ? parent.name : "";
  }

  res.status(STATUS_CODES.OK).json({
    code: STATUS_CODES.OK,
    status: "success",
    metadata: records.map((record) =>
      removeKeysObject(record, [
        "status",
        "slug",
        "deleted",
        "deletedAt",
        "search",
        "__v",
        "createdAt",
        "updatedAt",
      ])
    ),
    pagination,
  });
};

// [GET] /products/categories/:id
export const categoryDetail = async (req: Request, res: Response) => {
  const { id } = req.params;

  const record: any = await CategoryProductService.getById(id, {
    deleted: false,
    status: "active",
  });

  if (!record) {
    return res.status(STATUS_CODES.NOT_FOUND).json({
      code: STATUS_CODES.NOT_FOUND,
      status: "error",
      message: "Danh mục không tồn tại!",
    });
  }

  const products: any[] = await ProductService.getAll({
    find: {
      category: {
        $in: id,
      },
      deleted: false,
      status: "active",
    },
  });

  record.products = products.map((product) =>
    removeKeysObject(product, [
      "attributes",
      "status",
      "slug",
      "variants",
      "category",
      "deleted",
      "deletedAt",
      "search",
      "__v",
      "createdAt",
      "updatedAt",
    ])
  );

  res.status(STATUS_CODES.OK).json({
    code: STATUS_CODES.OK,
    status: "success",
    data: removeKeysObject(record, [
      "slug",
      "status",
      "deleted",
      "deletedAt",
      "search",
      "__v",
      "createdAt",
      "updatedAt",
    ]),
  });
};

// [GET] /products/attributes
export const attribute = async (req: Request, res: Response) => {
  const { limit, page, keyword } = req.query;
  const find: {
    search?: RegExp;
    deleted: boolean;
  } = {
    deleted: false,
  };

  if (keyword) {
    const keywordSlug = slugify(`${keyword}`, {
      lower: true,
      replacement: " ",
    });
    const keywordRegex = new RegExp(keywordSlug, "i");
    find.search = keywordRegex;
  }

  const pagination = await paginationHelper({
    modelName: "AttributeProduct",
    find: { deleted: false },
    limit: limit ? Number(limit) : 20,
    page: page ? Number(page) : 1,
  });

  const records = await AttributeProductService.getAll({
    find,
    limit: limit ? Number(limit) : 20,
    skip: pagination.skip,
  });

  res.status(STATUS_CODES.OK).json({
    code: STATUS_CODES.OK,
    status: "success",
    metadata: records.map((record) =>
      removeKeysObject(record, [
        "deleted",
        "deletedAt",
        "search",
        "__v",
        "createdAt",
        "updatedAt",
      ])
    ),
    pagination,
  });
};
