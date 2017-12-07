import React, { Component } from 'react';
import Campuses from './Campuses';
import Students from './Students';
import { Route, Switch, NavLink } from 'react-router-dom';
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
        <NavLink to="/campuses">Campuses</NavLink>
        <NavLink to="/students">Students</NavLink>
        <Switch>
          <Route exact path="/campuses" component={Campuses} />
          <Route exact path="/students" component={Students} />
        </Switch>

      </div>
    )
  }
}

