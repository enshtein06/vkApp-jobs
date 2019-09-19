import { serializeParamsToString } from "../utils";
import { serverUrl } from '../config';

export const fetchCommomApi = ( url = '' ) => {
  return {
    action: `${serverUrl}${url}`,
    options: {
      method: 'GET'
    }
  }
}

export const fetchEntitiesList = (params = {}, typeEntity = "") => {
  const paramsString = serializeParamsToString(params);
  return {
    action: `${serverUrl}${typeEntity}${paramsString}`,
    options: {
      method: "GET"
    }
  };
};

export const fetchEntity = (entityId = "", typeEntity = "") => {
  return {
    action: `${serverUrl}${typeEntity}/${entityId}`,
    options: {
      method: "GET"
    }
  };
};

export const createEntity = (values = {}, typeEntity = "") => {
  return {
    action: `${serverUrl}${typeEntity}`,
    options: {
      method: "POST",
      body: JSON.stringify(values)
    }
  };
};

export const updateEntity = (entityId = "", values = {}, typeEntity = "") => {
  return {
    action: `${serverUrl}${typeEntity}/${entityId}`,
    options: {
      method: "PUT",
      body: JSON.stringify(values)
    }
  };
};

export const deleteEntity = (entityId = "", typeEntity = "") => {
  return {
    action: `${serverUrl}${typeEntity}/${entityId}`,
    options: {
      method: "DELETE"
    }
  };
};
