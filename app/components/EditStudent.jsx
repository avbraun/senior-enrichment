import React from 'react';
import { connect } from 'react-redux';
import { postStudentChanges, updateStudentFirstName, updateStudentLastName, updateStudentEmail, updateStudentCampusId } from '../store';

const mapStateToProps = (state) => {
  return {
    selectedStudent: state.selectedStudent,
    campuses: state.campuses
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    firstNameChange (event) {
      dispatch(updateStudentFirstName(event.target.value));
    },
    lastNameChange (event) {
      dispatch(updateStudentLastName(event.target.value));

    },
    emailChange (event) {
      dispatch(updateStudentEmail(event.target.value));
    },
    campusChange (event) {
      dispatch(updateStudentCampusId(event.target.value));
    },
    handleSubmit (event) {
      event.preventDefault();
      let studentId = ownProps.match.params.studentId;
      dispatch(postStudentChanges(studentId));
      ownProps.history.push(`/students/${studentId}`);
    }
  }
}

export function EditStudent(props) {

  let { campuses, selectedStudent, firstNameChange, lastNameChange, emailChange, campusChange, handleSubmit } = props;

  return (
    <div>
      <h2>Edit student:</h2>
      <form onSubmit={handleSubmit} >
        <label>
          First Name:
        <input
          onChange={firstNameChange}
          value={selectedStudent.firstName}
          type="text"
          name="firstName" />
        </label>
        <br />
        <br />
        <label>
          Last Name:
        <input
          onChange={lastNameChange}
          value={selectedStudent.lastName}
          type="text"
          name="lastName" />
        </label>
        <br />
        <br />
        <label>
          Email:
        <input
          onChange={emailChange}
          value={selectedStudent.email}
          type="email"
          name="email" />
        </label>
        <br />
        <br />
        <label>
          Campus:
        <select value={selectedStudent.campusId} onChange={campusChange}>
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

const EditStudentContainer = connect(mapStateToProps, mapDispatchToProps)(EditStudent);

export default EditStudentContainer;
