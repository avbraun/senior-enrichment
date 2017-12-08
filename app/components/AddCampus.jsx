import React, { Component } from 'react';
import { BrowserRouter as Route, NavLink, Link } from 'react-router-dom';
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
      dispatch(postNewCampus());
      event.preventDefault();
      // ownProps.history.push(`/students/${postedStudent.id}`);
      dispatch(writeNewCampusName(''));
      dispatch(writeNewCampusDescription(''));
      dispatch(writeNewCampusImageUrl(''));
    }
  }
}

export function NewCampus(props) {
  return (
    <div>
      <h2>Add a campus...</h2>
      <form onSubmit={event => props.handleSubmit(event, props.newCampus.name, props.newCampus.description, props.newCampus.imageUrl)} >
        <label>
          Name:
        <input onChange={props.nameChange} value={props.newCampus.name} type="text" name="name" />
        </label>
        <br />
        <br />
        <label>
        Description (optional):
      <input onChange={props.descriptionChange} value={props.newCampus.description} type="text" name="description" />
      </label>
      <br />
      <br />
        <label>
        Image URL (optional):
        <input onChange={props.imageUrlChange} value={props.newCampus.imageUrl} type="text" name="imageUrl" />
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

// turn the render portion into an exported function, which takes props
// mapStateToProps, takes state
// mapDispatchToProps, takes dispatch
// create const container at the bottom, equals connect(mapStateToProps, mapDispatchToProps)(function-name);
// export default that container
// import connect from react-redux
