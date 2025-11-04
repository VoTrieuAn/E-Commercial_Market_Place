import { Request } from "express";
import slugify from "slugify";
import models from "../commons/model.common";

const hasExistSlug = async (req: Request, modelName: string) => {
  const id = req.params.id;
  const query = id
    ? {
        _id: {
          $ne: id, // Tìm slug trùng nhưng không có thuộc bản ghi hiện tại cho edit
        },
        slug: req.body.slug,
      }
    : { slug: req.body.slug };
  const Model = models[modelName];

  const existSlug = await Model.findOne(query).lean();

  return existSlug;
};

const setBodySearch = (req: Request) => {
  req.body.search = slugify(req.body.name, {
    replacement: " ",
    lower: true,
  });
};

const buildTree = (metadata: any, parentId: string = "") => {
  // Bước 1: Lọc ra các danh sách mục có parent khớp với parentId hiện tại
  const currentLevelMetadata = metadata.filter(
    (data: any) => data.parent === parentId
  );
  // Bước 2: Duyệt qua từng danh mục và đệ quy để tìm các danh mục con
  const tree = currentLevelMetadata.map((data: any) => {
    const children = buildTree(metadata, data.id);
    return {
      id: data.id,
      name: data.name,
      children: children,
    };
  });

  // Bước 3: Trả về cây danh mục của cấp hiện tại
  return tree;
};

export { hasExistSlug, setBodySearch, buildTree };
