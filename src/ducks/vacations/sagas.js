import { all, call, takeEvery, put } from 'redux-saga/effects';
import {
    // fetch list of vacations
    FETCH_VACATIONS_REQUEST,
    FETCH_VACATIONS_START,
    FETCH_VACATIONS_SUCCESS,
    FETCH_VACATIONS_ERROR,
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
    DELETE_VACATION_ERROR
} from './actions';
import {
    fetchEntitiesList,
    fetchEntity,
    createEntity,
    updateEntity,
    deleteEntity
} from '../../api/commonApi';
import { moduleName, entityType } from './config';
import fetchApi from '../../helpers/fetchApi';

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
        const fetchParams = yield fetchApi(requestParams)
        const data = yield call(fetchParams);

        yield put({
            type: FETCH_VACATIONS_SUCCESS,
            moduleName,
            payload: {
                entities: data.payload
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
        type: '',
        payload: {
            entityId: ''
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
        const fetchParams = yield fetchApi(requestParams)
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
        type: '',
        payload: {
            values: {}
        }
    }
) {
    const { values } = action.payload;
    yield put({ type: CREATE_VACATION_START });

    try {
        const requestParams = createEntity(values, entityType);
        const fetchParams = yield fetchApi(requestParams);
        const data = yield call(fetchParams);

        yield put({
            type: CREATE_VACATION_SUCCESS,
            payload: {
                entity: data.payload
            }
        });
    } catch (error) {
        yield put({
            type: CREATE_VACATION_ERROR,
            error
        })
    }
}

export function* updateEntitySaga (
    action = {
        type: '',
        payload: {
            values: {},
            entityId: ''
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
        type: '',
        payload: {
            entityId: ''
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

export function* rootSaga() {
    yield all([
        takeEvery(FETCH_VACATIONS_REQUEST, fetchVacationsSaga),
        takeEvery(FETCH_VACATION_REQUEST, fetchVacationSaga),
        takeEvery(CREATE_VACATION_REQUEST, createVacationSaga),
        takeEvery(UPDATE_VACATION_REQUEST, updateEntitySaga),
        takeEvery(DELETE_VACATION_REQUEST, deleteEntitySaga)
    ])
}