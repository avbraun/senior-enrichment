import React, { Component } from 'react';
import { Route, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';

const mapStateToProps = (state) => {
  return {
    students: state.students
  }
}

const mapDispatchToProps = (dispatch) => {
  return {}
}

export function SingleCampus(props) {
  let campusIdNum = parseInt(props.match.params.campusId, 10);
  return (
    <table>
    <thead>
    <tr>
    <th>Name</th>
    <th>Email</th>
    </tr>
    </thead>
    <tbody>
    {
      props.students.filter(student => student.campusId === campusIdNum).map(filteredStudent => (
        <NavLink to={`/students/${filteredStudent.id}`}>
        <tr>
        <td>{filteredStudent.fullName}</td>
        <td>{filteredStudent.email}</td>
        </tr>
        </NavLink>
      ))
    }
    </tbody>
    </table>
  );
}


const SingleCampusContainer = connect(mapStateToProps, mapDispatchToProps)(SingleCampus);

export default SingleCampusContainer;
