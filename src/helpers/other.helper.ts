import { Request } from "express";
import slugify from "slugify";
import models from "../commons/model.common";
import { removeKeysObject } from "../utils/lodash.util";

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

/**
 * Convert a raw product record (with variants containing attributeValue arrays)
 * into a frontend-friendly shape:
 * - attributes: grouped by attrId with unique options
 * - variants: simplified list with attribute map and prices
 */
const cleanAndGroupProductVariants = (record: any) => {
  // base fields we keep
  const base = removeKeysObject(record, [
    "deleted",
    "deletedAt",
    "search",
    "__v",
    "createdAt",
    "updatedAt",
  ]);

  const attrMap = new Map<
    string,
    {
      attrId: string;
      attrType: string;
      options: Array<{ value: string; label: string }>;
    }
  >();

  const variants = (record.variants || []).map((v: any) => {
    const optionMap: Record<string, any> = {};
    (v.attributeValue || []).forEach((av: any) => {
      // collect option for attribute
      if (!attrMap.has(av.attrId)) {
        attrMap.set(av.attrId, {
          attrId: av.attrId,
          attrType: av.attrType,
          options: [],
        });
      }
      const group = attrMap.get(av.attrId)!;
      // avoid duplicate option values
      if (!group.options.find((o) => o.value === av.value)) {
        group.options.push({ value: av.value, label: av.label });
      }

      // build variant option map (attrId -> value)
      optionMap[av.attrId] = {
        value: av.value,
        label: av.label,
        attrType: av.attrType,
      };
    });

    return {
      status: v.status,
      priceOld: v.priceOld,
      priceNew: v.priceNew,
      options: optionMap,
    };
  });

  // turn attrMap into array, keep order deterministic by insertion
  const attributes = Array.from(attrMap.values()).map((g) => ({
    attrId: g.attrId,
    type: g.attrType,
    options: g.options,
  }));

  return {
    ...base,
    attributes,
    variants,
  };
};

export { hasExistSlug, setBodySearch, buildTree, cleanAndGroupProductVariants };
