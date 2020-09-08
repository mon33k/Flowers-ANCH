import React, {Component} from 'react';
import { render } from 'react-dom';
import "../stylesheets/flowerInfo.css"

const FlowerInfo = (props) => { 

    let flowerToShow = props.displayedFlowers

    console.log('props.displayedFlowers -->  ', props.displayedFlowers)
        return (
            <div className="flowerInfoList">
                {/* {props.displayedFlowers.colors.length >= 1 ? 
                <ul>
                    <li>Breed: {flowerToShow.name}</li>
                    <li>Color: {flowerToShow.clickedColor}</li>
                    <li>Seed Color Combination: <br></br> {flowerToShow.combo[0].length > 0 ? flowerToShow.combo[0].map(seedColor => (
                        <img class="seedComboFlowers" src={require(`../stylesheets/images/anchflowers/${flowerToShow.name}/NH-${seedColor}_${flowerToShow.name}-icon.png`)}/>
                    )) : ""}</li><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M24 10h-10v-10h-4v10h-10v4h10v10h4v-10h10z"/></svg>
                    
                </ul>
                : ""
                } */}
            </div>
        )
}

export default FlowerInfo
