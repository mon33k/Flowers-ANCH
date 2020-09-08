import React, { Component } from 'react'
import '../stylesheets/villagerFilter.css';
import { Form, Row, Col, Image} from 'react-bootstrap';

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
            personalitySelected: [],
            //species
            speciesSelected: [],
            //gender
            genderSelected:[],
            //hobby
            hobbySelected: []
        }
    }

    componentDidMount() {
        this.getAllVillagers();
    }

    getAllVillagers() {
        let a = [{"species": '', 'id': 0}]
        
        
        axios.get(`http://acnhapi.com/v1/villagers`).then(res => {
            let largeObj = res.data
            for (const villagerObj in largeObj) {
                console.log('species to insert in arr --->', largeObj[villagerObj].species)
                // if(a["species"] !== largeObj[villagerObj.species]) {
                //     a.push({"species": largeObj[villagerObj].species, "id": villagerObj.id})
                // }
                
            }
        })

        console.log("speciesArr ---> ", a)
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
                        <fieldset>
                            <Form.Group as={Row}>
                                <Form.Label as="legend" column sm={2}>
                                    Choose personality
                                </Form.Label>
                                <Col sm={10}>
                                    <Form.Check
                                        type="radio"
                                        label="first radio"
                                        name="formHorizontalRadios"
                                        id="formHorizontalRadios1"
                                    />
                                    <Form.Check
                                        type="radio"
                                        label="second radio"
                                        name="formHorizontalRadios"
                                        id="formHorizontalRadios2"
                                    />
                                    <Form.Check
                                        type="radio"
                                        label="third radio"
                                        name="formHorizontalRadios"
                                        id="formHorizontalRadios3"
                                    />
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