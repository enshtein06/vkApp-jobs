import { moduleName } from "./config";

const stateSelector = state => state[moduleName];

const vkUserSelector = state => stateSelector(state).vkUser;
export const vkUserLoadingSelector = state => vkUserSelector(state).isLoading;
export const vkUserEntitySelector = state => vkUserSelector(state).entity;
export const vkUserErrorSelector = state => vkUserSelector(state).error;

const initialVkUser = state => stateSelector(state).initialVkUser;
export const initialVkUserLoadingSelector = state =>
  initialVkUser(state).isLoading;
export const initialVkUserLoadedSelector = state =>
  initialVkUser(state).isLoaded;
export const initialVkUserEntitySelector = state => initialVkUser(state).entity;
export const initialVkUserErrorSelector = state => initialVkUser(state).error;

export const vkUserIdSelector = state =>
  initialVkUserEntitySelector(state).vkUserId;
