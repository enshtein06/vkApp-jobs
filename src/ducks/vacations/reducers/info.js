import {
    FETCH_VACATION_START,
    FETCH_VACATION_SUCCESS,
    FETCH_VACATION_ERROR
} from '../actions';

export default (state = {}, action) => {
    const { type, payload } = action;

    switch(type) {
        case FETCH_VACATION_SUCCESS: 
            return {
                ...state
            };
        case FETCH_VACATION_ERROR:
            return {
                ...state
            }
        default:
            return state;
    }
}
