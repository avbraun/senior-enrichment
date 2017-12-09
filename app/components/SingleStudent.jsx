import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { deleteStudent, fetchStudent } from '../store';

const mapStateToProps = (state) => {
  return {
    students: state.students,
    campuses: state.campuses
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  let studentId = ownProps.match.params.studentId;

  return {
    handleDelete (event) {
      event.preventDefault();
      dispatch(deleteStudent(studentId));
      ownProps.history.push('/students');
    },
    handleEdit (event) {
      event.preventDefault();
      dispatch(fetchStudent(studentId));
      ownProps.history.push(`/students/${studentId}/edit`);
    }
  }
}

export function SingleStudent(props) {
  let studentIdNum = parseInt(props.match.params.studentId, 10);
  let studentArr = props.students.filter(student => student.id === studentIdNum);

  return (
    <div>
    {
      studentArr.map(studentObj => (
        <div>
        <h1>{studentObj.fullName}</h1>
        <h3>Email: {studentObj.email}</h3>
        <h3>Campus: <NavLink to={`/campuses/${studentObj.campusId}`}>{props.campuses.filter(campus => campus.id === studentObj.campusId).map(campusObj => campusObj.name)}</NavLink></h3>
        </div>
      ))
    }
    <button onClick={props.handleEdit}>Edit</button>
    <br />
    <br />
    <button onClick={props.handleDelete}>Delete</button>
    </div>
  )
}

const SingleStudentContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(SingleStudent));

export default SingleStudentContainer;
