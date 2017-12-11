import { createStore, applyMiddleware } from 'redux';
import loggingMiddleware from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import axios from 'axios';

// Apologies for the INCREDIBLY bulky store... My plan was to refactor it into separate reducers later on, but I ran out of time!

const initialState =  {
  students: [],
  campuses: [],
  newStudent: {},
  newCampus: {},
  selectedStudent: {},
  selectedCampus: {}
}

// action types:
const GET_STUDENTS = 'GET_STUDENTS';
const ADD_STUDENT = 'ADD_STUDENT';
const REMOVE_STUDENT = 'REMOVE_STUDENT';
const SELECT_STUDENT = 'SELECT_STUDENT';

const GET_CAMPUSES = 'GET_CAMPUSES';
const ADD_CAMPUS = 'ADD_CAMPUS';
const REMOVE_CAMPUS = 'REMOVE_CAMPUS';
const SELECT_CAMPUS = 'SELECT_CAMPUS';

const WRITE_NEW_STUDENT_FIRSTNAME = 'WRITE_NEW_STUDENT_FIRSTNAME';
const WRITE_NEW_STUDENT_LASTNAME = 'WRITE_NEW_STUDENT_LASTNAME';
const WRITE_NEW_STUDENT_EMAIL = 'WRITE_NEW_STUDENT_EMAIL';
const WRITE_NEW_STUDENT_CAMPUSID = 'WRITE_NEW_STUDENT_CAMPUS';

const WRITE_NEW_CAMPUS_NAME = 'WRITE_NEW_CAMPUS_NAME';
const WRITE_NEW_CAMPUS_DESCRIPTION = 'WRITE_NEW_CAMPUS_DESCRIPTION';
const WRITE_NEW_CAMPUS_IMAGEURL = 'WRITE_NEW_CAMPUS_IMAGEURL';

const UPDATE_STUDENT_FIRST_NAME = 'UPDATE_STUDENT_FIRST_NAME';
const UPDATE_STUDENT_LAST_NAME = 'UPDATE_STUDENT_LAST_NAME';
const UPDATE_STUDENT_EMAIL = 'UPDATE_STUDENT_EMAIL';
const UPDATE_STUDENT_CAMPUSID = 'UPDATE_STUDENT_CAMPUSID';

const UPDATE_CAMPUS_NAME = 'UPDATE_CAMPUS_NAME';
const UPDATE_CAMPUS_DESCRIPTION = 'UPDATE_CAMPUS_DESCRIPTION';
const UPDATE_CAMPUS_IMAGEURL = 'UPDATE_CAMPUS_IMAGEURL';

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

export function updateCampusName (campusName) {
  return { type: UPDATE_CAMPUS_NAME, campusName };
}

export function updateCampusDescription (campusDescription) {
  return { type: UPDATE_CAMPUS_DESCRIPTION, campusDescription };
}

export function updateCampusImageUrl (campusImageUrl) {
  return { type: UPDATE_CAMPUS_IMAGEURL, campusImageUrl };
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
        dispatch(selectStudent(student));
      });
  };
}

export function fetchCampus (campusId) {

  return function thunk (dispatch) {
    return axios.get(`/api/campuses/${campusId}`)
      .then(res => res.data)
      .then(campus => {
        dispatch(selectCampus(campus));
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

export function postCampusChanges (campus) {

    return function thunk (dispatch) {
      // let updatedStudent = getState().selectedStudent;
      console.log('campus: ', campus)
      return axios.put(`/api/campuses/${campus.id}`, campus)
        .then(() => {
          dispatch(fetchCampuses());
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
    return Object.assign({}, state, { selectedCampus: action.campus});

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

  case UPDATE_CAMPUS_NAME:
    return Object.assign({}, state, { selectedCampus:
      {
        id: state.selectedCampus.id,
        name: action.campusName,
        description: state.selectedCampus.description,
        imageUrl: state.selectedCampus.imageUrl
      }
  })

  case UPDATE_CAMPUS_DESCRIPTION:
  return Object.assign({}, state, { selectedCampus:
    {
      id: state.selectedCampus.id,
      name: state.selectedCampus.name,
      description: action.campusDescription,
      imageUrl: state.selectedCampus.imageUrl
    }
})

  case UPDATE_CAMPUS_IMAGEURL:
    return Object.assign({}, state, { selectedCampus:
      {
        id: state.selectedCampus.id,
        name: state.selectedCampus.name,
        description: state.selectedCampus.description,
        imageUrl: actions.campusImageUrl
      }
  })

    default:
      return state;
  }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default createStore(reducer, initialState, composeEnhancers(applyMiddleware(thunkMiddleware, loggingMiddleware)));
