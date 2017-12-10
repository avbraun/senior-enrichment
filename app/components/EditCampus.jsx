import React from 'react';
import { connect } from 'react-redux';
import { updateCampusName, updateCampusDescription, updateCampusImageUrl, postCampusChanges } from '../store';

const mapStateToProps = (state) => {
  return {
    selectedCampus: state.selectedCampus
    // students: state.students
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    nameChange (event) {
      dispatch(updateCampusName(event.target.value));
    },
    descriptionChange (event) {
      dispatch(updateCampusDescription(event.target.value));
    },
    imageUrlChange (event) {
      dispatch(updateCampusImageUrl(event.target.value));
    },
    handleSubmit (event, selectedCampus) {
      event.preventDefault();
      // let studentId = ownProps.match.params.studentId;
      console.log('selectedcampus: ', selectedCampus)
      dispatch(postCampusChanges(selectedCampus));
      ownProps.history.push(`/campuses/${selectedCampus.id}`);
    }
  }
}

export function EditCampus(props) {

  let { selectedCampus, nameChange, descriptionChange, imageUrlChange, handleSubmit } = props;

  return (
    <div>
      <h2>Edit campus:</h2>
      <form onSubmit={event => handleSubmit(event, selectedCampus)} >
        <label>
          Name:
        <input
            onChange={nameChange}
            value={selectedCampus.name}
            type="text"
            name="firstName" />
        </label>
        <br />
        <br />
        <label>
          Description:
        <input
            onChange={descriptionChange}
            value={selectedCampus.description}
            type="text"
            name="lastName" />
        </label>
        <br />
        <br />
        <label>
          Image URL:
        <input
            onChange={imageUrlChange}
            value={selectedCampus.imageUrl}
            type="email"
            name="email" />
        </label>
        <br />
        <br />
        <input type="submit" value="Submit" />
      </form>
    </div>
  )
}

const EditCampusContainer = connect(mapStateToProps, mapDispatchToProps)(EditCampus);

export default EditCampusContainer;
