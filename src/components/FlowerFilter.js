import React, { Component } from 'react'
import '../stylesheets/flowerFilter.css';
import {Dropdown, DropdownButton} from 'react-bootstrap';
import flowerData from '../data/flowerData.json';

class FlowerFilter extends Component {
    constructor() {
        super()
        this.state = {
            flowerNames: []
        }

        this.handleClickMainFlower = this.handleClickMainFlower.bind(this);
    }

componentDidMount(){
    this.getFlowerNames()
}

    getFlowerNames() {
        const {flowerNames} = this.state
        const flowerNameArr = flowerData.mainBreeds.map(elem => {
            return {id: elem.id, name: elem.name}
        });
        console.log("flowerNameArr", flowerNameArr)
        this.setState({
            flowerNames: flowerNameArr
        })
    }

    handleClickMainFlower(e) {
        e.preventDefault();
        console.log("clicked flower ", e.target.innerHTML)
    }


    render() {
        return (
            <div className='main-container'>
                <h1>Filter Flowers</h1>
                <div className="leftNav col-md-4">
                    <DropdownButton
                        key='right'
                        id='dropdown-button-drop-right'
                        drop='right'
                        variant="secondary"
                        size='lg'
                        title='Select Flower Breed'
                    >
                        {this.state.flowerNames.map(mainFlower => (
                            <Dropdown.Item key={mainFlower.id} onClick={this.handleClickMainFlower} value={mainFlower.name}>{mainFlower.name}</Dropdown.Item>
                        ))}
                    </DropdownButton>
                </div>
            </div>
        )
    }

}

export default FlowerFilter