import {all} from 'redux-saga/effects';

import { rootSaga as lookupsSaga } from './ducks/lookups';

export default function* () {
  yield all([
    lookupsSaga()
  ]);
}