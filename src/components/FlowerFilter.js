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

        this.handleClickHybridFlower = this.handleClickHybridFlower.bind(this);
        this.handleClickShowCombo = this.handleClickShowCombo.bind(this);
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

    getHybridFlowerImages(flower, id, color) {
        let flowerImage = this.state.hybridFlowers.find(elem => {
            if(elem.id.toString() === id) {
                console.log('elem in flowerImage => ', elem)
                return elem
            } 
        })


        this.setState({
            displayedFlowers: {'id': id, 'name': flower, 'colors': flowerImage.colorArr, 'clickedColor': color}
        })
    }

    handleClickHybridFlower(e) {
        e.preventDefault();
        let flowerClicked = e.target.innerHTML
        let flowerId = e.target.id
        let flowerColor = e.target.value
        this.getHybridFlowerImages(flowerClicked, flowerId, flowerColor)
    }

    getComboSeedFlowers(breed, id, color) {
        let flowerColorToShow = []
        this.state.hybridFlowers.forEach(e => {
            if(e.id.toString() === id) {
                e.colorArr.find(hybridColor => {
                    if(hybridColor.color === color) {
                        flowerColorToShow = hybridColor.combo //returns ['red', 'yellow'] if user clicked an organge flower for example
                    }
                })
            } 
        })

        this.setState({
            displayedFlowers: {'id': id, 'name': breed, 'colors': flowerColorToShow, 'clickedColor': color}
        })

    }

    handleClickShowCombo(e) {
        e.preventDefault();
        let flowerBreed = e.target.alt.split(',')[0]
        let flowerId = e.target.id
        let flowerColor = e.target.alt.split(',')[1]

        this.getComboSeedFlowers(flowerBreed, flowerId, flowerColor)
    }


    render() {
        const {displayedFlowers} = this.state
        
        console.log("displayedFlowers ", displayedFlowers)

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
                        {this.state.flowerNames.map(flower => (
                            <Dropdown.Item as="button" key={flower.id} id={flower.id} value={flower.name} onClick={this.handleClickHybridFlower}>{flower.name}</Dropdown.Item>
                        ))}
                    </DropdownButton>
                </div>
                <div className="flower-container">
                    <div>
                    {displayedFlowers.length !== 0 ? displayedFlowers.colors.map(flower => (
                            <img onClick={this.handleClickShowCombo} alt={[displayedFlowers.name, flower.color]} id={displayedFlowers.id} key={Math.random(displayedFlowers.id)} src={require(`../stylesheets/images/anchflowers/${displayedFlowers.name}/NH-${flower.color ? flower.color : flower}_${displayedFlowers.name}-icon.png`)}/>
                    )) : ""}
                    </div>
                        {/* {displayedFlowers.clickedColor ? <FlowerInfo displayedFlowers={displayedFlowers} /> : ""} */}
                </div>
                
            </div>
        )
    }

}

export default FlowerFilter