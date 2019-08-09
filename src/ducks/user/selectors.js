import { moduleName } from './config';

const stateSelector = (state) => state[moduleName];

const vkUserSelector = (state) => stateSelector(state).vkUser;
export const vkUserLoadingSelector = state => vkUserSelector(state).isLoading;
export const vkUserEntitySelector = state => vkUserSelector(state).entity;
export const vkUserErrorSelector = state => vkUserSelector(state).error;
