import * as actionType from "../actions/actionType";

export default (state = [], action) => {
  switch (action.type) {
    case actionType.ADD_CATEGORY:
      return [...state, Object.assign({}, action.category)];
    default:
      return state;
  }
};
