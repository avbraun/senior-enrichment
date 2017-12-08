import { createStore, applyMiddleware } from 'redux';
// import rootReducer from './reducers';
import loggingMiddleware from 'redux-logger'; // https://github.com/evgenyrodionov/redux-logger
import thunkMiddleware from 'redux-thunk'; // https://github.com/gaearon/redux-thunk
import axios from 'axios';

const initialState =  {
  students: [],
  campuses: [],
  newStudent: {
    firstName: '',
    lastName: '',
    email: ''
  },
  newCampus: {
    name: '',
    imageUrl: '',
    description: ''
  }
}

// action types:
const GET_STUDENTS = 'GET_STUDENTS';
const GET_CAMPUSES = 'GET_CAMPUSES';
const WRITE_NEW_STUDENT_FIRSTNAME = 'WRITE_NEW_STUDENT_FIRSTNAME';
const WRITE_NEW_STUDENT_LASTNAME = 'WRITE_NEW_STUDENT_LASTNAME';
const WRITE_NEW_STUDENT_EMAIL = 'WRITE_NEW_STUDENT_EMAIL';
const ADD_STUDENT = 'ADD_STUDENT';
const REMOVE_STUDENT = 'REMOVE_STUDENT';
const WRITE_NEW_CAMPUS_NAME = 'WRITE_NEW_CAMPUS_NAME';
const WRITE_NEW_CAMPUS_DESCRIPTION = 'WRITE_NEW_CAMPUS_DESCRIPTION';
const WRITE_NEW_CAMPUS_IMAGEURL = 'WRITE_NEW_CAMPUS_IMAGEURL';
const ADD_CAMPUS = 'ADD_CAMPUS';


// action creators:
export function getStudents (students) {
  return { type: GET_STUDENTS, students }
}

export function getCampuses (campuses) {
  return { type: GET_CAMPUSES, campuses }
}

export function writeNewStudentFirstName (studentFirstName) {
  return { type: WRITE_NEW_STUDENT_FIRSTNAME, studentFirstName }
}

export function writeNewStudentLastName (studentLastName) {
  return { type: WRITE_NEW_STUDENT_LASTNAME, studentLastName }
}

export function writeNewStudentEmail (studentEmail) {
  return { type: WRITE_NEW_STUDENT_EMAIL, studentEmail }
}

export function addStudent (student) {
  return { type: ADD_STUDENT, student }
}

export function removeStudent (studentId) {
  return { type: REMOVE_STUDENT, studentId }
}

export function writeNewCampusName (campusName) {
  return { type: WRITE_NEW_CAMPUS_NAME, campusName}
}

export function writeNewCampusDescription (campusDescription) {
  return { type: WRITE_NEW_CAMPUS_DESCRIPTION, campusDescription }
}

export function writeNewCampusImageUrl (campusImage) {
  return { type: WRITE_NEW_CAMPUS_IMAGEURL, campusImage }
}

export function addCampus (campus) {
  return { type: ADD_CAMPUS, campus }
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

export function postNewStudent () {

  return function thunk (dispatch, getState) {
    let student = getState().newStudent;
    return axios.post('/api/students/new', student)
      .then(res => res.data)
      .then(postedStudent => {
        dispatch(addStudent(postedStudent));
      });
  };
}

export function deleteStudent (studentId) {
console.log('THUNK CREATOR - STUDENTID: ', studentId)
  return function thunk (dispatch) {
    return axios.delete(`/api/students/${studentId}`, {id: studentId})
      .then(() => {
        console.log('THUNK - STUDENTID: ', studentId)
        dispatch(fetchStudents());
      });
  };
}

export function postNewCampus () {

  return function thunk (dispatch, getState) {
    let campus = getState().newCampus;
    return axios.post('/api/campuses/new', campus)
      .then(res => res.data)
      .then(postedCampus => {
        dispatch(addCampus(postedCampus));
      })
  }
}

// reducer:

export function reducer (state = initialState, action){
  switch (action.type) {
    case GET_STUDENTS:
      return Object.assign({}, state, { students: action.students });

    case GET_CAMPUSES:
      return Object.assign({}, state, {campuses: action.campuses });

    case WRITE_NEW_STUDENT_FIRSTNAME:
      return Object.assign({}, state, { newStudent: { firstName: action.studentFirstName }});

    case WRITE_NEW_STUDENT_LASTNAME:
      return Object.assign({}, state, { newStudent: { firstName: state.newStudent.firstName, lastName: action.studentLastName }});

    case WRITE_NEW_STUDENT_EMAIL:
      return Object.assign({}, state, { newStudent: { firstName: state.newStudent.firstName, lastName: state.newStudent.lastName, email: action.studentEmail }});

    case ADD_STUDENT:
      return Object.assign({}, state, { students: [...state.students, action.student]});

    case WRITE_NEW_CAMPUS_NAME:
      return Object.assign({}, state, { newCampus:
        {
          name: action.campusName,
          imageUrl: state.newCampus.imageUrl,
          description: state.newCampus.description
        }
      });

    case WRITE_NEW_CAMPUS_DESCRIPTION:
      return Object.assign({}, state, { newCampus:
        {
          name: state.newCampus.name,
          imageUrl: state.newCampus.imageUrl,
          description: action.campusDescription
        }
    });

    case WRITE_NEW_CAMPUS_IMAGEURL:
    return Object.assign({}, state, { newCampus:
      {
        name: state.newCampus.name,
        imageUrl: action.campusImage,
        description: state.newCampus.description
      }
  });

    case ADD_CAMPUS:
      return Object.assign({}, state, { campuses: [...state.campuses, action.campus]});

    default:
      return state;
  }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default createStore(reducer, initialState, composeEnhancers(applyMiddleware(thunkMiddleware, loggingMiddleware)));
