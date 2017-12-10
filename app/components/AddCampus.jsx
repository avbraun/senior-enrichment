import React from 'react';
import { connect } from 'react-redux';
import { writeNewCampusName, writeNewCampusDescription, writeNewCampusImageUrl, postNewCampus } from '../store';

const mapStateToProps = (state) => {
  return {
    newCampus: state.newCampus
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    nameChange (event) {
      dispatch(writeNewCampusName(event.target.value));
    },
    descriptionChange (event) {
      dispatch(writeNewCampusDescription(event.target.value));
    },
    imageUrlChange (event) {
      dispatch(writeNewCampusImageUrl(event.target.value));
    },
    handleSubmit (event) {
      event.preventDefault();
      dispatch(postNewCampus());
      ownProps.history.push('/campuses');
      dispatch(writeNewCampusName(''));
      dispatch(writeNewCampusDescription(''));
      dispatch(writeNewCampusImageUrl(''));
    }
  }
}

export function NewCampus(props) {

  const { newCampus, nameChange, descriptionChange, imageUrlChange, handleSubmit } = props;

  return (
    <div>
      <h2>Add a campus...</h2>
      <form onSubmit={handleSubmit} >
        <label>
          Name:
        <input
            onChange={nameChange}
            value={newCampus.name}
            type="text"
            name="name" />
        </label>
        <br />
        <br />
        <label>
          Description (optional):
        <input
          onChange={descriptionChange}
          value={newCampus.description}
          type="text"
          name="description" />
        </label>
        <br />
        <br />
        <label>
          Image URL (optional):
        <input
          onChange={imageUrlChange}
          value={newCampus.imageUrl}
          type="text"
          name="imageUrl" />
        </label>
        <br />
        <br />
        <input type="submit" value="Submit" />
      </form>
    </div>
  )
}

const NewCampusContainer = connect(mapStateToProps, mapDispatchToProps)(NewCampus);

export default NewCampusContainer;
