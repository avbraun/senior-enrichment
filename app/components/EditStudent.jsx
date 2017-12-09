import React from 'react';
import { connect } from 'react-redux';
import { postStudentChanges, updateStudentFirstName, updateStudentLastName, updateStudentEmail, updateStudentCampusId } from '../store';

const mapStateToProps = (state) => {
  return {
    campuses: state.campuses,
    selectedStudent: state.selectedStudent
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    firstNameChange (event) {
      // event.preventDefault();
      dispatch(updateStudentFirstName(event.target.value));
    },
    lastNameChange (event) {
      dispatch(updateStudentLastName(event.target.value));
      // event.preventDefault();

    },
    handleEmailChange (event) {
      // event.preventDefault();
      dispatch(updateStudentEmail(event.target.value));
    },
    handleCampusChange (event) {
      // event.preventDefault();
      dispatch(updateStudentCampusId(event.target.value));
    },
    handleSubmit (event) {
      let studentId = ownProps.match.params.studentId;
      dispatch(postStudentChanges(studentId));
      event.preventDefault();
      ownProps.history.push(`/students/${studentId}`);
    }
  }
}

export function EditStudent(props) {
  return (
    <div>
      <h2>Edit this student...</h2>
      <form onSubmit={props.handleSubmit} >
        <label>
          First Name:
        <input onChange={props.firstNameChange} value={props.selectedStudent.firstName} type="text" name="firstName" />
        </label>
        <br />
        <br />
        <label>
          Last Name:
      <input onChange={props.lastNameChange} value={props.selectedStudent.lastName} type="text" name="lastName" />
        </label>
        <br />
        <br />
        <label>
          Email:
        <input onChange={props.handleEmailChange} value={props.selectedStudent.email} type="email" name="email" />
        </label>
        <br />
        <br />
        <label>
          Campus:
        <select value={props.selectedStudent.campusId} onChange={props.handleCampusChange}>
        <option value="Select a campus">Select a campus</option>
        {
          props.campuses.map(campus =>
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
