import React, { Component } from 'react';
import { BrowserRouter as Route, NavLink, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { deleteStudent } from '../store';

const mapStateToProps = (state) => {
  return {
    students: state.students,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {}
}

export function Students(props) {
  return (
    <div>
      <h2>This is Students!</h2>
      <button><Link to="/students/new">Add Student</Link></button>
      <ul>
      <div>
        {
          props.students.map(student => (
              <li key={student.id}>
                <NavLink key={`link${student.id}`} to={`/students/${student.id}`}>{student.fullName}</NavLink>
              </li>
            )
          )
        }
        </div>
      </ul>
    </div>
  )
}

const StudentsContainer = connect(mapStateToProps, mapDispatchToProps)(Students);

export default StudentsContainer;

// turn the render portion into an exported function, which takes props
// mapStateToProps, takes state
// mapDispatchToProps, takes dispatch
// create const container at the bottom, equals connect(mapStateToProps, mapDispatchToProps)(function-name);
// export default that container
// import connect from react-redux
