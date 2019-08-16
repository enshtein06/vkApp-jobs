import { combineReducers } from "redux";

import lookupsReducers, { moduleName as lookupsModule } from "../ducks/lookups";
import vacationsReducers, {
  moduleName as vacationsModule
} from "../ducks/vacations";
import userReducers, { moduleName as userModule } from "../ducks/user";

export default combineReducers({
  [lookupsModule]: lookupsReducers,
  [vacationsModule]: vacationsReducers,
  [userModule]: userReducers
});
