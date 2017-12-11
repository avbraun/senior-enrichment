import React from 'react';
import { connect } from 'react-redux';
import { writeNewStudentEmail, writeNewStudentFirstName, writeNewStudentLastName, writeNewStudentCampusId, postNewStudent } from '../store';


export function NewStudent(props) {

  let { newStudent, campuses, firstNameChange, lastNameChange, emailChange, campusChange, handleSubmit } = props;

  return (
    <div>
      <h2>Add a student:</h2>
      <form onSubmit={handleSubmit} >
        <label>
          First Name:
        <input
            onChange={firstNameChange}
            value={newStudent.firstName}
            type="text"
            name="firstName" />
        </label>
        <br />
        <br />
        <label>
          Last Name:
        <input
            onChange={lastNameChange}
            value={newStudent.lastName}
            type="text"
            name="lastName" />
        </label>
        <br />
        <br />
        <label>
          Email:
        <input
            onChange={emailChange}
            value={newStudent.email}
            type="email"
            name="email" />
        </label>
        <br />
        <br />
        <label>
          Campus:
        <select value={newStudent.campusId} onChange={campusChange}>
            <option value="Select a campus">Select a campus</option>
            {
              campuses.map(campus =>
                <option key={campus.id} value={campus.id}>{campus.name}</option>)
            }
          </select>
        </label>
        <br />
        <br />
        <input type="submit" value="Submit" />
      </form>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    newStudent: state.newStudent,
    campuses: state.campuses
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    firstNameChange (event) {
      dispatch(writeNewStudentFirstName(event.target.value));
    },
    lastNameChange (event) {
      dispatch(writeNewStudentLastName(event.target.value));
    },
    emailChange (event) {
      dispatch(writeNewStudentEmail(event.target.value));
    },
    campusChange (event) {
      dispatch(writeNewStudentCampusId(event.target.value));
    },
    handleSubmit (event) {
      event.preventDefault();
      dispatch(postNewStudent());
      ownProps.history.push('/students');
      dispatch(writeNewStudentFirstName(''));
      dispatch(writeNewStudentLastName(''));
      dispatch(writeNewStudentEmail(''));
      dispatch(writeNewStudentCampusId(''));
    }
  };
};

const NewStudentContainer = connect(mapStateToProps, mapDispatchToProps)(NewStudent);

export default NewStudentContainer;
