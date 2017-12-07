import React, { Component } from 'react';
import { Route, NavLink, Switch } from 'react-router-dom';
import SingleCampus from './SingleCampus';
import AllCampuses from './AllCampuses';
import { connect } from 'react-redux';

const mapStateToProps = (state) => {
  return {
    campuses: state.campuses
  }
}

const mapDispatchToProps = (dispatch) => {
  return {}
}

export function Campuses(props) {
  return (
    <div>
      <h2>This is Campuses!</h2>
      <Switch>
      <Route exact path ="/campuses" component={AllCampuses} />
      <Route path ="/campuses/:campusId" component={SingleCampus} />
      </Switch>
      </div>
  )
}

const CampusesContainer = connect(mapStateToProps, mapDispatchToProps)(Campuses);

export default CampusesContainer;

// turn the render portion into an exported function, which takes props
// mapStateToProps, takes state
// mapDispatchToProps, takes dispatch
// create const container at the bottom, equals connect(mapStateToProps, mapDispatchToProps)(function-name);
// export default that container
// import connect from react-redux
