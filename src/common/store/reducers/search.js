import createReducer from '../lib/createReducer';
import * as types from '../actions/types';

const initialSelectedState = { index: 0, data: {} };
const initialTextSearchState = { results: [], isInProgress: false };

export const selectedResult = createReducer(
  initialSelectedState,
  {
    [types.ON_SET_SELECTED_FILTERS_SUCCESS](state, action) {
      return {
        ...state,
        ...action.value,
      };

    },
    [types.ON_CLEAR_SELECTED_FILTERS](state, action) {
      return { index: 0, data: {} };
    },
  },
);

export const textSearchResults = createReducer(
  initialTextSearchState,
  {
    [types.ON_SET_TEXT_SEARCH_RESULTS_SUCCESS](state, action) {
      return {
        ...state,
        ...action.value,
      };
    },
    [types.ON_SET_TEXT_SEARCH_RESULTS_FAILED](state, action) {
      return {
        ...state,
        error: action.value,
      };
    },
    [types.ON_SET_TEXT_SEARCH_RESULTS_STATUS](state, action) {
      return {
        ...state,
        ...action.value,
      };
    },
    [types.ON_CLEAR_TEXT_SEARCH_RESULTS](state, action) {
      return { results: [], isInProgress: false };
    },
  },
);
