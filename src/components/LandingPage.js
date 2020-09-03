import React, {Component} from 'react'
import {Jumbotron, Button, Container} from 'react-bootstrap'
import '../stylesheets/landingPage.css';

const LandingPage = () => {
    return (
        <div>
            <Jumbotron fluid as='div' className='jumbotron-container'>
                <Container className='text-container'>
                    <h1>Animal Crossing New Horizons Flower Index</h1>
                    <p>
                        You can choose to filter a specific breed of flower or .. etc
                    </p>
                    <p>
                        <Button variant="primary">Learn more</Button>
                    </p>
                </Container>
            </Jumbotron>
        </div>
    )
}

export default LandingPage