import { combineReducers } from "redux";

import info from "./info";
import list from "./list";
import vkUserList from "./vkUserList";

import methods from "./methods";

export default combineReducers({
  info,
  list,
  methods,
  vkUserList
});
