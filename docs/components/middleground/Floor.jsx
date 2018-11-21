import React from 'react';
import Plank from './Plank';

class Floor extends React.Component{
    constructor(props){
        super(props);

        this.onWindowResize = this.onWindowResize.bind(this);
        this.resizeCleanup = this.resizeCleanup.bind(this);
        this.resizeRunning = false;
        this.newNumPlanks;

        this.state = {
            planks: []
        }
    }

    componentDidMount(){
        let newPlanks = [];
        this.newNumPlanks = Math.floor(window.innerWidth / 100) + 2;
        
        for (let i = 0; i < this.newNumPlanks; i++) {
            let newP = (<Plank key={i} />);
            newPlanks.push(newP)
        }
        this.newNumPlanks += 1;
        this.setState({planks: newPlanks});
        window.addEventListener('resize', this.onWindowResize, false);
    }

    shouldComponentUpdate(nextProps, nextState){
        if (nextState.planks.length === this.newNumPlanks || this.state.planks.length === 0) {
            this.resizeRunning = false;
            return true;
        }    
        return false;
    }

    resizeCleanup(){
        if(this.resizeRunning){
            setTimeout(this.resizeCleanup, 50)
        } else if (Math.floor(window.innerWidth / 100) + 2 === this.newNumPlanks) {
            let newPlanks = [];
            this.newNumPlanks = Math.floor(window.innerWidth / 100) + 2;

            for (let i = 0; i < this.newNumPlanks; i++) {
                let newP = (<Plank key={i} />);
                newPlanks.push(newP)
            }
            this.setState({planks: newPlanks});
        }
    }

    onWindowResize(e) {
        if (!this.resizeRunning) {
            this.resizeRunning = true;
            let newPlanks = [];
            this.newNumPlanks = Math.floor(e.target.innerWidth / 100) + 2;

            if (this.newNumPlanks <= this.state.planks.length) {
                newPlanks = this.state.planks.slice(0, this.newNumPlanks)
            } else {
                newPlanks = this.state.planks;
                for (let i = this.state.planks.length; i < this.newNumPlanks; i++) {
                    newPlanks.push(<Plank key={i} />)
                }
            }
            this.setState({ planks: newPlanks });
            this.resizeCleanup();
        }
    }

    render(){
        return (
            <div id="floor">
                
                { this.state.planks }
                <div id="floor-shadow"></div>
                <div id="wall-shadow"></div>
            </div>
        );
    }
}

export default Floor;