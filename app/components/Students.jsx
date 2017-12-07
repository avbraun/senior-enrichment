import React, { Component } from 'react';
import { BrowserRouter as Route, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';

const mapStateToProps = (state) => {
  return {
    students: state.students
  }
}

const mapDispatchToProps = (dispatch) => {
  return {}
}

export function Students(props) {
  return (
    <div>
      <h2>This is Students!</h2>
      <ul>
        {
          props.students.map(student => {
            return (
              <div>
                <li key={student.id}>{student.fullName}</li>
              </div>
            )
          })
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
