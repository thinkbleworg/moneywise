import * as actionType from "./actionType";

export const getCategories = (category) => {
  return {
    type: actionType.GET_CATEGORIES,
    category: category,
  };
};
