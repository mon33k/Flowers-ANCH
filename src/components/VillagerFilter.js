import React, { Component } from 'react'
import '../stylesheets/villagerFilter.css';
import { Form, Row, Col, Image, DropdownButton, Dropdown} from 'react-bootstrap';

const axios = require('axios');


class VillagerFilter extends Component {
    constructor() {
        super()
        this.state = {
            //allvillagers
            allVillagers: [],
            //clicked villager
            clickedVillager: [],
            //personality
            personality: [],
            //species
            species: [],
            //gender
            genderSelected:[],
            //hobby
            hobbySelected: []
        }

        this.handleClickSpecies = this.handleClickSpecies.bind(this);

    }

    componentDidMount() {
        this.getAllVillagers();
    }

    getAllVillagers() {
        let speciesArr = []
        let personalityArr = []
        let dataArr = []

        axios.get(`http://acnhapi.com/v1/villagers`).then(res => {
            let largeObj = res.data
            
            for (const villagerObj in largeObj) {
                //console.log('each elem ', largeObj[villagerObj])
                dataArr.push(largeObj[villagerObj])
                if(!speciesArr.includes(`${largeObj[villagerObj].species}`)) { // ** want to reverse the value and the key **
                    speciesArr.push(largeObj[villagerObj].species)
                } else if (!personalityArr.includes(`${largeObj[villagerObj].personality}`)) {
                    personalityArr.push(`${largeObj[villagerObj].personality}`)
                } 
            }

            this.setState({
                allVillagers: dataArr,
                species: speciesArr,
                personality: personalityArr
            })
        })
    }

    handleClickSpecies(e) {
        e.preventDefault();
        console.log("valueee ==> ", e.target.value)
    }

    render() {
        return (
            <div className='main-villager-container'>
                <h1 className='villager-header'>Villager Filter</h1>
                <div className='form-container'>
                
                <Form>
                        <Form.Group as={Row}>
                            <Form.Label column sm={2}> 
                                Search for Villager
                            </Form.Label>
                            <Col sm={10}>
                                <Form.Control type="search" placeholder="search" />
                            </Col>
                        </Form.Group>

                        <div className="villagerFilterDropdown">
                            <DropdownButton
                                key='right'
                                id='dropdown-button-drop-right'
                                drop='right'
                                variant=""
                                size='lg'
                                title='Select Villager Species'
                                className='villagerFilterDropdown-btn'
                            >
                                {this.state.species.map((villager, i) => (
                                    <Dropdown.Item as="button" key={i} onClick={this.handleClickSpecies} value={villager}>{villager}</Dropdown.Item>
                                ))}
                            </DropdownButton>
                        </div>

                        <fieldset>
                            <Form.Group as={Row}>
                                <Form.Label as="legend" column sm={2}>
                                    Choose personality
                                </Form.Label>
                                <Col sm={10} className="villagerPersonality-container">
                                    {this.state.personality.map((personalityItem, i) => (
                                        <Form.Check
                                        type="radio"
                                        label={`${personalityItem}`}
                                        name="formHorizontalRadios"
                                        key={`${i}`}
                                        className='personality-item'
                                    />
                                    ))}
                                </Col>
                            </Form.Group>
                        </fieldset>
                    </Form>
                </div>
                <div className='villager-container'>
                    <Row>
                        <Col xs={6} md={4}>
                        <Image src="https://www.ilac.com/wp-content/uploads/2019/06/placeholder-600x400.png" thumbnail/>
                        </Col>
                    </Row>
                
                </div>
            </div>
        )
    }
}

export default VillagerFilter;