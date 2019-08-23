import {
  FETCH_VACATIONS_TO_MODERATE_START,
  FETCH_VACATIONS_TO_MODERATE_SUCCESS,
  FETCH_VACATIONS_TO_MODERATE_ERROR
} from '../actions';

const initState = {
  loading: false,
  error: null,
  entities: [],
  isAllLoaded: false
}

export default (state = initState, action) => {
  const { type, payload, error } = action;
  switch(type) {
    case FETCH_VACATIONS_TO_MODERATE_START:
      return {
        ...state,
        error: null,
        loading: true
      }
    case FETCH_VACATIONS_TO_MODERATE_SUCCESS:
      return {
        ...state,
        error: null,
        loading: false,
        entities: payload.shouldClear ? payload.entities : state.entities.concat(payload.entities),
        isAllLoaded: payload.isAllLoaded
      }
    case FETCH_VACATIONS_TO_MODERATE_ERROR:
      return {
        ...state,
        error,
        loading: false
      }
    default:
      return state;
  }
}
