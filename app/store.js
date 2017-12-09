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
    email: '',
    campusId: ''
  },
  newCampus: {
    name: '',
    imageUrl: '',
    description: ''
  },
  selectedStudent: {
    firstName: '',
    lastName: '',
    email: '',
    campusId: ''
  },
  selectedCampus: {
    name: '',
    imageUrl: '',
    description: '',
    campusStudents: []
  }
}

// action types:
const GET_STUDENTS = 'GET_STUDENTS';
const GET_CAMPUSES = 'GET_CAMPUSES';
const WRITE_NEW_STUDENT_FIRSTNAME = 'WRITE_NEW_STUDENT_FIRSTNAME';
const WRITE_NEW_STUDENT_LASTNAME = 'WRITE_NEW_STUDENT_LASTNAME';
const WRITE_NEW_STUDENT_EMAIL = 'WRITE_NEW_STUDENT_EMAIL';
const WRITE_NEW_STUDENT_CAMPUSID = 'WRITE_NEW_STUDENT_CAMPUS';
const ADD_STUDENT = 'ADD_STUDENT';
const REMOVE_STUDENT = 'REMOVE_STUDENT';
const SELECT_STUDENT = 'SELECT_STUDENT';
const WRITE_NEW_CAMPUS_NAME = 'WRITE_NEW_CAMPUS_NAME';
const WRITE_NEW_CAMPUS_DESCRIPTION = 'WRITE_NEW_CAMPUS_DESCRIPTION';
const WRITE_NEW_CAMPUS_IMAGEURL = 'WRITE_NEW_CAMPUS_IMAGEURL';
const ADD_CAMPUS = 'ADD_CAMPUS';
const REMOVE_CAMPUS = 'REMOVE_CAMPUS';
const UPDATE_STUDENT_FIRST_NAME = 'UPDATE_STUDENT_FIRST_NAME';
const UPDATE_STUDENT_LAST_NAME = 'UPDATE_STUDENT_LAST_NAME';
const UPDATE_STUDENT_EMAIL = 'UPDATE_STUDENT_EMAIL';
const UPDATE_STUDENT_CAMPUSID = 'UPDATE_STUDENT_CAMPUSID';
const SELECT_CAMPUS = 'SELECT_CAMPUS';


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

export function writeNewStudentCampusId (studentCampusId) {
  return { type: WRITE_NEW_STUDENT_CAMPUSID, studentCampusId }
}

export function addStudent (student) {
  return { type: ADD_STUDENT, student }
}

export function removeStudent (studentId) {
  return { type: REMOVE_STUDENT, studentId }
}

export function selectStudent (student) {
  return { type: SELECT_STUDENT, student }
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

export function removeCampus (campusId) {
  return { type: REMOVE_CAMPUS, campusId }
}

export function updateStudentFirstName (studentFirstName) {
  return { type: UPDATE_STUDENT_FIRST_NAME, studentFirstName }
}

export function updateStudentLastName (studentLastName) {
  return { type: UPDATE_STUDENT_LAST_NAME, studentLastName }
}

export function updateStudentEmail (studentEmail) {
  return { type: UPDATE_STUDENT_EMAIL, studentEmail }
}

export function updateStudentCampusId (studentCampusId) {
  return { type: UPDATE_STUDENT_CAMPUSID, studentCampusId }
}

export function selectCampus (campus) {
  return { type: SELECT_CAMPUS, campus }
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

export function fetchStudent (studentId) {

  return function thunk (dispatch) {
    return axios.get(`/api/students/${studentId}`)
      .then(res => res.data)
      .then(student => {
        dispatch(selectStudent({
          firstName: student.firstName,
          lastName: student.lastName,
          email: student.email,
          campusId: student.campusId
        }));
      });
  };
}

export function fetchCampus (campusId) {

  return function thunk (dispatch) {
    return axios.get(`/api/campuses/${campusId}`)
      .then(res => res.data)
      .then(campus => {
        dispatch(selectCampus({
          name: campus.name,
          description: campus.description,
          imageUrl: campus.imageUrl
        }));
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

  return function thunk (dispatch) {
    return axios.delete(`/api/students/${studentId}`, {id: studentId})
      .then(() => {
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

export function deleteCampus (campusId) {

    return function thunk (dispatch) {
        return axios.delete(`/api/campuses/${campusId}`, {id: campusId})
          .then(() => {
            dispatch(fetchCampuses());
            dispatch(fetchStudents());
          });
      };
    }

export function postStudentChanges (studentId) {

  return function thunk (dispatch, getState) {
    let updatedStudent = getState().selectedStudent;
    return axios.put(`/api/students/${studentId}`, updatedStudent)
      .then(() => {
        dispatch(fetchStudents());
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

      case WRITE_NEW_STUDENT_CAMPUSID:
      return Object.assign({}, state, { newStudent: { firstName: state.newStudent.firstName, lastName: state.newStudent.lastName, email: state.newStudent.email, campusId: action.studentCampusId }});

    case ADD_STUDENT:
      return Object.assign({}, state, { students: [...state.students, action.student]});

    case SELECT_STUDENT:
    return Object.assign({}, state, { selectedStudent: action.student });

    case SELECT_CAMPUS:
    return Object.assign({}, state, { selectedCampus: {
      name: action.campus.name,
      imageUrl: action.campus.imageUrl,
      description: action.campus.description,
      students: state.selectedCampus.students
    }});

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

      case UPDATE_STUDENT_FIRST_NAME:
      return Object.assign({}, state, { selectedStudent:
        {
          firstName: action.studentFirstName,
          lastName: state.selectedStudent.lastName,
          email: state.selectedStudent.email,
          campusId: state.selectedStudent.campusId
        }
      })

    case UPDATE_STUDENT_LAST_NAME:
      return Object.assign({}, state, { selectedStudent:
        {
          firstName: state.selectedStudent.firstName,
          lastName: action.studentLastName,
          email: state.selectedStudent.email,
          campusId: state.selectedStudent.campusId
        }
    });

    case UPDATE_STUDENT_EMAIL:
    return Object.assign({}, state, { selectedStudent:
      {
        firstName: state.selectedStudent.firstName,
        lastName: state.selectedStudent.lastName,
        email: action.studentEmail,
        campusId: state.selectedStudent.campusId
      }
  });

  case UPDATE_STUDENT_CAMPUSID:
  return Object.assign({}, state, { selectedStudent:
    {
      firstName: state.selectedStudent.firstName,
      lastName: state.selectedStudent.lastName,
      email: state.selectedStudent.email,
      campusId: action.studentCampusId
    }
});
    default:
      return state;
  }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default createStore(reducer, initialState, composeEnhancers(applyMiddleware(thunkMiddleware, loggingMiddleware)));
