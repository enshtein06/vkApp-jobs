import { combineReducers } from 'redux';

import lookupsReducers, {moduleName as lookupsModule} from '../ducks/lookups';

export default combineReducers({
    [lookupsModule]: lookupsReducers
})
