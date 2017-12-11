import React, { Component } from 'react';

import AllCampuses from './AllCampuses';
import EditCampus from './EditCampus';
import AddCampus from './AddCampus';
import SingleCampus from './SingleCampus';

import Students from './Students';
import EditStudent from './EditStudent';
import AddStudent from './AddStudent';
import SingleStudent from './SingleStudent';

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
        <h1>The Margaret Hamilton Interplanetary Academy of JavaScript</h1>
        <div id="navigation">
        <Link to="/campuses">Explore Campuses</Link>
        <br />
        <Link to="/students">View Students</Link>
        </div>
        <Switch>
          <Route exact path="/campuses/new" component={AddCampus} />
          <Route exact path="/campuses/:campusId/edit" component={EditCampus} />
          <Route exact path ="/campuses/:campusId" component={SingleCampus} />
          <Route exact path="/campuses" component={AllCampuses} />
          <Route exact path="/students/:studentId/edit" component={EditStudent} />
          <Route exact path="/students/new" component={AddStudent} />
          <Route exact path="/students/:studentId" component={SingleStudent} />
          <Route exact path="/students" component={Students} />

        </Switch>
      </div>
    )
  }
}

