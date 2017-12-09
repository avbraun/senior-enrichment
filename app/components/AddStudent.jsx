import React, { Component } from 'react';
import { BrowserRouter as Route, NavLink, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { writeNewStudentEmail, writeNewStudentFirstName, writeNewStudentLastName, writeNewStudentCampusId, postNewStudent } from '../store';

const mapStateToProps = (state) => {
  return {
    newStudent: state.newStudent,
    campuses: state.campuses
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    firstNameChange (event) {
      dispatch(writeNewStudentFirstName(event.target.value));
    },
    lastNameChange (event) {
      dispatch(writeNewStudentLastName(event.target.value));
    },
    handleEmailChange (event) {
      dispatch(writeNewStudentEmail(event.target.value));
    },
    handleCampusChange (event) {
      dispatch(writeNewStudentCampusId(event.target.value));
    },
    handleSubmit (event) {
      dispatch(postNewStudent());
      event.preventDefault();
      // ownProps.history.push(`/students/${postedStudent.id}`);
      dispatch(writeNewStudentFirstName(''));
      dispatch(writeNewStudentLastName(''));
      dispatch(writeNewStudentEmail(''));
    }
  }
}

export function NewStudent(props) {
  return (
    <div>
      <h2>Add a student...</h2>
      <form onSubmit={props.handleSubmit} >
        <label>
          First Name:
        <input onChange={props.firstNameChange} value={props.newStudent.firstName} type="text" name="firstName" />
        </label>
        <br />
        <br />
        <label>
          Last Name:
      <input onChange={props.lastNameChange} value={props.newStudent.lastName} type="text" name="lastName" />
        </label>
        <br />
        <br />
        <label>
          Email:
        <input onChange={props.handleEmailChange} value={props.newStudent.email} type="email" name="email" />
        </label>
        <br />
        <br />
        <label>
          Campus:
        <select value={props.newStudent.campusId} onChange={props.handleCampusChange}>
        <option selected value="Select a campus">Select a campus</option>
        {
          props.campuses.map(campus =>
          <option value={campus.id}>{campus.name}</option>)
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

const NewStudentContainer = connect(mapStateToProps, mapDispatchToProps)(NewStudent);

export default NewStudentContainer;

// turn the render portion into an exported function, which takes props
// mapStateToProps, takes state
// mapDispatchToProps, takes dispatch
// create const container at the bottom, equals connect(mapStateToProps, mapDispatchToProps)(function-name);
// export default that container
// import connect from react-redux
