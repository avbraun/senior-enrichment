import React from 'react';
import { Link } from 'react-router-dom';
import AllCampuses from './AllCampuses';
import { connect } from 'react-redux';

const mapStateToProps = (state) => {
  return {
    campuses: state.campuses
  }
}

export function Campuses(props) {
  return (
    <div>
      <h2>Campuses</h2>
      <button><Link to="/campuses/new">Add Campus</Link></button>
      <AllCampuses />
      </div>
  )
}

const CampusesContainer = connect(mapStateToProps)(Campuses);

export default CampusesContainer;
