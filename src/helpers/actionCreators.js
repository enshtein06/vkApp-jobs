export const fetchEntities = (action) => (params = {}) => {
    return {
        type: action,
        payload: {
            params
        }
    }
}

export const fetchEntity = (action) => (
    id, 
    params = {}
) => {
    return {
        type: action,
        payload: {
            id,
            params
        }
    }
}

export const createEntity = (action) => (values) => {
    return {
        type: action,
        payload: {
            values
        }
    }
}

export const createEntityNormalization = (action) => (
    values, 
    normalizeCallback
) => {
    return {
        type: action,
        payload: {
            values,
            normalizeCallback
        }
    }
}

export const updateEntity = (action) => (id, values) => {
    return {
        type: action,
        payload: {
            id,
            values
        }
    }
}

export const updateEntityNormalization = (action) => (
    id, 
    values, 
    normalizeCallback
) => {
    return {
        type: action,
        payload: {
            id,
            values,
            normalizeCallback
        }
    }
}

export const deleteEntity = (action) => (id) => {
    return {
        type: action,
        payload: { id }
    }
}
