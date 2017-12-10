import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { deleteCampus, selectCampus, selectStudent } from '../store';

const mapStateToProps = (state) => {
  return {
    students: state.students,
    selectedCampus: state.selectedCampus,
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  // let campusId = ownProps.match.params.campusId;

  return {
    handleDelete(event, selectedCampus) {
      dispatch(deleteCampus(selectedCampus.id));
      ownProps.history.push('/campuses');
    },
    handleEdit(event, selectedCampus){
      event.preventDefault();
      ownProps.history.push(`/campuses/${selectedCampus.id}/edit`);
    },
    selectThisStudent(event, student){
      event.preventDefault();
      dispatch(selectStudent(student))
      ownProps.history.push(`/students/${student.id}`)
    }
  }
}

export function SingleCampus(props) {

  let { students, selectThisStudent, selectedCampus, handleDelete, handleEdit } = props;

  return (
    <div>
    <h1>{selectedCampus.name}</h1>
    <p>{selectedCampus.description}</p>
    <div>
    <button onClick={event => handleDelete(event, selectedCampus)}>Delete</button>
    <br />
    <button onClick={event => handleEdit(event, selectCampus)}>Edit</button>
    </div>
    <br />
    <br />
    <h2>Students:</h2>
    {
      students.filter(student => student.campusId === selectedCampus.id).map(filteredStudent => (
        <div>
        <Link
          onClick={event => selectThisStudent(event, filteredStudent)}
          key={filteredStudent.id}
          to={`/students/${filteredStudent.id}`}>
        {filteredStudent.fullName}
        </Link>
        <p key={`anotherli${filteredStudent.id}`}>{filteredStudent.email}</p>
        </div>
      ))
    }
    </div>
  );
}


const SingleCampusContainer = connect(mapStateToProps, mapDispatchToProps)(SingleCampus);

export default SingleCampusContainer;
