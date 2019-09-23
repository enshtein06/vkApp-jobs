import { all, put, call, takeEvery } from "redux-saga/effects";
import {
  FETCH_VK_USER_REQUEST,
  FETCH_VK_USER_START,
  FETCH_VK_USER_SUCCESS,
  FETCH_VK_USER_ERROR,
  INITIALIZE_VK_USER_DATA_REQUEST,
  INITIALIZE_VK_USER_DATA_START,
  INITIALIZE_VK_USER_DATA_SUCCESS,
  INITIALIZE_VK_USER_DATA_ERROR
} from "./actions";
import fetchApi from "../../helpers/fetchApi";
import { fetchEntity } from "../../api/commonApi";

function* fetchVkUserSaga(action) {
  const { payload } = action;
  yield put({ type: FETCH_VK_USER_START });

  try {
    const requestParams = fetchEntity(payload.vkUserId, "users");
    const fetchParams = yield fetchApi(requestParams);
    const data = yield call(fetchParams);

    yield put({
      type: FETCH_VK_USER_SUCCESS,
      payload: {
        entity: data.payload,
        vkUserId: payload.vkUserId
      }
    });
  } catch (error) {
    yield put({
      type: FETCH_VK_USER_ERROR,
      error
    });
  }
}

function* initializeVkUserSaga(action) {
  const { vkUserId } = action.payload;
  yield put({ type: INITIALIZE_VK_USER_DATA_START });

  try {
    const requestParams = fetchEntity(vkUserId, "users/initialize");
    const fetchParams = yield fetchApi(requestParams);
    const data = yield call(fetchParams);
    //call(fetch, requestParams.action, requestParams.options);

    yield put({
      type: INITIALIZE_VK_USER_DATA_SUCCESS,
      payload: {
        entity: data.payload,
        vkUserId: vkUserId
      }
    });
  } catch (error) {
    yield put({
      type: INITIALIZE_VK_USER_DATA_ERROR,
      error
    });
  }
}

export function* rootSaga() {
  yield all([
    takeEvery(FETCH_VK_USER_REQUEST, fetchVkUserSaga),
    takeEvery(INITIALIZE_VK_USER_DATA_REQUEST, initializeVkUserSaga)
  ]);
}
