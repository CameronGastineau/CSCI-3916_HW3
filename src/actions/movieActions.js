import actionTypes from '../constants/actionTypes';
import runtimeEnv from '@mars/heroku-js-runtime-env';

function moviesFetched(movies) {
    return {
        type: actionTypes.FETCH_MOVIES,
        movies: movies
    }
}

function movieFetched(movie) {
    return {
        type: actionTypes.FETCH_MOVIE,
        selectedMovie: movie
    }
}

function movieSet(movie) {
    return {
        type: actionTypes.SET_MOVIE,
        selectedMovie: movie
    }
}

export function getMovies() {
    const env = runtimeEnv();

    return dispatch => {
        return fetch(`${env.REACT_APP_API_URL}/movies`, {
            method: 'GET',
            headers: {
                'Authorization': localStorage.getItem('token'),
                'Content-Type': 'application/json'
            },
            mode: 'cors'})
            .then((response) => {
                if (!response.ok) {
                    throw Error(response.statusText);
                }
                return response.json();
            })
            .then((res) => {
                dispatch(moviesFetched(res));
            })
            .catch((e) => {
                console.log(e)
            });
    }
}

export function getMovie(id) {
    const env = runtimeEnv();

    return dispatch => {
        return fetch(`${env.REACT_APP_API_URL}/movies/${id}`, {
            method: 'GET',
            headers: {
                'Authorization': localStorage.getItem('token'),
                'Content-Type': 'application/json'
            },
            mode: 'cors'})
            .then((response) => {
                if (!response.ok) {
                    throw Error(response.statusText);
                }
                return response.json();
            })
            .then((res) => {
                dispatch(movieFetched(res));
            })
            .catch((e) => console.log(e));
    }
}

export function setMovie(movie) {
    return dispatch => {
        dispatch(movieSet(movie));
    }
}