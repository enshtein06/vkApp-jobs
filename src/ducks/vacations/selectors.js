import { createSelector } from "reselect";
import { moduleName } from "./config";

const stateSelector = state => state[moduleName];

const methodsSelector = state => stateSelector(state).methods;
const infoSelector = state => stateSelector(state).info;
const listSelector = state => stateSelector(state).list;
const vkUserListSelector = state => stateSelector(state).vkUserList;

// @desc    vkUserList Selector
export const vkUserListIsLoadedSelector = state =>
  vkUserListSelector(state).isLoaded;
export const vkUserListIsLoadingSelector = state =>
  vkUserListSelector(state).isLoading;
export const vkUserListEntitiesSelector = state =>
  vkUserListSelector(state).entities;
export const vkUserListErrorSelector = state => vkUserListSelector(state).error;

// @desc    info Selector
export const infoLoadingSelector = state => infoSelector(state).loading;
export const infoErrorSelector = state => infoSelector(state).error;
export const infoEntitiesSelector = state => infoSelector(state).entities;

// @desc    list Selector
export const listLoadingSelector = state => listSelector(state).loading;
export const listErrorSelector = state => listSelector(state).error;
export const listEntitiesSelector = state => listSelector(state).entities;

// @desc    create methods
export const createMethodSelector = state => {
  return methodsSelector(state).create;
};
export const createMethodLoadingSelector = state => {
  return createMethodSelector(state).loading;
};
export const createMethodisCreatedSelector = state => {
  return createMethodSelector(state).isCreated;
};
export const createMethodEntitySelector = state => {
  return createMethodSelector(state).entity;
};
export const createMethodErrorSelector = state => {
  return createMethodSelector(state).error;
};

// @desc    update methods
export const updateMethodSelector = state => {
  return methodsSelector(state).update;
};
export const updateMethodLoadingSelector = state => {
  return updateMethodSelector(state).loading;
};
export const updateMethodEntitySelector = state => {
  return updateMethodSelector(state).entity;
};
export const updateMethodErrorSelector = state => {
  return updateMethodSelector(state).error;
};

// @desc delete methods
export const deleteMethodSelector = state => {
  return methodsSelector(state).delete;
};
export const deleteMethodLoadingSelector = state => {
  return deleteMethodSelector(state).loading;
};
export const deleteMethodEntitySelector = state => {
  return deleteMethodSelector(state).entity;
};
export const deleteMethodErrorSelector = state => {
  return deleteMethodSelector(state).error;
};
