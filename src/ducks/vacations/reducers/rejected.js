import {
  REJECT_VACATION_START,
  REJECT_VACATION_SUCCESS,
  REJECT_VACATION_ERROR
} from '../actions';

const initialState = {
  rejectedEntities: [],
  isLoading: false,
  processId: null,
  error: null
};

export default (state = initialState, action) => {
  const { type, payload, error } = action;

  switch(type) {
    case REJECT_VACATION_START:
      return {
        ...state,
        processId: payload.vacation._id,
        isLoading: true,
        error: null
      }
    case REJECT_VACATION_SUCCESS:
      return {
        ...state,
        isLoading: false,
        rejectedEntities: state.rejectedEntities.concat(payload.vacationId)
      }
    case REJECT_VACATION_ERROR:
      return {
        ...state,
        isLoading: false,
        error
      }
    default:
      return state;
  }
}
