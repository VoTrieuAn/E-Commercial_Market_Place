import { Request, Response } from "express";
import { STATUS_CODES } from "../utils/status-codes";
import CategoryProductService from "../services/category-product.service";
import slugify from "slugify";
import ProductService from "../services/product.service";
import AttributeProductService from "../services/attribute-product.service";
import paginationHelper from "../helpers/pagination.helper";
import { removeKeysObject } from "../utils/lodash.util";
import { cleanAndGroupProductVariants } from "../helpers/other.helper";
import Feedback from "../models/feedback.model";

// [GET] /products/
export const product = async (req: Request, res: Response) => {
  const { limit, page, keyword, minp, maxp, rate } = req.query;

  const find: any = {
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

  const min = parseInt(minp as string);
  const max = parseInt(maxp as string);

  if (!isNaN(min) && !isNaN(max)) {
    find.priceNew = { $gte: min, $lte: max };
  } else if (!isNaN(min)) {
    find.priceNew = { $gte: min };
  } else if (!isNaN(max)) {
    find.priceNew = { $lte: max };
  }

  if (rate) {
    const rateVal = parseInt(rate as string);
    if (!isNaN(rateVal)) {
      const rateVal = Math.floor(Number(rate));
      if (!isNaN(rateVal)) {
        // aggregate feedbacks: group by productId, compute avg -> floor -> filter >= rateVal
        const matched = await Feedback.aggregate([
          { $match: { productId: { $exists: true }, deleted: { $ne: true } } },
          { $group: { _id: "$productId", avgRating: { $avg: "$rating" } } },
          { $addFields: { avgFloor: { $floor: "$avgRating" } } },
          { $match: { avgFloor: { $gte: rateVal } } },
          { $project: { _id: 1 } },
        ]);

        const productIds = matched.map((m: any) => m._id).filter(Boolean);
        find._id = productIds.length ? { $in: productIds } : { $in: [] };
      }
    }
  }

  const pagination = await paginationHelper({
    modelName: "Product",
    find,
    limit: limit ? parseInt(limit as string) : 20,
    page: page ? parseInt(page as string) : 1,
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
