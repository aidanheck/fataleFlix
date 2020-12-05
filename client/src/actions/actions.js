export const SET_FILMS = 'SET_FILMS';
export const SET_FILTER = 'SET_FILTER';
export const SET_PROFILE = 'SET_PROFILE';
export const SET_QUEUE = 'SET_QUEUE';

export function setFilms(value) {
     return { type: SET_FILMS, value };
}

export function setFilter(value) {
     return { type: SET_FILTER, value };
}

export function setProfile(value) {
     return { type: SET_PROFILE, value };
}

export function setQUEUE(value) {
     return { type: SET_QUEUE, value };
}