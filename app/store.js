import { createStore, applyMiddleware } from 'redux';
// import rootReducer from './reducers';
import loggingMiddleware from 'redux-logger'; // https://github.com/evgenyrodionov/redux-logger
import thunkMiddleware from 'redux-thunk'; // https://github.com/gaearon/redux-thunk
import axios from 'axios';

const initialState =  {
  students: [],
  campuses: []
}

// action types:
const GET_STUDENTS = 'GET_STUDENTS';
const GET_CAMPUSES = 'GET_CAMPUSES';

// action creators:
export function getStudents (students) {
  return { type: GET_STUDENTS, students }
}

export function getCampuses (campuses) {
  return { type: GET_CAMPUSES, campuses }
}

// thunk creators:

export function fetchStudents () {

  return function thunk (dispatch) {
    return axios.get('/api/students')
      .then(res => res.data)
      .then(students => {
        dispatch(getStudents(students));
      });
  };
}

export function fetchCampuses () {

    return function thunk (dispatch) {
      return axios.get('/api/campuses')
        .then(res => res.data)
        .then(campuses => {
          dispatch(getCampuses(campuses));
        });
    };
  }

// reducer:

export function reducer (state = initialState, action){
  switch (action.type) {
    case GET_STUDENTS:
      return Object.assign({}, state, { students: action.students });
    case GET_CAMPUSES:
      return Object.assign({}, state, {campuses: action.campuses });
    default:
      return state;
  }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default createStore(reducer, initialState, composeEnhancers(applyMiddleware(thunkMiddleware, loggingMiddleware)));
