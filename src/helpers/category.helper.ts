export function buildCategoryTree(categories: any, parentId: string = "") {
  // Bước 1: Lọc ra các danh sách mục có parent khớp với parentId hiện tại
  const currentLevelCategories = categories.filter(
    (category: any) => category.parent === parentId
  );

  // Bước 2: Duyệt qua từng danh mục và đệ quy để tìm các danh mục con
  const tree = currentLevelCategories.map((category: any) => {
    const children = buildCategoryTree(categories, category._id.toString());

    return {
      _id: category._id,
      name: category.name,
      children: children,
    };
  });

  // Bước 3: Trả về cây danh mục của cấp hiện tại
  return tree;
}
