import {
    FETCH_VK_USER_START,
    FETCH_VK_USER_SUCCESS,
    FETCH_VK_USER_ERROR
} from '../actions';

const mainState = {
    isLoading: false,
    error: null,
    entity: null,
    isLoaded: false
};

export default (state = mainState, action) => {
    const { type, payload, error } = action;
    switch (type) {
        case FETCH_VK_USER_START:
            return {
                ...state,
                isLoading: true,
                error: null,
                entity: null,
                isLoaded: false
            }
        case FETCH_VK_USER_SUCCESS:
            return {
                ...state,
                isLoading: false,
                error: null,
                entity: payload.entity,
                isLoaded: true
            }
        case FETCH_VK_USER_ERROR:
            return {
                ...state,
                isLoading: false,
                error: error,
                entity: null,
                isLoaded: true
            }
        default:
            return state;
    }
}