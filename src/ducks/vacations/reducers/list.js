import {
  FETCH_VACATIONS_START,
  FETCH_VACATIONS_SUCCESS,
  FETCH_VACATIONS_ERROR
} from "../actions";

const stateStore = {
  loading: false,
  error: null,
  entities: [],
  isAllLoaded: false
};

export default (state = stateStore, action) => {
  const { type, payload, error } = action;

  switch (type) {
    case FETCH_VACATIONS_START:
      return {
        ...state,
        loading: true,
        entities: payload.shouldClear ? [] : state.entities
      };
    case FETCH_VACATIONS_SUCCESS:
      return {
        ...state,
        loading: false,
        entities: state.entities.concat(payload.entities),
        isAllLoaded: payload.isAllLoaded
      };
    case FETCH_VACATIONS_ERROR:
      return {
        ...state,
        loading: false,
        error
      };
    default:
      return state;
  }
};
