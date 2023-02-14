import React, { Component } from 'react'
import "../styles/entryApp/entryApp.css"
import Button from "../components/ui/button/Button"

class StopWatch2 extends Component {
    constructor(props) {
        super(props);

        this.myTimer = null;
        this.myLap = null;
        this.newLap = {}
        this.allLaps = []

        this.millescondsNew = 0
        this.secondsNew = 0
        this.minutesNew = 0
        this.hoursNew = 0


        //state controllo timer
        this.state = {
            hours: 0,
            minutes: 0,
            seconds: 0,
            milliseconds: 0,
            allLaps: [],
            toggle: false,
            countLaps: 0
        }
        // this.newObj = Object.assign({}, this.state)
    }

    componentDidMount() {
        console.log("componentDidMount");
    }

    componentDidUpdate(prevProps, prevState) {
        console.log("prevState: " + prevState.seconds);
    }

    startTimer = () => {
        console.log("start")

        // setto il toggle su true cos' parte il timer
        this.setState({
            toggle: !this.state.toggle
        })


        this.myTimer = setInterval(() => {

            this.millescondsNew = this.millescondsNew + 1

            if (this.millescondsNew === 100) {
                this.millescondsNew = 0;
                this.secondsNew = this.secondsNew += 1
            }
            // console.log("New obj", this.newObj);
            console.log("secondsNew", this.secondsNew);

            if (this.secondsNew === 59) {
                this.millescondsNew = 0;
                this.secondsNew = 0;
                this.minutesNew = this.minutesNew += 1;
            }
            if (this.minutesNew === 59) {
                this.millescondsNew = 0;
                this.secondsNew = 0;
                this.minutesNew = 0
                this.hours = this.hours += 1;
            }

            this.setState({
                milliseconds: this.millescondsNew,
                seconds: this.secondsNew,
                minutes: this.minutesNew,
            })
        }, 10)
    }

    restartTimer = () => {
        this.secondsNew = 0;
        this.minutesNew = 0;
        this.millescondsNew = 0;
        this.hoursNew = 0;

        this.setState({
            hours: this.hoursNew,
            minutes: this.minutesNew,
            seconds: this.secondsNew,
            milliseconds: this.millescondsNew,
        })

    }

    saveLap = () => {
        this.myLap = Object.assign({}, this.state)

        this.setState({
            allLaps: [this.myLap, ...this.state.allLaps],
            countLaps: this.state.countLaps + 1
        })
    }

    pauseTimer = () => {
        this.setState({
            toggle: !this.state.toggle
        })
        clearInterval(this.myTimer)
    }

    resetTimer = () => {
        this.secondsNew = 0;
        this.minutesNew = 0;
        this.millescondsNew = 0;
        this.hoursNew = 0;

        this.setState({
            hours: this.hoursNew,
            minutes: this.minutesNew,
            seconds: this.secondsNew,
            milliseconds: this.millescondsNew,
        })
        clearInterval(this.myTimer)
    }

    componentWillUnmount() {
        clearInterval(this.myTimer)
    }

    mapSaveLaps = (item, key) => {
        return (
            <div className='container__timer' key={ `${key}-${Math.floor(Math.random() * 1000)}` }>
                <p>Lap n. { item.countLaps }</p>
                <p>H:
                    <span>{ item.hours }</span>
                </p>
                <p>M:
                    <span>{ item.minutes }</span>
                </p>
                <p>S:
                    <span>{ item.seconds }</span>
                </p>
            </div>
        )
    }


    render() {
        return (
            <div className='App-header '>

                <div className='container__timer-display'>
                    <h2>Stopwatch</h2>
                    <div className='display'>
                        <span>
                            { String(this.state.hours).padStart(2, "0") }
                        </span>
                        <span>
                            { String(this.state.minutes).padStart(2, "0") }
                        </span>
                        <span>
                            { String(this.state.seconds).padStart(2, "0") }
                        </span>
                        <span>
                            { String(this.state.milliseconds).padStart(3, "0") }

                        </span>
                    </div>
                </div>
                <div className='container'>
                    <div className='container__btn'>
                        { !this.state.toggle && <Button
                            label={ "start" }
                            callBackButton={ this.startTimer }
                            styleCss={ "start" }

                        /> }
                        { this.state.toggle && <Button
                            label={ "pause" }
                            callBackButton={ this.pauseTimer }
                            styleCss={ "pause" }
                        /> }
                        <Button
                            label={ "restart" }
                            callBackButton={ this.restartTimer }
                            styleCss={ "btn" }
                        />
                        <Button
                            label={ "reset" }
                            callBackButton={ this.resetTimer }
                            styleCss={ "delete" }
                        />
                        <Button
                            label={ "save lap" }
                            callBackButton={ this.saveLap }
                            styleCss={ "btn" }
                        />
                    </div>
                </div>

                { this.state.allLaps.map(this.mapSaveLaps) }

            </div>
        )
    }
}


export default StopWatch2