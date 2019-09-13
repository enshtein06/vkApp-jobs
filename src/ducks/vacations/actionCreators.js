import {
  FETCH_VACATIONS_REQUEST,
  FETCH_VACATIONS_TO_MODERATE_REQUEST,
  FETCH_VACATION_REQUEST,
  CREATE_VACATION_REQUEST,
  UPDATE_VACATION_REQUEST,
  DELETE_VACATION_REQUEST,
  FETCH_VACATIONS_FOR_VK_USER_REQUEST,
  REJECT_VACATION_REQUEST,
  ALLOW_VACATION_REQUEST
} from "./actions";
import {
  fetchEntities,
  fetchEntity,
  createEntity,
  createEntityNormalization,
  updateEntity,
  updateEntityNormalization,
  deleteEntity
} from "../../helpers/actionCreators";

export const fetchVacations = fetchEntities(FETCH_VACATIONS_REQUEST);

export const fetchVacationsToModerate = (shouldClear) => {
  return {
    type: FETCH_VACATIONS_TO_MODERATE_REQUEST,
    payload: shouldClear
  }
}

export const fetchVacation = fetchEntity(FETCH_VACATION_REQUEST);

export const createVacation = createEntity(CREATE_VACATION_REQUEST);

export const createVacationNormalizing = createEntityNormalization(
  CREATE_VACATION_REQUEST
);

export const updateVacation = updateEntity(UPDATE_VACATION_REQUEST);

export const updateVacationNormalizing = updateEntityNormalization(
  UPDATE_VACATION_REQUEST
);

export const deleteVacation = deleteEntity(DELETE_VACATION_REQUEST);

export const fetchVacationsForVkUser = vkUserId => {
  return {
    type: FETCH_VACATIONS_FOR_VK_USER_REQUEST,
    payload: { vkUserId }
  };
};

export const rejectVacation = (vacation, reason) => {
  return {
    type: REJECT_VACATION_REQUEST,
    payload: { vacation, reason }
  }
}

export const allowVacation = vacation => {
  return {
    type: ALLOW_VACATION_REQUEST,
    payload: { vacation }
  }
}
