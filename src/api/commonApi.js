import { serializeParamsToString } from "../utils";

export const fetchEntitiesList = (params = {}, typeEntity = "") => {
  const paramsString = serializeParamsToString(params);
  return {
    action: `/api/${typeEntity}${paramsString}`,
    options: {
      method: "GET"
    }
  };
};

export const fetchEntity = (entityId = "", typeEntity = "") => {
  return {
    action: `/api/${typeEntity}/${entityId}`,
    options: {
      method: "GET"
    }
  };
};

export const createEntity = (values = {}, typeEntity = "") => {
  return {
    action: `/api/${typeEntity}`,
    options: {
      method: "POST",
      body: JSON.stringify(values)
    }
  };
};

export const updateEntity = (entityId = "", values = {}, typeEntity = "") => {
  return {
    action: `/api/${typeEntity}/:${entityId}`,
    options: {
      method: "PUT",
      body: JSON.stringify(values)
    }
  };
};

export const deleteEntity = (entityId = "", typeEntity = "") => {
  return {
    action: `/api/${typeEntity}/:${entityId}`,
    options: {
      method: "DELETE"
    }
  };
};
