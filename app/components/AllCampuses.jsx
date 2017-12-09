import React, { Component } from 'react';
import { Route, NavLink, Switch, Link } from 'react-router-dom';
import SingleCampus from './SingleCampus';
import { connect } from 'react-redux';
import { fetchCampus } from '../store';

const mapStateToProps = (state) => {
  return {
    campuses: state.campuses
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    testtest (event) {
      console.log('hello!')
    }
    // selectCampus(campus, event){
    //   console.log('campus: ', campus)
    //   // dispatch(fetchCampus(ownProps.match.params.))
    // }
  }
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
                <li onClick={testtest} key={campus.id}>{campus.name}: {campus.description}</li>
                <Link key={`link${campus.id}`} to={`/campuses/${campus.id}`}>
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
