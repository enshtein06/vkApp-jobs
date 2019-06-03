import { SUCCESS_LOOKUPS_VKAPI, START_LOOKUPS_VKAPI } from '../actions';

const startState = {};

export default (state = startState, action) => {
    const { type, payload } = action;

    switch(type) {
        case START_LOOKUPS_VKAPI:
            return {
                ...state, 
                [payload.requestId]: {
                    isLoading: true,
                    response: {
                        count: 0,
                        items: []
                    }
                }
            };
        case SUCCESS_LOOKUPS_VKAPI:
            return {
                ...state,
                [payload.requestId]: {
                    isLoading: false,
                    response: payload.result
                }
            }
        default:
            return state;
    }
}
