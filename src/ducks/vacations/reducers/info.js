import {
  FETCH_VACATION_START,
  FETCH_VACATION_SUCCESS,
  FETCH_VACATION_ERROR
} from "../actions";

export default (state = {}, action) => {
  const { type, payload, error } = action;

  switch (type) {
    case FETCH_VACATION_START:
      return {
        ...state,
        [payload.entityId]: {
          loading: true,
          error: null,
          entity: null
        }
      };
    case FETCH_VACATION_SUCCESS:
      return {
        ...state,
        [payload.entityId]: {
          loading: false,
          error: null,
          entity: payload.entity
        }
      };
    case FETCH_VACATION_ERROR:
      return {
        ...state,
        [payload.entityId]: {
          loading: false,
          error,
          entity: null
        }
      };
    default:
      return state;
  }
};
