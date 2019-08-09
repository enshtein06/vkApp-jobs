const emptyState = {
    isLoading: false,
    response: {
        count: 0,
        items: []
    }
}

const stateSelector = state => state.lookups;

export const lookupsValuesSelector = (state) => {
    return stateSelector(state).values;
}
export const lookupsLoadingSelector = (state) => {
    return stateSelector(state).isLoading;
}

const citiesStateSelector = (state) => {
    const lookupsSel = stateSelector(state);
    return lookupsSel.cities || emptyState;
}

export const citiesListSelector = (state) => {
    return citiesStateSelector(state).response.items;
}
