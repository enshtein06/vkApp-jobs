import { all, call, takeEvery, put, select } from "redux-saga/effects";
import {
  // fetch list of vacations
  FETCH_VACATIONS_REQUEST,
  FETCH_VACATIONS_START,
  FETCH_VACATIONS_SUCCESS,
  FETCH_VACATIONS_ERROR,
  // fetch list of vacations to moderate
  FETCH_VACATIONS_TO_MODERATE_REQUEST,
  FETCH_VACATIONS_TO_MODERATE_START,
  FETCH_VACATIONS_TO_MODERATE_SUCCESS,
  FETCH_VACATIONS_TO_MODERATE_ERROR,
  // fetch one vacation
  FETCH_VACATION_REQUEST,
  FETCH_VACATION_START,
  FETCH_VACATION_SUCCESS,
  FETCH_VACATION_ERROR,
  // create one vacation
  CREATE_VACATION_REQUEST,
  CREATE_VACATION_START,
  CREATE_VACATION_SUCCESS,
  CREATE_VACATION_ERROR,
  // update one vacation
  UPDATE_VACATION_REQUEST,
  UPDATE_VACATION_START,
  UPDATE_VACATION_SUCCESS,
  UPDATE_VACATION_ERROR,
  // delete one vacation
  DELETE_VACATION_REQUEST,
  DELETE_VACATION_START,
  DELETE_VACATION_SUCCESS,
  DELETE_VACATION_ERROR,
  // fetch list for vkUserId
  FETCH_VACATIONS_FOR_VK_USER_REQUEST,
  FETCH_VACATIONS_FOR_VK_USER_START,
  FETCH_VACATIONS_FOR_VK_USER_SUCCESS,
  FETCH_VACATIONS_FOR_VK_USER_ERROR
} from "./actions";
import {
  fetchEntitiesList,
  fetchEntity,
  createEntity,
  updateEntity,
  deleteEntity,
  fetchCommomApi
} from "../../api/commonApi";
import { moduleName, entityType } from "./config";
import fetchApi from "../../helpers/fetchApi";

import { vkUserIdSelector } from "../user";
import { lookupsValuesSelector } from "../lookups";

function* fetchVacationsToModerateSaga (action) {
  yield put({ type: FETCH_VACATIONS_TO_MODERATE_START });
  try {
    const requestParams = fetchEntitiesList({
      isAllowed: false
    }, entityType);
    const fetchParams = yield fetchApi(requestParams);
    const data = yield call(fetchParams);

    yield put({
      type: FETCH_VACATIONS_TO_MODERATE_SUCCESS,
      payload: {
        ...action.payload,
        ...data.payload,
        //entities: data.payload.entities,
        //isAllLoaded: data.payload.isAllLoaded
      }
    });
  } catch (error) {
    yield put({
      type: FETCH_VACATIONS_TO_MODERATE_ERROR,
      error
    });
  }
}

export function* fetchVacationsSaga(
  action = {
    payload: {
      params: {}
    }
  }
) {
  const { payload } = action;
  yield put({
    type: FETCH_VACATIONS_START,
    payload: action.payload
  });
  try {
    const requestParams = fetchEntitiesList(payload.params, entityType);
    const fetchParams = yield fetchApi(requestParams);
    const data = yield call(fetchParams);

    yield put({
      type: FETCH_VACATIONS_SUCCESS,
      moduleName,
      payload: {
        ...data.payload,
        //entities: data.payload.entities,
        //isAllLoaded: data.payload.isAllLoaded
      }
    });
  } catch (error) {
    yield put({
      type: FETCH_VACATIONS_ERROR,
      moduleName,
      error
    });
  }
}

export function* fetchVacationSaga(
  action = {
    type: "",
    payload: {
      entityId: ""
    }
  }
) {
  const { entityId } = action.payload;
  yield put({
    type: FETCH_VACATION_START,
    moduleName
  });
  try {
    const requestParams = fetchEntity(entityId, entityType);
    const fetchParams = yield fetchApi(requestParams);
    const data = yield call(fetchParams);

    yield put({
      type: FETCH_VACATION_SUCCESS,
      moduleName,
      payload: {
        entity: data.payload
      }
    });
  } catch (error) {
    yield put({
      type: FETCH_VACATION_ERROR,
      moduleName,
      error
    });
  }
}

export function* createVacationSaga(
  action = {
    type: "",
    payload: {
      values: {}
    }
  }
) {
  const { values } = action.payload;
  yield put({ type: CREATE_VACATION_START });

  try {
    const normalizedValues = {
      ...values
    };
    if (
      values.contact_name &&
      Array.isArray(values.contact_name) &&
      values.contact_name.length
    ) {
      const contacts = [];
      values.contact_name.map((name, index) => {
        contacts.push({
          name: name,
          numbers:
            (values.contact_numbers &&
              Array.isArray(values.contact_numbers) &&
              values.contact_numbers[index]) ||
            null,
          email:
            (values.contact_email &&
              Array.isArray(values.contact_email) &&
              values.contact_email[index]) ||
            null
        });
      });
      delete normalizedValues.contact_name;
      delete normalizedValues.contact_numbers;
      delete normalizedValues.contact_email;
      normalizedValues.contacts = contacts;
    }
    const lookups = yield select(lookupsValuesSelector);
    if (
      values.expirience &&
      lookups.expirience &&
      Array.isArray(lookups.expirience)
    ) {
      normalizedValues.expirience = lookups.expirience.find(
        exp => exp.id === +values.expirience
      );
    }
    if (
      values.employmentType &&
      lookups.employmentType &&
      Array.isArray(lookups.employmentType)
    ) {
      normalizedValues.employmentType = lookups.employmentType.find(
        exp => exp.id === +values.employmentType
      );
    }
    if (
      values.schedule &&
      lookups.schedule &&
      Array.isArray(lookups.schedule)
    ) {
      normalizedValues.schedule = lookups.schedule.find(
        exp => exp.id === +values.schedule
      );
    }
    const requestParams = createEntity(normalizedValues, entityType);
    const fetchParams = yield fetchApi(requestParams);
    const data = yield call(fetchParams);

    yield put({
      type: CREATE_VACATION_SUCCESS,
      payload: {
        entity: data.payload
      }
    });

    const vkUserId = yield select(vkUserIdSelector);
    yield put({
      type: FETCH_VACATIONS_FOR_VK_USER_REQUEST,
      payload: { vkUserId }
    });
  } catch (error) {
    yield put({
      type: CREATE_VACATION_ERROR,
      error
    });
  }
}

export function* updateEntitySaga(
  action = {
    type: "",
    payload: {
      values: {},
      entityId: ""
    }
  }
) {
  const { values, entityId } = action.payload;
  yield put({ type: UPDATE_VACATION_START });

  try {
    const requestParams = updateEntity(values, entityId, entityType);
    const fetchParams = yield fetchApi(requestParams);
    const data = yield call(fetchParams);

    yield put({
      type: UPDATE_VACATION_SUCCESS,
      payload: {
        entityId,
        entity: data.payload
      }
    });
  } catch (error) {
    yield put({
      type: UPDATE_VACATION_ERROR,
      error,
      payload: {
        entityId
      }
    });
  }
}

export function* deleteEntitySaga(
  action = {
    type: "",
    payload: {
      entityId: ""
    }
  }
) {
  const { entityId } = action.payload;
  yield put({ type: DELETE_VACATION_START });

  try {
    const requestParams = deleteEntity(entityType);
    const fetchParams = yield fetchApi(requestParams);
    yield call(fetchParams);

    yield put({
      type: DELETE_VACATION_SUCCESS,
      payload: {
        entityId
      }
    });
  } catch (error) {
    yield put({
      type: DELETE_VACATION_ERROR,
      error,
      payload: {
        entityId
      }
    });
  }
}

export function* fetchEntitiesListForVkUserSaga(action) {
  const { vkUserId } = action.payload;
  yield put({ type: FETCH_VACATIONS_FOR_VK_USER_START });

  try {
    const requestParams = fetchEntity(vkUserId, "vacations/vkUser");
    const fetchParams = yield fetchApi(requestParams);
    const data = yield call(fetchParams);

    yield put({
      type: FETCH_VACATIONS_FOR_VK_USER_SUCCESS,
      payload: {
        entities: data.payload
      }
    });
  } catch (error) {
    yield put({
      type: FETCH_VACATIONS_FOR_VK_USER_ERROR,
      error
    });
  }
}

export function* rootSaga() {
  yield all([
    takeEvery(FETCH_VACATIONS_REQUEST, fetchVacationsSaga),
    takeEvery(FETCH_VACATION_REQUEST, fetchVacationSaga),
    takeEvery(CREATE_VACATION_REQUEST, createVacationSaga),
    takeEvery(UPDATE_VACATION_REQUEST, updateEntitySaga),
    takeEvery(DELETE_VACATION_REQUEST, deleteEntitySaga),
    takeEvery(
      FETCH_VACATIONS_FOR_VK_USER_REQUEST,
      fetchEntitiesListForVkUserSaga
    ),
    takeEvery(FETCH_VACATIONS_TO_MODERATE_REQUEST, fetchVacationsToModerateSaga)
  ]);
}
