import {
    REQUEST_LOOKUPS_VKAPI,
    SUCCESS_LOOKUPS_VKAPI
} from './actions';

export const requestLookupsVkApi = (method = '', requestId = '', params = {}) => {
    return {
        type: REQUEST_LOOKUPS_VKAPI,
        payload: {
            method,
            requestId,
            params
        }
    }
}

export const putLookupsVkApiToStore = (requestId, result) => {
    return {
        type: SUCCESS_LOOKUPS_VKAPI,
        payload: { requestId, result }
    }
}
