import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { selectCampus } from '../store';


export function AllCampuses(props) {

  let { campuses, selectTheCampus, addCampus } = props;

  return (
    <div>
    <h2>Campuses:</h2>
    <button onClick={addCampus}>Add Campus</button>
        {
          campuses.map(campus => {
            return (
              <div>
                <h3>{campus.name}</h3>
                {campus.description}
                <br />
                <br />
                Click below to view {campus.name}...
                <br />
                <Link
                  onClick={event => selectTheCampus(event, campus)}
                  key={`link${campus.id}`}
                  to={`/campuses/${campus.id}`}>
                  <img key={`image${campus.id}`} src={campus.imgUrl} />
                  <br />
                  <br />
                </Link>
              </div>
            )
          })
        }
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    campuses: state.campuses
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    selectTheCampus(event, campus) {
      dispatch(selectCampus(campus));
    },
    addCampus(){
      ownProps.history.push('/campuses/new');
    }
  }
}

const AllCampusesContainer = connect(mapStateToProps, mapDispatchToProps)(AllCampuses);

export default AllCampusesContainer;
