import React, { Component } from 'react';
import { Route, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { deleteCampus, fetchCampusStudents } from '../store';

const mapStateToProps = (state) => {
  return {
    students: state.students,
    selectedCampus: state.selectedCampus
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  let campusId = ownProps.match.params.campusId;

  return {
    handleDelete(event) {
      event.preventDefault();
      dispatch(deleteCampus(ownProps.match.params.campusId));
      ownProps.history.push('/campuses');
    },
    handleEdit(event){
      event.preventDefault();
      dispatch(fetchCampus(campusId));
      ownProps.history.push(`/campuses/${campusId}/edit`);
    }
  }
}

export function SingleCampus(props) {
  let campusIdNum = parseInt(props.match.params.campusId, 10);
  return (
    <div>
    <h1>{props.selectedCampus.name}</h1>
    <div>
    <button onClick={props.handleDelete}>Delete</button>
    <br />
    <br />
    <button onClick={props.handleEdit}>Edit</button>
    </div>
    <br />
    <br />
    {
      props.students.filter(student => student.campusId === campusIdNum).map(filteredStudent => (
        <div>
        <NavLink key={filteredStudent.id} to={`/students/${filteredStudent.id}`}>
        <p key={`li${filteredStudent.id}`}>{filteredStudent.fullName}</p>
        </NavLink>
        <p key={`anotherli${filteredStudent.id}`}>{filteredStudent.email}</p>
        </div>
      ))
    }
    </div>
  );
}


const SingleCampusContainer = connect(mapStateToProps, mapDispatchToProps)(SingleCampus);

export default SingleCampusContainer;
