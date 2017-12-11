import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { deleteCampus, selectCampus, selectStudent } from '../store';


export function SingleCampus(props) {

  let { students, selectThisStudent, selectedCampus, handleDelete, handleEdit } = props;

  return (
    <div>
    <h1>{selectedCampus.name}</h1>
    {selectedCampus.description}
    <br />
    <br />
    <div>
    <button onClick={event => handleDelete(event, selectedCampus)}>Delete</button>
    <button onClick={event => handleEdit(event, selectCampus)}>Edit</button>
    </div>
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
        <br />
        {filteredStudent.email}
        <br />
        <br />
        </div>
      ))
    }
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    students: state.students,
    selectedCampus: state.selectedCampus,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {

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
  };
};

const SingleCampusContainer = connect(mapStateToProps, mapDispatchToProps)(SingleCampus);

export default SingleCampusContainer;
