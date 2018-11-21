import React from 'react';

const Plank = () => {
    let rotation;
    if ( Math.random() >= 0.5 ) {
        rotation = 0;
    }else{
        rotation = 180; 
    }
    
    return (
        <img className="plank" src="./assets/WoodGrain.png" style={{ transform: `rotate(${rotation}deg)` }}/>
    );
}

export default Plank;