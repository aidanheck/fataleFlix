import { combineReducers } from 'redux';

import {
  SET_FILTER, SET_FILMS, SET_USER, SET_FILM,
} from '../actions/actions';

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

function setUser(state = [], action) {
  switch (action.type) {
    case SET_USER:
      return action.value;
    default:
      return state;
  }
}

function setFilm(state = '', action) {
  switch (action.type) {
    case SET_FILM:
      return action.value;
    default:
      return state;
  }
}

const filmsApp = combineReducers({
  visibilityFilter,
  films,
  setUser,
  setFilm,
});

export default filmsApp;
