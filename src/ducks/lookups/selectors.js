import { createSelector } from 'reselect';

const emptyState = {
    isLoading: false,
    response: {
        count: 0,
        items: []
    }
}

const stateSelector = state => state.lookups;

const citiesStateSelector = (state) => {
    const lookupsSel = stateSelector(state);
    return lookupsSel.cities || emptyState;
}

export const citiesListSelector = (state) => {
    return citiesStateSelector(state).response.items;
}
