import React, { Component } from 'react'
import "../styles/entryApp/entryApp.css"
import Button from "../components/ui/button/Button"

class StopWatch3 extends Component {
    constructor(props) {
        super(props);

        this.myTimer = null;
        this.myLap = null;
        this.newLap = {}
        this.allLaps = []
        this.isRestart = false


        //state controllo timer
        this.state = {
            hours: 0,
            minutes: 0,
            seconds: 0,
            milliseconds: 0,
            allLaps: [],
            toggle: false,
            reset: false,
            countLaps: 1
        }
        // console.log("newObj", this.newObj);
    }

    componentDidMount() {
        console.log("componentDidMount");
    }

    componentDidUpdate(prevProps, prevState) {
        console.log("prevState: " + prevState.minutes);

    }

    // funzione che fa partire il timer
    startTimer = () => {
        //faccio la copia dello stato iniziale così da non mutarlo
        this.isRestart = !this.state.isRestart

        this.isPause = true
        console.log("isPause al click startTimer ", this.isPause);

        let newObj = Object.assign({}, this.state)


        if (this.isRestart === true) {
            newObj.milliseconds = 0
            newObj.seconds = 0
            newObj.minutes = 0
            newObj.hours = 0
            // newObj.toggle = false
            this.isVisible = false
            // this.isPause = false
        }

        console.log("startTimer")

        // setto il toggle su true così compaiono i bottoni pausa e reset
        this.setState({
            toggle: true,
            reset: true,
        })

        this.myTimer = setInterval(() => {

            newObj.milliseconds += 1

            if (newObj.milliseconds === 100) {
                newObj.milliseconds = 0;
                newObj.seconds = newObj.seconds + 1;
            }
            if (newObj.seconds === 59) {
                newObj.milliseconds = 0;
                newObj.seconds = 0;
                newObj.minutes = newObj.minutes + 1;
            }
            if (newObj.minutes === 59) {
                newObj.milliseconds = 0;
                newObj.seconds = 0;
                newObj.minutes = 0;
                newObj.hours = newObj.hours + 1;
            }
            this.setState({
                milliseconds: newObj.milliseconds,
                seconds: newObj.seconds,
                minutes: newObj.minutes,
            })
        }, 10)

    }

    // func per il restart 
    restartTimer = () => {

        this.setState({
            toggle: !this.state.toggle
        }
        )

        clearInterval(this.myTimer)

        this.setState({
            hours: 0,
            minutes: 0,
            seconds: 0,
            milliseconds: 0,
        })
        this.startTimer()
    }

    // func per salvare il giro
    saveLap = () => {
        // copia dello stato per salvare il giro in un array
        let myLap = Object.assign({}, this.state)

        this.setState({
            allLaps: [myLap, ...this.state.allLaps],
            countLaps: this.state.countLaps + 1
        })
    }

    // func per mettere in pausa
    pauseTimer = () => {
        this.setState({
            toggle: !this.state.toggle
        })
        clearInterval(this.myTimer)
    }

    // func per il reset
    resetTimer = () => {
        this.setState({
            allLaps: [],
            hours: 0,
            minutes: 0,
            seconds: 0,
            milliseconds: 0,
            toggle: false, // mi serve per il dispolay del button
            reset: false // mi serve per il dispolay del button
        })
        clearInterval(this.myTimer)
    }


    componentWillUnmount() {
        clearInterval(this.myTimer)
    }

    mapSaveLaps = (item, key) => {
        return (
            <div className='container__timer'
                key={ `${key}-${Math.floor(Math.random() * 1000)}` }>
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
                        { this.state.reset && <Button
                            label={ "reset" }
                            callBackButton={ this.resetTimer }
                            styleCss={ "delete" }
                        /> }
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


export default StopWatch3