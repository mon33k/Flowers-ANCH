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

        // this.handleClickMainFlower = this.handleClickMainFlower.bind(this);
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

    // getMainFlowerImages(flower, id) {
    //     let flowerImage = this.state.mainFlowers.find(elem => {
    //         if(elem.id.toString() === id) {
    //             return elem
    //         } 
    //     })
    //     this.setState({
    //         displayedFlowers: {'id': id, 'name': flower, 'colors': flowerImage.colorArr}
    //     })
    // }

    // getHybridFlowerImages(color, id) {
    //     // console.log("color, id ", color, id)
    //     let flowerImage = this.state.hybridFlowers.find(elem => {
    //         if(elem.id.toString() === id ){
    //             return elem
    //         }
    //     })

    //     let hybridFlower = []
    //     let hybridFlowerCombo = []
    //     flowerImage.colorArr.forEach(e => {
    //         if(e.combo.includes(color)){
    //             hybridFlowerCombo.push(e.combo)
    //             hybridFlower.push(e.color)
    //         } else if (e.color === color) {
    //             hybridFlowerCombo.push(e.combo)
    //             hybridFlower.push(e.color)
    //         }
    //     })

    //     this.setState({
    //         displayedFlowers: {'id': id, 'name': this.state.displayedFlowers.name, 'colors': hybridFlower, 'combo': hybridFlowerCombo, 'clickedColor': color} 
    //     })
    // } 

    getHybridFlowerImages(flower, id, color) {
        console.log("current flower --> ", this.state.displayedFlowers)
        console.log("this.state.hybridFlowers -> ", this.state.hybridFlowers)
        let flowerImage = this.state.hybridFlowers.find(elem => {
            if(elem.id.toString() === id) {
                console.log('elem in flowerImage => ', elem)
                return elem
            } 
        })

        let colorsToShow = flowerImage.colorArr ? flowerImage.colorArr : color
        
        // if(!colorsToShow) {
        //     this.state.hybridFlowers.map(e => {
        //         if(e.color === color) {
        //             let colorsToshow = color
        //         }
        //     })
        // }

        console.log('clicked color', color)

        this.setState({
            displayedFlowers: {'id': id, 'name': flower, 'colors': colorsToShow, 'clickedColor': color}
        })
    }

    // handleClickMainFlower(e) {
    //     e.preventDefault();
    //     let flowerClicked = e.target.innerHTML
    //     let flowerId = e.target.value
    //     this.getMainFlowerImages(flowerClicked, flowerId)
    // }

    handleClickHybridFlower(e) {
        e.preventDefault();
        let flowerClicked = e.target.innerHTML
        let flowerId = e.target.value
        let flowerColor = e.target.alt
        this.getHybridFlowerImages(flowerClicked, flowerId, flowerColor)
    }

    render() {
        const {displayedFlowers} = this.state
        console.log('displayFlowers -> ', displayedFlowers)
        return (
            <div className='main-flower-container'>
                <h1 className="filterHeader">Filter Flowers</h1>
                <div className="flowerFilterDropdown">
                    <DropdownButton
                        key='right'
                        id='dropdown-button-drop-right'
                        drop='right'
                        variant=""
                        size='lg'
                        title='Select Flower Breed'
                        className='flowerFilterDropdown-btn'
                    >
                        {this.state.flowerNames.map(mainFlower => (
                            <Dropdown.Item as="button" key={mainFlower.id} value={mainFlower.id} onClick={this.handleClickHybridFlower}>{mainFlower.name}</Dropdown.Item>
                        ))}
                    </DropdownButton>
                </div>
                <div className="flower-container">
                    <div>
                    {displayedFlowers.length !== 0 ? displayedFlowers.colors.map(flower => (
                            <img onClick={this.handleClickHybridFlower} name={flower.name} alt={flower.color} value={displayedFlowers.id} key={Math.random(displayedFlowers.id)} src={require(`../stylesheets/images/anchflowers/${displayedFlowers.name}/NH-${flower.color}_${displayedFlowers.name}-icon.png`)}/>
                    )) : ""}
                    </div>
                        {displayedFlowers.clickedColor ? <FlowerInfo displayedFlowers={displayedFlowers} /> : ""}
                </div>
                
            </div>
        )
    }

}

export default FlowerFilter