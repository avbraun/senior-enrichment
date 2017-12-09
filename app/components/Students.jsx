import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { connect } from 'react-redux';

const mapStateToProps = (state) => {
  return {
    students: state.students,
  }
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

const StudentsContainer = connect(mapStateToProps)(Students);

export default StudentsContainer;
