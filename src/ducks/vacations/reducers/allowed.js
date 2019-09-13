import {
  ALLOW_VACATION_START,
  ALLOW_VACATION_SUCCESS,
  ALLOW_VACATION_ERROR
} from '../actions';

const initialState = {
  allowedEntities: [],
  isLoading: false,
  processId: null,
  error: null
};

export default (state = initialState, action) => {
  const { type, payload, error } = action;

  switch(type) {
    case ALLOW_VACATION_START:
      return {
        ...state,
        processId: payload.vacation._id,
        isLoading: true,
        error: null
      }
    case ALLOW_VACATION_SUCCESS:
      return {
        ...state,
        isLoading: false,
        allowedEntities: state.allowedEntities.concat(payload.vacationId)
      }
    case ALLOW_VACATION_ERROR:
      return {
        ...state,
        isLoading: false,
        error
      }
    default:
      return state;
  }
}
