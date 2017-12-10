import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { selectCampus } from '../store';

const mapStateToProps = (state) => {
  return {
    campuses: state.campuses
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    selectCampus(event, campus) {
      dispatch(selectCampus(campus));
    }
  }
}

export function AllCampuses(props) {

  let { campuses, selectCampus } = props;

  return (
    <div>
      <h2>(Alyssa, these are All Campuses!)</h2>
      <ul>
        {
          campuses.map(campus => {
            return (
              <div>
                <li key={campus.id}>{campus.name}: {campus.description}</li>
                <Link
                  onClick={event => selectCampus(event, campus)}
                  key={`link${campus.id}`}
                  to={`/campuses/${campus.id}`}>
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
