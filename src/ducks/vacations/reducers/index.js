import { combineReducers } from "redux";

import info from "./info";
import list from "./list";
import vkUserList from "./vkUserList";
import listForModerate from './listForModerate';

import methods from "./methods";
import rejected from './rejected';
import allowed from './allowed';

export default combineReducers({
  info,
  list,
  methods,
  vkUserList,
  listForModerate,
  rejected,
  allowed
});
