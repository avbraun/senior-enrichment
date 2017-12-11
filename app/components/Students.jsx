import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchStudent, fetchCampus, selectStudent } from '../store';

const mapStateToProps = (state) => {
  return {
    students: state.students,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    selectStudentAndCampus (event, student) {
      dispatch(selectStudent(student));
      dispatch(fetchCampus(student.campusId))
    }
  }
}

export function Students(props) {

  let { students, selectStudentAndCampus } = props;

  return (
    <div>
      <h2>Students</h2>
      <img className="header-image" src="http://www.lonestar.edu/departments/webservices/studentsOnLawn.jpg" />
      <br />
      <button><Link to="/students/new">Add Student</Link></button>
      <ul>
      <div>
        {
          students.map(student => (
              <li key={student.id}>
                <Link
                  onClick={event => selectStudentAndCampus(event, student)}
                  key={`link${student.id}`}
                  to={`/students/${student.id}`}>
                  {student.fullName}
                </Link>
              </li>
          ))
        }
        </div>
      </ul>
    </div>
  )
}

const StudentsContainer = connect(mapStateToProps, mapDispatchToProps)(Students);

export default StudentsContainer;
