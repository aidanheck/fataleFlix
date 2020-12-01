import { combineReducers } from 'redux';

import { SET_FILTER, SET_FILMS } from '../actions/actions';

function visibilityFilter(state = '', action) {
     switch (action.type) {
          case SET_FILTER:
               return action.value;
               default:
                    return state;
     }
}

function films(state = [], action) {
     switch (action.type) {
          case SET_FILMS:
               return action.value;
               default:
                    return state;
     }
}

function filmsApp(state = {}, action) {
     return {
          visibilityFilter: visibilityFilter(state.visibilityFilter, action),
          films: films(state.films, action)
     }
}

export default filmsApp;