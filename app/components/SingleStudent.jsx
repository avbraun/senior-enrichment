import React, { Component } from 'react';
import { Route, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

const mapStateToProps = (state) => {
  return {
    students: state.students,
    campuses: state.campuses
  }
}

const mapDispatchToProps = (dispatch) => {
  return {}
}

export function SingleStudent(props) {
  let studentIdNum = parseInt(props.match.params.studentId, 10);
  let studentArr = props.students.filter(student => student.id === studentIdNum);
  // console.log('studentobj: ', studentObj)

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
    </div>
  )
}

const SingleStudentContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(SingleStudent));

export default SingleStudentContainer;
