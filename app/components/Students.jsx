import React, { Component } from 'react';
import { BrowserRouter as Route, NavLink, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { deleteStudent } from '../store';

const mapStateToProps = (state) => {
  return {
    students: state.students,
    // studentToDelete: state.studentToDelete
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    handleDelete (event) {
      console.log('MDTP - event.target.value: ', event.target.value)
      dispatch(deleteStudent(event.target.value));
    }
  }
}

export function Students(props) {
  return (
    <div>
      <h2>This is Students!</h2>
      <button><Link to="/students/new">Add Student</Link></button>
      <ul>
        {
          props.students.map(student => (
              <div>
                <li key={student.id}>
                <NavLink to={`/students/${student.id}`}>{student.fullName}</NavLink>
                </li>
                <button value={student.id} onClick={props.handleDelete}>Delete</button>
                </div>
            )
          )
        }
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
