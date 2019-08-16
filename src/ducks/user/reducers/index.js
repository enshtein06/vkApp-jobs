import { combineReducers } from 'redux';

import vkUser from './vkUser';
import initialVkUser from './initialVkUser';

export default combineReducers({
    vkUser,
    initialVkUser
});
