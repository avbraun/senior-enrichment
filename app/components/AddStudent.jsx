import React from 'react';

export default class AddStudent extends React.Component {
  render () {
    return (
      <div>
        <h2>Add Student</h2>
        <form>
          <label>
            Name:
            <input type="text" name="name" />
          </label>
          <input type="submit" value="Submit" />
          <br />
          <label>
          School:
          <input type="text" name="school" />
        </label>
        <input type="submit" value="Submit" />
        </form>
      </div>
    )
  }
}
