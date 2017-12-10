import React, { Component } from 'react';
import Campuses from './Campuses';
import Students from './Students';
import SingleCampus from './SingleCampus';
import SingleStudent from './SingleStudent';
import AddStudent from './AddStudent';
import EditCampus from './EditCampus';
import AddCampus from './AddCampus';
import EditStudent from './EditStudent';
import { Route, Switch, Link } from 'react-router-dom';
import store, { fetchStudents, fetchCampuses } from '../store';


export default class Root extends Component {

  componentDidMount () {
    store.dispatch(fetchStudents());
    store.dispatch(fetchCampuses());
  }

  render() {
    return (
      <div>
        <h1>This is the Main / Home!</h1>
        <Link to="/campuses">Campuses</Link>
        <br />
        <Link to="/students">Students</Link>
        <Switch>
          <Route exact path="/campuses/new" component={AddCampus} />
          <Route exact path="/campuses/:capusId/edit" component={EditCampus} />
          <Route exact path ="/campuses/:campusId" component={SingleCampus} />
          <Route exact path="/campuses" component={Campuses} />
          <Route exact path="/students" component={Students} />
          <Route exact path="/students/new" component={AddStudent} />
          <Route exact path="/students/:studentId/edit" component={EditStudent} />
          <Route exact path="/students/:studentId" component={SingleStudent} />
        </Switch>
      </div>
    )
  }
}

