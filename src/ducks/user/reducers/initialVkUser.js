import {
  INITIALIZE_VK_USER_DATA_START,
  INITIALIZE_VK_USER_DATA_SUCCESS,
  INITIALIZE_VK_USER_DATA_ERROR
} from "../actions";

const initialState = {
  isLoaded: false,
  isLoading: false,
  error: null,
  entity: null
};

export default (state = initialState, action) => {
  const { type, payload, error } = action;

  switch (type) {
    case INITIALIZE_VK_USER_DATA_START:
      return {
        ...state,
        isLoaded: false,
        isLoading: true,
        error: null,
        entity: null
      };
    case INITIALIZE_VK_USER_DATA_SUCCESS:
      return {
        ...state,
        isLoaded: true,
        isLoading: false,
        error: null,
        entity: payload.entity
      };
    case INITIALIZE_VK_USER_DATA_ERROR:
      return {
        ...state,
        isLoaded: true,
        isLoading: false,
        error: error,
        entity: null
      };
    default:
      return state;
  }
};
