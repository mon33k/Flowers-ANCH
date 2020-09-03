import React, {Component} from 'react';
import {Route, Switch, Link} from 'react-router-dom';
import LandingPage from './LandingPage';
import FlowerFilter from './FlowerFilter';
import VillagerFilter from './VillagerFilter'
import '../stylesheets/navbar.css';

const NavBar = () => {
    return (
        <div>
            <nav className='navigationBar'>
                <Link to='/landing'>Home</Link>
                <Link to='/allFlowers'>Flowers</Link>
                <Link to='/allVillagers'>Villagers</Link>
            </nav>
            
            <Switch>
                <Route path='/landing'>
                    <LandingPage/>
                </Route>
                <Route path='/allFlowers'>
                    <FlowerFilter/>
                </Route>
                <Route>
                    <VillagerFilter path='/allVillagers'/>
                </Route>
            </Switch>
        </div>
    )
}

export default NavBar 

