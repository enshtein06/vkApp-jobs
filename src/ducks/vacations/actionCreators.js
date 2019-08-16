import {
  FETCH_VACATIONS_REQUEST,
  FETCH_VACATION_REQUEST,
  CREATE_VACATION_REQUEST,
  UPDATE_VACATION_REQUEST,
  DELETE_VACATION_REQUEST,
  FETCH_VACATIONS_FOR_VK_USER_REQUEST
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
