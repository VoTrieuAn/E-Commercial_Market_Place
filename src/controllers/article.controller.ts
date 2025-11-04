import { Request, Response } from "express";
import CategoryBlog from "../models/category-blog.model";
import slugify from "slugify";
import paginationHelper from "../helpers/pagination.helper";
import ArticleService from "../services/article.service";
import CategoryBlogService from "../services/category-blog.service";

// [GET] /admin/article
export const article = async (req: Request, res: Response) => {
  const { keyword, page } = req.query;

  const find: { deleted: boolean; search?: RegExp } = {
    deleted: false,
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
    page: page ? Number(page) : 1,
    find,
  });

  // End Pagination
  const { limit, skip } = pagination;

  const [records, countDeleted] = await Promise.all([
    ArticleService.getAll({
      find,
      limit,
      skip,
    }),
    ArticleService.getCountDeleted(),
  ]);

  res.render("admin/pages/article", {
    pageTitle: "Quản lý bài viết",
    blogs: records,
    pagination,
    countDeleted,
  });
};

// [GET] /admin/article/category
export const category = async (req: Request, res: Response) => {
  const { keyword, page } = req.query;

  const find: { deleted: boolean; search?: RegExp } = {
    deleted: false,
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
    find,
  });

  // End Pagination
  const { limit, skip } = pagination;

  const [records, countDeleted] = await Promise.all([
    CategoryBlogService.getAll({
      find,
      limit,
      skip,
    }),
    CategoryBlogService.getCountDeleted(),
  ]);

  for (const record of records) {
    if (record.parent) {
      const parent = await CategoryBlog.findOne({
        _id: record.parent,
      }).lean();
      (record as any).parentName = parent ? parent.name : "";
    }
  }

  res.render("admin/pages/article-category", {
    pageTitle: "Quản lý danh mục bài viết",
    categories: records,
    pagination,
    countDeleted,
  });
};
