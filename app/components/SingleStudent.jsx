import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { deleteStudent } from '../store';

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

export function SingleStudent(props) {

  let { selectedStudent, selectedCampus, handleEdit, handleDelete } = props;

  return (
    <div>
        <div>
        <h1>{selectedStudent.firstName} {selectedStudent.lastName}</h1>
        <h3>Email: {selectedStudent.email}</h3>
        <h3>Campus:
          <Link
          to={`/campuses/${selectedCampus.id}`}>
          {selectedCampus.name}
        </Link>
        </h3>
        </div>
    <button onClick={event => handleEdit(event, selectedStudent)}>Edit</button>
    <br />
    <br />
    <button onClick={event => handleDelete(event, selectedStudent)}>Delete</button>
    </div>
  )
}

const SingleStudentContainer = connect(mapStateToProps, mapDispatchToProps)(SingleStudent);

export default SingleStudentContainer;
