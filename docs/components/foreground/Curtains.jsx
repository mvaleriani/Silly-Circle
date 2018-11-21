import React from 'react';

class Curtains extends React.Component{
    constructor(props){
        super(props);
        this.onWindowResize = this.onWindowResize.bind(this);
        this.resizeCleanup = this.resizeCleanup.bind(this);

        this.resizeRunning = false;
        this.newNumFolds;
        this.staticCurtainRef;

        this.state = {
            folds: []
        };
    }

    componentDidMount(){
        let newFolds = [];
        this.staticCurtainRef = document.getElementById("static-curtain-ref");
        this.newNumFolds = Math.floor(this.staticCurtainRef.clientWidth / 25) + 2;

        for (let i = 0; i < this.newNumFolds; i++) {
            let newF = (<div className="curtain-fold" key={i} style={{ flex: `${1 + Math.random()}` }}><div className="curtain-shadow"></div></div> )
            newFolds.push(newF);
        }
        this.newNumFolds += 1;
        this.setState({folds: newFolds});
        window.addEventListener('resize', this.onWindowResize, false);
        console.log(this.staticCurtainRef);
        
    }

    shouldComponentUpdate(nextProps, nextState){
        if (nextState.folds.length === this.newNumFolds || this.state.folds.length === 0) {
            this.resizeRunning = false;
            return true;
        }
        this.resizeRunning = false;
        return true;
        // return false;
    }

    onWindowResize(e){
        
        if(!this.resizeRunning){
            this.resizeRunning = true;
            let newFolds = [];
            this.newNumFolds = Math.floor(document.getElementById("static-curtain-ref").clientWidth / 25) + 2;
            // debugger;
            if (this.newNumFolds <= this.state.folds.length) {
                newFolds = this.state.folds.slice(0, this.newNumFolds)
            }else{
                newFolds = this.state.folds;
                for (let i = this.state.folds.length; i < this.newNumFolds; i++) {
                    newFolds.push(<div className="curtain-fold" key={i} style={{ flex: `${1 + Math.random()}` }}><div className="curtain-shadow"></div></div>);
                }
            }
            this.setState({ folds: newFolds });
            this.resizeCleanup();
        }
    }

    resizeCleanup(){
        if (this.resizeRunning) {
            setTimeout(this.resizeCleanup, 50)
        } else if (Math.floor(this.staticCurtainRef.clientWidth / 25) + 2 === this.newNumPlanks) {
            let newFolds = [];
            this.newNumFolds = Math.floor(this.staticCurtainRef.clientWidth / 25) + 2;

            for (let i = 0; i < this.newNumPlanks; i++) {
                let newF = (<div className="curtain-fold" key={i} style={{ flex: `${1 + Math.random()}` }}><div className="curtain-shadow"></div></div>);
                newFolds.push(newF)
            }
            this.setState({ folds: newFolds });
        }
    }

    render(){
        return(
            <div id="curtain-container">
                <div id="decorative">
                    <div id="static-curtain-ref" className="static-curtain">
                        {this.state.folds} 
                    </div>
                    <div className="static-curtain" style={{ transform: 'scaleX(-1)' }}>
                        {this.state.folds}
                    </div>
                </div>
            </div>
        );
    }
}

export default Curtains;