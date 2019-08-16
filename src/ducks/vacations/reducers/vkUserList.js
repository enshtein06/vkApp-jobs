import {
    FETCH_VACATIONS_FOR_VK_USER_START,
    FETCH_VACATIONS_FOR_VK_USER_SUCCESS,
    FETCH_VACATIONS_FOR_VK_USER_ERROR
} from '../actions';

const stateInitial = {
    isLoading: false,
    isLoaded: false,
    entities: [],
    error: null
}

export default (state = stateInitial, action) => {
    const { type, payload, error } = action;

    switch (type) {
        case FETCH_VACATIONS_FOR_VK_USER_START:
            return {
                ...state,
                isLoaded: false,
                isLoading: true,
                error: null
            }
        case FETCH_VACATIONS_FOR_VK_USER_SUCCESS:
            return {
                ...state,
                isLoaded: true,
                isLoading: false,
                entities: payload.entities,
                error: null
            }
        case FETCH_VACATIONS_FOR_VK_USER_ERROR:
            return {
                ...state,
                isLoaded: true,
                isLoading: false,
                error
            }
        default:
            return state;
    }
}
