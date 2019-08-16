import {
  CREATE_VACATION_START,
  CREATE_VACATION_SUCCESS,
  CREATE_VACATION_ERROR,
  UPDATE_VACATION_START,
  UPDATE_VACATION_SUCCESS,
  UPDATE_VACATION_ERROR,
  DELETE_VACATION_START,
  DELETE_VACATION_SUCCESS,
  DELETE_VACATION_ERROR
} from "../actions";

const stateStore = {
  create: {
    loading: false,
    isCreated: false,
    error: null,
    entity: null
  },
  update: {
    loading: false,
    error: null,
    entity: null
  },
  delete: {
    loading: false,
    error: null,
    entity: null
  }
};

const methodsReducers = (state = stateStore, action) => {
  const { type, payload, error } = action;
  switch (type) {
    case CREATE_VACATION_START:
      return {
        ...state,
        create: {
          ...state.create,
          isCreated: false,
          loading: true,
          error: null,
          entity: null
        }
      };
    case CREATE_VACATION_SUCCESS:
      return {
        ...state,
        create: {
          ...state.create,
          isCreated: true,
          loading: false,
          error: null,
          entity: payload.entity
        }
      };
    case CREATE_VACATION_ERROR:
      return {
        ...state,
        create: {
          ...state.create,
          loading: false,
          error,
          entity: null
        }
      };
    case UPDATE_VACATION_START:
      return {
        ...state,
        update: {
          ...state.update,
          loading: true,
          error: null,
          entity: null
        }
      };
    case UPDATE_VACATION_SUCCESS:
      return {
        ...state,
        update: {
          ...state.update,
          loading: false,
          error: null,
          entity: payload.entity
        }
      };
    case UPDATE_VACATION_ERROR:
      return {
        ...state,
        update: {
          ...state.update,
          loading: false,
          error,
          entity: null
        }
      };
    case DELETE_VACATION_START:
      return {
        ...state,
        delete: {
          ...state.delete,
          loading: true,
          error: null,
          entity: null
        }
      };
    case DELETE_VACATION_SUCCESS:
      return {
        ...state,
        delete: {
          ...state.delete,
          loading: false,
          error: null,
          entity: payload.entity
        }
      };
    case DELETE_VACATION_ERROR:
      return {
        ...state,
        delete: {
          ...state.delete,
          loading: false,
          error,
          entity: null
        }
      };
    default:
      return state;
  }
};

export default methodsReducers;
