import {
  FETCH_VK_USER_REQUEST,
  INITIALIZE_VK_USER_DATA_REQUEST
} from "./actions";

export const fetchVkUser = vkUserId => {
  return {
    type: FETCH_VK_USER_REQUEST,
    payload: { vkUserId }
  };
};

export const initializeVkUserData = vkUserId => {
  return {
    type: INITIALIZE_VK_USER_DATA_REQUEST,
    payload: { vkUserId }
  };
};
