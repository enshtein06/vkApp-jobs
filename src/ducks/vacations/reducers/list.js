import {
    FETCH_VACATIONS_START,
    FETCH_VACATIONS_SUCCESS,
    FETCH_VACATIONS_ERROR
} from '../actions';

export default (state = {}, action) => {
    const { type, payload } = action;

    switch(type) {
        case FETCH_VACATIONS_SUCCESS: 
            return {
                ...state
            };
        case FETCH_VACATIONS_ERROR:
            return {
                ...state
            }
        default:
            return state;
    }
}
