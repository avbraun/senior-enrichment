import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

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
                <li key={campus.id}>{campus.name}: {campus.description}</li>
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
