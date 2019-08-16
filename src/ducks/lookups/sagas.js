import { put, call, all, takeEvery } from "redux-saga/effects";
import connect from "@vkontakte/vkui-connect";
import {
  REQUEST_LOOKUPS_VKAPI,
  START_LOOKUPS_VKAPI,
  SUCCESS_LOOKUPS_VKAPI
} from "./actions";

function* requestLookupsVkApi(action) {
  const { method, requestId, params } = action.payload;

  yield put({ type: START_LOOKUPS_VKAPI, payload: { requestId } });

  connect.send("VKWebAppCallAPIMethod", {
    method: method,
    request_id: requestId,
    params: params
  });
}

export function* rootSaga() {
  yield all([takeEvery(REQUEST_LOOKUPS_VKAPI, requestLookupsVkApi)]);
}
