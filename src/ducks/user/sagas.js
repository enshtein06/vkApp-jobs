import {
    all,
    put,
    call,
    takeEvery
} from 'redux-saga/effects';
import {
    FETCH_VK_USER_REQUEST,
    FETCH_VK_USER_START,
    FETCH_VK_USER_SUCCESS,
    FETCH_VK_USER_ERROR
} from './actions';
import fetchApi from '../../helpers/fetchApi';
import { fetchEntity } from '../../api/commonApi';

function* fetchVkUserSaga (action) {
    const { payload } = action;
    yield put({ type: FETCH_VK_USER_START });

    try {
        const requestParams = fetchEntity(payload.vkUserId, 'users');
        const fetchParams = yield fetchApi(requestParams)
        const data = yield call(fetchParams);

        yield put({
            FETCH_VK_USER_SUCCESS,
            payload: {
                entity: data.payload,
                vkUserId: payload.vkUserId
            }
        });
    } catch (error) {
        yield put({
            type: FETCH_VK_USER_ERROR,
            error
        })
    }
}

export function* rootSaga() {
    yield all([
        takeEvery(FETCH_VK_USER_REQUEST, fetchVkUserSaga)
    ])
}