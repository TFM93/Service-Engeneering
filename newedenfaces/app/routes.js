import React from 'react';
import {Route} from 'react-router';
import App from './components/App';
import Home from './components/Home';
import AddCharacter from './components/AddCharacter'
import Character from './components/Character'
import DashboardClient from './components/DashboardClient'
import DashboardEmployee from './components/DashboardEmployee'

export default (
    <Route component={App}>
        <Route path='/' component={Home}/>
        <Route path ='/add' component={AddCharacter}/>
        <Route path='/characters/:id' component={Character} />
        <Route path='/dashboardClient' component={DashboardClient} />
        <Route path='/dashboardEmployee' component={DashboardEmployee} />
    </Route>
);