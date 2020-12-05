import { combineReducers } from 'redux';

import { SET_FILTER, SET_FILMS, SET_PROFILE, SET_QUEUE } from '../actions/actions';

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

function userProfile(state = [], action) {
     switch (action.type) {
          case SET_PROFILE:
               return action.value;
               default: 
               return state;
     }
}

function userQueue(state = [], action) {
     switch (action.type) {
          case SET_QUEUE:
               return action.value;
               default:
                    return state;
     }
}

const filmsApp = combineReducers({
     visibilityFilter,
     films,
     userProfile,
     userQueue
});

export default filmsApp;