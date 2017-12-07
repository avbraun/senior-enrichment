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
  return (
    <div>
      <h2>This is a Single Campus!</h2>
      <h2>{props.match.params.campusId}</h2>
    </div>
  )
}

const SingleCampusContainer = connect(mapStateToProps, mapDispatchToProps)(SingleCampus);

export default SingleCampusContainer;
