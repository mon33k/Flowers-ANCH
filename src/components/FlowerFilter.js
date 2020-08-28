import React, { Component } from 'react'
import '../stylesheets/flowerFilter.css';
import {Dropdown, DropdownButton} from 'react-bootstrap';
import flowerData from '../data/flowerData.json';


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
        // console.log("flower image", flowerImage.mainColorArr)
        this.setState({
            displayedFlowers: {'id': id, 'name': flower, 'colors': flowerImage.colorArr}
        })
    }

    getHybridFlowerImages(color, id) {
        console.log("color, id ", color, id)
        let flowerImage = this.state.hybridFlowers.find(elem => {
            if(elem.id.toString() === id ){
                return elem
            }
        })
        let hybridFlower = []
        flowerImage.colorArr.forEach(e => {
            if(e.combo.includes(color)){
                hybridFlower.push(e.color)
            }
        })
        console.log("flowerImage ", this.state.displayedFlowers.name)
        this.setState({
            displayedFlowers: {'id': id, 'name': this.state.displayedFlowers.name, 'colors': hybridFlower} 
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
        console.log("diplayedFlowers ", this.state.displayedFlowers)
        // console.log("hybrid flowers -> ", this.state.hybridFlowers)
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
                <div>
                    {displayedFlowers.length !== 0 ? displayedFlowers.colors.map(color => (
                            <img onClick={this.handleClickHybridFlower} name={color} id={displayedFlowers.id} key={Math.random(displayedFlowers.id)} src={require(`../stylesheets/images/anchflowers/${displayedFlowers.name}/NH-${color}_${displayedFlowers.name}-icon.png`)}/>
                    )) : ""}
                </div>

            </div>
        )
    }

}

export default FlowerFilter