import {all} from 'redux-saga/effects';

import { rootSaga as lookupsSaga } from './ducks/lookups';
import { rootSaga as vacationsSaga } from './ducks/vacations';
import { rootSaga as userSaga } from './ducks/user';

export default function* () {
  yield all([
    lookupsSaga(),
    vacationsSaga(),
    userSaga()
  ]);
}