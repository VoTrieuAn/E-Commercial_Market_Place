import models from "../commons/model.common";

const paginationHelper = async ({
  limit = 20,
  page = 1,
  modelName,
  find = {},
}: {
  limit?: number;
  page?: number;
  modelName: string;
  find?: object;
}) => {
  const totalRecords = await models[modelName].countDocuments(find);
  const totalPages = Math.ceil(totalRecords / limit);

  const skip = (page - 1) * limit;

  return {
    limit,
    totalRecords,
    totalPages,
    skip,
  };
};

export default paginationHelper;
