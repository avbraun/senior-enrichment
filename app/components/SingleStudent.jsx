import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { deleteStudent } from '../store';


export function SingleStudent(props) {

  let { selectedStudent, selectedCampus, handleEdit, handleDelete } = props;

  return (
    <div>
      <div>
        <h2>{selectedStudent.firstName} {selectedStudent.lastName}</h2>
        <h3>Email:</h3> {selectedStudent.email}
        <h3>Campus:</h3> <Link
          to={`/campuses/${selectedCampus.id}`}>
          {selectedCampus.name}</Link>
        <h3>GPA:</h3> {selectedStudent.gpa}
      </div>
      <br />
      <br />
      <button onClick={event => handleEdit(event, selectedStudent)}>Edit</button>
      <button onClick={event => handleDelete(event, selectedStudent)}>Delete</button>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    selectedStudent: state.selectedStudent,
    selectedCampus: state.selectedCampus
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {

  return {
    handleDelete (event, selectedStudent) {
      dispatch(deleteStudent(selectedStudent.id));
      ownProps.history.push('/students');
    },
    handleEdit (event, selectedStudent) {
      ownProps.history.push(`/students/${selectedStudent.id}/edit`);
    }
  }
}

const SingleStudentContainer = connect(mapStateToProps, mapDispatchToProps)(SingleStudent);

export default SingleStudentContainer;
