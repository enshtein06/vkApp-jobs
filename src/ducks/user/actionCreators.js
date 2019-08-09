import { FETCH_VK_USER_REQUEST } from './actions';

export const fetchVkUser = (vkUserId) => {
    return {
        type: FETCH_VK_USER_REQUEST,
        payload: { vkUserId }
    }
}
