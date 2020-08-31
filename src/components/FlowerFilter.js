import React, { Component } from 'react'
import '../stylesheets/flowerFilter.css';
import {Dropdown, DropdownButton} from 'react-bootstrap';
import flowerData from '../data/flowerData.json';
import FlowerInfo from './FlowerInfo';

class FlowerFilter extends Component {
    constructor() {
        super()
        this.state = {
            mainFlowers: [],
            hybridFlowers:[],
            flowerNames: [],
            displayedFlowers: []
        }

        this.handleClickMainFlower = this.handleClickMainFlower.bind(this);
        this.handleClickHybridFlower = this.handleClickHybridFlower.bind(this)
    }

    componentDidMount(){
        this.getFlowerNames()
    }

    getFlowerNames() {
        const flowerNameArr = flowerData.mainBreeds.map(flower => {
            return {id: flower.id, name: flower.name}
        });

        const mainFlowersArr = flowerData.mainBreeds.map(flower => {
            return {id: flower.id, colorArr: flower.seedColors}
        })

        const hybridFlowersArr = flowerData.mainBreeds.map(flower => {
            return {id: flower.id, colorArr: flower.hybridColors}
        })

        this.setState({
            flowerNames: flowerNameArr,
            mainFlowers: mainFlowersArr,
            hybridFlowers: hybridFlowersArr 
        })
    }

    getMainFlowerImages(flower, id) {
        let flowerImage = this.state.mainFlowers.find(elem => {
            if(elem.id.toString() === id) {
                return elem
            } 
        })
        this.setState({
            displayedFlowers: {'id': id, 'name': flower, 'colors': flowerImage.colorArr}
        })
    }

    getHybridFlowerImages(color, id) {
        // console.log("color, id ", color, id)
        let flowerImage = this.state.hybridFlowers.find(elem => {
            if(elem.id.toString() === id ){
                return elem
            }
        })

        let hybridFlower = []
        let hybridFlowerCombo = []
        flowerImage.colorArr.forEach(e => {
            if(e.combo.includes(color)){
                hybridFlowerCombo.push(e.combo)
                hybridFlower.push(e.color)
            } else if (e.color === color) {
                hybridFlowerCombo.push(e.combo)
                hybridFlower.push(e.color)
            }
        })

        this.setState({
            displayedFlowers: {'id': id, 'name': this.state.displayedFlowers.name, 'colors': hybridFlower, 'combo': hybridFlowerCombo, 'clickedColor': color} 
        })
    } 

    handleClickMainFlower(e) {
        e.preventDefault();
        let flowerClicked = e.target.innerHTML
        let flowerId = e.target.value
        this.getMainFlowerImages(flowerClicked, flowerId)
    }

    handleClickHybridFlower(e) {
        e.preventDefault();
        let flowerClicked = e.target.name
        let flowerId = e.target.id
        this.getHybridFlowerImages(flowerClicked, flowerId)
    }

    render() {
        const {displayedFlowers} = this.state

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
                            <Dropdown.Item as="button" key={mainFlower.id} value={mainFlower.id} onClick={this.handleClickMainFlower}>{mainFlower.name}</Dropdown.Item>
                        ))}
                    </DropdownButton>
                </div>
                <div className="flower-container">
                    <div>
                    {displayedFlowers.length !== 0 ? displayedFlowers.colors.map(color => (
                            <img onClick={this.handleClickHybridFlower} name={color} id={displayedFlowers.id} key={Math.random(displayedFlowers.id)} src={require(`../stylesheets/images/anchflowers/${displayedFlowers.name}/NH-${color}_${displayedFlowers.name}-icon.png`)}/>
                    )) : ""}
                    </div>
                        {displayedFlowers.clickedColor ? <FlowerInfo displayedFlowers={displayedFlowers} /> : ""}
                </div>
                
            </div>
        )
    }

}

export default FlowerFilter