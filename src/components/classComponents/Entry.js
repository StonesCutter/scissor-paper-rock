import React, { Component } from 'react'
import Button from '../ui/button/Button';
import NewInput from '../ui/input/NewInput';
import { getLocalStorage, setLocalStorage } from '../../utils/getLocalStorage';
import "../../styles/entryApp/entryApp.css"


// PUNTI PROGETTO

// 1. Classifica display con nomi e se uguali li sovrascrive 
// 2. LocalStorage (nome utente, punteggio finale partita)
// 3. Input utente
// 4. Animazioni
// 5. Opzionale barra di ricerca 
// 6. schermata di ingresso (da pensare)

// STATI: scelta cpu, scelta utente, risultato partita, risultato round, classifica display, toggle button

// Componenti
// 1. EntryApp --> Classe 
// 2. Bottoni, input,

// versione prova stato 

// useState({
//     utenti: [
//         {
//             nome: "",
//             punteggioFinale: 0
//         },
//     ],
//     sceltaCpu: "",
//     sceltaUtente: "",
//     risultatoRound: [0, 0]
// })


class Entry extends Component {
    constructor(props) {
        super(props);

        this.userName = "";

        if (!localStorage.getItem("users")) {
            localStorage.setItem("users", JSON.stringify([]))
        }

        this.matrix = [
            [0, -1, 1],
            [1, 0, -1],
            [-1, 1, 0]
        ];

        // this.choices = ['rock', 'paper', 'scissors'];

        this.sceltaCpu = null;
        this.sceltaUser = null;


        this.state = {
            // users: [],
            // sceltaCpu: null,
            // sceltaUtente: null,
            winsCpu: 0, // round
            winsUser: 0, //round
            isEnded: false,
        }
    }

    componentDidMount() {
    }

    componentDidUpdate(prevProps, prevState) {
        console.log("prevState", prevState);
        console.log("state", this.state);
    }

    // funzione pr determinare chi ha vinto
    winnerRound = (sceltaUtente, sceltaCpu) => {

        console.log(sceltaUtente, sceltaCpu);
        let check = this.matrix[sceltaUtente][sceltaCpu]

        let winnerRound = Object.assign({}, this.state)

        switch (check) {
            case 1:
                winnerRound.winsUser++
                console.log("wins user");
                break;
            case -1:
                winnerRound.sceltaCpu++
                console.log("winsCpu");
                break;
            default: console.log("Pareggio");
        }

        this.setState({
            winsUser: winnerRound.winsUser,
            winsCpu: winnerRound.winsCpu
        })
    }

    determineWinner = () => {
        Math.abs(this.state.winsUser - this.state.winsCpu)
    }


    // scelta cpu
    cpuChoice() {
        let cpu = Math.floor((Math.random() * 3));
        return cpu;
    }

    inputName = (e) => {
        this.userName = e.target.value;
    }

    addNewUser = () => {
        let newUser = {
            name: this.userName,
            result: 0
        }

        let getUsers = getLocalStorage("users")
        getUsers.push(newUser)
        setLocalStorage("users", getUsers)

        // this.setState({
        //     userName: this.userName
        // })

    }

    scissor = () => {
        // this.setState({
        //     sceltaUtente: 2,
        //     sceltaCpu: this.cpuChoice()
        // })

        let sceltaUtente = 2;
        let sceltaCpu = this.cpuChoice()

        this.winnerRound(sceltaUtente, sceltaCpu)

    }

    rock = () => {
        let sceltaUtente = 0;
        let sceltaCpu = this.cpuChoice()

        this.winnerRound(sceltaUtente, sceltaCpu)

        // this.setState({
        //     sceltaUtente: 0,
        //     sceltaCpu: this.cpuChoice()
        // })
    }

    paper = () => {
        let sceltaUtente = 1;
        let sceltaCpu = this.cpuChoice()

        this.winnerRound(sceltaUtente, sceltaCpu)


        // this.setState({
        //     sceltaUtente: 1,
        //     sceltaCpu: this.cpuChoice()
        // })
    }



    componentWillUnmount() { }

    render() {
        return (
            <div>
                <h1>Start Game</h1>

                <div>
                    <NewInput
                        label={ "Name" }
                        typeInput={ "text" }
                        callbackInput={ this.inputName }
                    />
                    <Button
                        callBackButton={ this.addNewUser }
                        label={ "Add User" }
                        styleCss={ "btn" }
                    />

                    <div className='container__card'>
                        <Button
                            callBackButton={ this.paper }
                            label={ "Carta" }
                            styleCss={ "btn" }
                        />
                        <Button
                            callBackButton={ this.scissor }
                            label={ "Forbici" }
                            styleCss={ "btn" }
                        />
                        <Button
                            callBackButton={ this.rock }
                            label={ "Sasso" }
                            styleCss={ "btn" }
                        />
                        <Button
                            callBackButton={ this.cpuChoice }
                            label={ "Cpu" }
                            styleCss={ "btn" }
                        />

                    </div>
                </div>
            </div>
        )
    }
}


export default Entry