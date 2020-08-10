import React, { Component } from 'react'
import '../stylesheets/flowerFilter.css';
import {Dropdown, DropdownButton} from 'react-bootstrap';
import flowerData from '../data/flowerData.json';

class FlowerFilter extends Component {
    constructor() {
        super()
        this.state = {
            // flowers: []
        }
    }

componentDidMount(){
    // const {flowers} = this.state
    flowerData.forEach(element => {
        console.log("flower json", element)
    });
}


    render() {
        return (
            <div className='main-container'>
                <h1>Filter Flowers</h1>
                <div className="leftNav col-md-4">
                    <DropdownButton
                        as='ButtonGroup'
                        key='right'
                        id='dropdown-button-drop-right'
                        drop='right'
                        variant="secondary"
                        size='lg'
                        title='Select Flower Breed'
                    >
                        <Dropdown.Item eventKey="1">Action</Dropdown.Item>
                        <Dropdown.Item eventKey="2">Another action</Dropdown.Item>
                        <Dropdown.Item eventKey="3">Something else here</Dropdown.Item>
                        <Dropdown.Divider />
                        <Dropdown.Item eventKey="4">Separated link</Dropdown.Item>
                    </DropdownButton>
                </div>
            </div>
        )
    }

}

export default FlowerFilter