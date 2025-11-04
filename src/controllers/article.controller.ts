import { Request, Response } from "express";
import CategoryBlog from "../models/category-blog.model";
import slugify from "slugify";
import paginationHelper from "../helpers/pagination.helper";
import ArticleService from "../services/article.service";
import CategoryBlogService from "../services/category-blog.service";
import { removeKeysObject } from "../utils/lodash.util";
import { STATUS_CODES } from "../utils/status-codes";

// [GET] /articles
export const article = async (req: Request, res: Response) => {
  const { keyword, page, limit } = req.query;

  const find: { deleted: boolean; status: string; search?: RegExp } = {
    deleted: false,
    status: "published",
  };

  if (keyword) {
    const keywordSlug = slugify(`${keyword}`, {
      replacement: " ",
      lower: true,
    });

    const keywordRegex = new RegExp(keywordSlug, "i");

    find.search = keywordRegex;
  }

  // Pagination
  const pagination = await paginationHelper({
    modelName: "Blog",
    find,
    limit: limit ? Number(limit) : 20,
    page: page ? Number(page) : 1,
  });

  // End Pagination
  const records = await ArticleService.getAll({
    find,
    limit: pagination.limit,
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

// [GET] /articles/:id
export const articleDetail = async (req: Request, res: Response) => {
  const { id } = req.params;

  const record: any = await ArticleService.getById(id, {
    deleted: false,
    status: "published",
  });

  res.status(STATUS_CODES.OK).json({
    code: STATUS_CODES.OK,
    status: "success",
    data: removeKeysObject(record, [
      "deleted",
      "deletedAt",
      "search",
      "__v",
      "createdAt",
      "updatedAt",
    ]),
  });
};

// [GET] /articles/categories
export const category = async (req: Request, res: Response) => {
  const { keyword, page, limit } = req.query;

  const find: { deleted: boolean; status: string; search?: RegExp } = {
    deleted: false,
    status: "active",
  };

  if (keyword) {
    const keywordSlug = slugify(`${keyword}`, {
      replacement: " ",
      lower: true,
    });

    const keywordRegex = new RegExp(keywordSlug, "i");

    find.search = keywordRegex;
  }

  // Pagination
  const pagination = await paginationHelper({
    modelName: "CategoryBlog",
    page: page ? Number(page) : 1,
    limit: limit ? Number(limit) : 20,
    find,
  });

  // End Pagination

  const records = await CategoryBlogService.getAll({
    find,
    limit: pagination.limit,
    skip: pagination.skip,
  });

  for (const record of records) {
    if (record.parent) {
      const parent = await CategoryBlog.findOne({
        _id: record.parent,
      }).lean();
      (record as any).parentName = parent ? parent.name : "";
    }
  }

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

// [GET] /articles/categories/:id
export const categoryDetail = async (req: Request, res: Response) => {
  const { id } = req.params;
  const record: any = await CategoryBlogService.getById(id, {
    deleted: false,
    status: "active",
  });

  const articles = await ArticleService.getAll({
    find: {
      category: { $in: id },
      deleted: false,
      status: "published",
    },
  });

  record.articles = articles.map((article) =>
    removeKeysObject(article, [
      "slug",
      "category",
      "status",
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
      "status",
      "slug",
      "deleted",
      "deletedAt",
      "search",
      "__v",
      "createdAt",
      "updatedAt",
    ]),
  });
};
