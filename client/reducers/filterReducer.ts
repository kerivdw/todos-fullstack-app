import { FilterAction } from "../actions/filter";

const initialState = {
  tasks: [],
  filter: "all"
};

const filterReducer = (state = initialState, action : FilterAction) => {
  switch (action.type) {
    case "SET_FILTER":
      return {
        ...state,
        filter: action.payload
      };
    default:
      return state;
  }
};

export default filterReducer;