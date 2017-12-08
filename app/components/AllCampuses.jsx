import React, { Component } from 'react';
import { Route, NavLink, Switch, Link } from 'react-router-dom';
import SingleCampus from './SingleCampus';
import { connect } from 'react-redux';

const mapStateToProps = (state) => {
  return {
    campuses: state.campuses
  }
}

const mapDispatchToProps = (dispatch) => {
  return {}
}

export function AllCampuses(props) {
  return (
    <div>
      <h2>(Alyssa, these are All Campuses!)</h2>
      <ul>
        {
          props.campuses.map(campus => {
            return (
              <div>
                <li key={campus.id}>{campus.name}: {campus.description}</li>
                <Link to={`/campuses/${campus.id}`}>
                  <img key={`image${campus.id}`} src={campus.imgUrl} />
                </Link>
              </div>
            )
          })
        }
      </ul>
    </div>
  )
}

const AllCampusesContainer = connect(mapStateToProps, mapDispatchToProps)(AllCampuses);

export default AllCampusesContainer;

// turn the render portion into an exported function, which takes props
// mapStateToProps, takes state
// mapDispatchToProps, takes dispatch
// create const container at the bottom, equals connect(mapStateToProps, mapDispatchToProps)(function-name);
// export default that container
// import connect from react-redux
