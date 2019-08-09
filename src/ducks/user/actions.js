import { prefix } from './config';

// DATA that will return 
// is main user data
// if he can create new vacation
// and if he has already created smth
// he can change them
export const FETCH_VK_USER_REQUEST = `${prefix}/FETCH_VK_USER_REQUEST`;
export const FETCH_VK_USER_START = `${prefix}/FETCH_VK_USER_START`;
export const FETCH_VK_USER_SUCCESS = `${prefix}/FETCH_VK_USER_SUCCESS`;
export const FETCH_VK_USER_ERROR = `${prefix}/FETCH_VK_USER_ERROR`;
// this application are not going to collect own user data
