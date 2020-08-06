import React, {Component} from 'react';
import {Route, Switch, Link} from 'react-router-dom';
import LandingPage from './LandingPage';
import FlowerFilter from './FlowerFilter';
import '../stylesheets/navbar.css';

const NavBar = () => {
    return (
        <div>
            <nav className='navigationBar'>
                <Link to='/landing'>Home</Link>
                <br></br>
                <Link to='/allFlowers'>Flowers</Link>
            </nav>
            
            <Switch>
                <Route path='/landing'>
                    <LandingPage/>
                </Route>
                <Route path='/allFlowers'>
                    <FlowerFilter/>
                </Route>
            </Switch>
        </div>
    )
}

export default NavBar 

