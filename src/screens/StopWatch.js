import React, { Component } from 'react'
import "../styles/entryApp/entryApp.css"
import Button from "../components/ui/button/Button"

class StopWatch extends Component {
    constructor(props) {
        super(props);

        this.myTimer = null;
        this.myLap = null;
        this.newLap = {}
        this.allLaps = []

        this.myVariable = {};

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
            this.setState({
                milliseconds: this.state.milliseconds + 1,
            })


            this.state.milliseconds === 100 && this.setState({
                milliseconds: 0,
                seconds: this.state.seconds + 1,
            })

            this.state.seconds === 59 && this.setState({
                milliseconds: 0,
                seconds: 0,
                minutes: this.state.minutes + 1,
            })

            this.state.seconds === 59 && this.setState({
                milliseconds: 0,
                seconds: 0,
                minutes: 0,
                hours: this.state.hours + 1
            })
        }, 10)
    }

    restartTimer = () => {
        this.setState({
            hours: 0,
            seconds: 0,
            minutes: 0,
            milliseconds: 0,
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
        this.setState({
            hours: 0,
            minutes: 0,
            seconds: 0,
            milliseconds: 0,
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


export default StopWatch