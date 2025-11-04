import { Request, Response } from "express";
import { STATUS_CODES } from "../utils/status-codes";
import CategoryProductService from "../services/category-product.service";
import slugify from "slugify";
import ProductService from "../services/product.service";
import AttributeProductService from "../services/attribute-product.service";
import paginationHelper from "../helpers/pagination.helper";

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

  const products = await ProductService.getAll({
    find,
    sort: { position: -1 },
    skip: pagination.skip,
    limit: pagination.limit,
  });

  res.status(STATUS_CODES.OK).json({
    code: STATUS_CODES.OK,
    status: "success",
    metadata: products,
    pagination,
  });
};

// [GET] /admin/products/categories
export const category = async (req: Request, res: Response) => {
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
    modelName: "CategoryProduct",
    find: { deleted: false },
    limit: limit ? Number(limit) : 20,
    page: page ? Number(page) : 1,
  });

  const { skip } = pagination;

  const [records, countDeleted] = await Promise.all([
    CategoryProductService.getAll({
      find,
      limit: limit ? Number(limit) : 20,
      skip,
    }),
    CategoryProductService.getCountDeleted(),
  ]);

  for (const record of records) {
    if (!record.parent) continue;
    const parent = await CategoryProductService.getById(record.parent);
    (record as any).parentName = parent ? parent.name : "";
  }

  res.render("admin/pages/product-category", {
    pageTitle: "Danh mục sản phẩm",
    categories: records,
    pagination,
    countDeleted,
  });
};

// [GET] /admin/products/attributes
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

  const { skip } = pagination;

  const [records, countDeleted] = await Promise.all([
    AttributeProductService.getAll({
      find,
      limit: limit ? Number(limit) : 20,
      skip,
    }),
    AttributeProductService.getCountDeleted(),
  ]);

  res.render("admin/pages/product-attribute", {
    pageTitle: "Thuộc tính sản phẩm",
    attributes: records,
    pagination,
    countDeleted,
  });
};
