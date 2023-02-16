import React, { Component } from 'react'
import Button from '../ui/button/Button';
import NewInput from '../ui/input/NewInput';
import { getLocalStorage, setLocalStorage } from '../../utils/getLocalStorage';
// import "../../styles/entryApp/entryApp.css"
import "./entry.css"
import { motion } from "framer-motion"


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
            localStorage.setItem("users", JSON.stringify([
                {
                    name: 'player1',
                    result: 3,
                    // rank: [],
                    id: Math.floor(Math.random() * 10000)
                },
                {
                    name: 'player2',
                    result: 2,
                    // rank: [],
                    id: Math.floor(Math.random() * 10000)
                },
                {
                    name: 'player3',
                    result: 1,
                    // rank: [],
                    id: Math.floor(Math.random() * 10000)
                },
                {
                    name: 'player4',
                    result: 5,
                    // rank: [],
                    id: Math.floor(Math.random() * 10000)
                },

            ]))
        }

        this.matrix = [
            [0, -1, 1],
            [1, 0, -1],
            [-1, 1, 0]
        ];

        // this.choices = ['rock', 'paper', 'scissors'];

        this.sceltaCpu = null;
        this.sceltaUser = null;
        // this.isEnded = false


        this.state = {
            // users: [],
            // sceltaCpu: null,
            // sceltaUtente: null,
            winsCpu: 0, // round
            winsUser: 0, //round
            // rank: [],
            isEnded: false,
            isvalid: false,
            isWinner: ""

        }
    }

    componentDidMount() {
    }

    componentDidUpdate(prevProps, prevState) {
        // console.log("prevState", prevState);
        let stateCopy = Object.assign({}, this.state)

        // console.log("stateCopy", stateCopy);

        let getUser = getLocalStorage("users")
        // console.log("getUser", getUser);

        if (this.state.isWinner !== "") {
            uploadResult(this.state.isWinner)
        }



        /******************** */
        // if(this.state)

        //this.winnerMatch()


    }

    // funzione pr determinare chi ha vinto
    winnerRound = (sceltaUtente, sceltaCpu) => {
        // console.log(sceltaUtente, sceltaCpu);
        let check = this.matrix[sceltaUtente][sceltaCpu]

        let winnerRound = Object.assign({}, this.state)

        switch (check) {
            case 1:
                winnerRound.winsUser++;
                // console.log("wins user");
                break;
            case -1:
                winnerRound.winsCpu++
                // console.log("winsCpu");
                break;
            default: console.log("Pareggio");
        }

        this.winnerMatch2(winnerRound);


        this.setState({
            winsUser: winnerRound.winsUser,
            winsCpu: winnerRound.winsCpu,
            /*************** */
            isWinner: winnerRound.isWinner
        })
        console.log("winnerRound", winnerRound);

    }

    // determineWinner = () => {
    //         // let lastUser = getUser.pop()
    //         // console.log(lastUser);
    //         // lastUser.result++;
    //         // addUserToRank.rank.push(lastUser);
    //         // setLocalStorage("users", getUser)
    //         // console.log(getUser);
    //     }
    // }


    winnerMatch = () => {
        let copyState = Object.assign({}, this.state)

        if (this.state.winsUser - this.state.winsCpu >= 2) {
            /* vince user. funzione di carica vincitore su local storage. return */
            this.uploadResult(this.userName);
            copyState.isEnded = true
            console.log("copyState.isEnded", copyState);
            console.log("vincitore della partita e' USER")
            return;
        }
        if (this.state.winsUser - this.state.winsCpu <= -2) {
            /* vince cpu. funzione di carica vincitore su local storage. return */
            this.uploadResult(this.randomCpuPlayer());
            console.log("vincitore della partita e' CPU")
            return;
        }
        // caso in cui siamo, per esempio, a punteggio 2-2
        if (this.state.winsUser + this.state.winsCpu >= 4) {
            if (this.state.winsUser > this.state.winsCpu) {
                /* vince user. funzione di carica vincitore su local storage*/
                this.uploadResult(this.userName);
                console.log("vincitore della partita e' USER")
                return;
            }
            if (this.state.winsCpu > this.state.winsUser) {
                /* vince cpu. funzione di carica vincitore su local storage.*/
                this.uploadResult(this.randomCpuPlayer());
                console.log("vincitore della partita e' CPU")
                return;
            }
        }

    };

    /************************************* */

    winnerMatch2(copyState) {
        //let copyState = Object.assign({}, this.state)

        let enemyName = this.randomCpuPlayer();
        if (copyState.winsUser - copyState.winsCpu >= 2) {
            /* vince user. */
            copyState.isWinner = this.userName
        }
        if (copyState.winsUser - copyState.winsCpu <= -2) {
            /* vince cpu.*/
            copyState.matchWinner = enemyName

        }
        // caso in cui siamo, per esempio, a punteggio 2-2
        if (copyState.winsUser + copyState.winsCpu >= 4) {
            if (copyState.winsUser > copyState.winsCpu) {
                /* vince user. */
                copyState.matchWinner = this.userName

            }
            if (copyState.winsCpu > copyState.winsUser) {
                /* vince cpu. */
                copyState.matchWinner = enemyName

            }
        }

    };

    /***************************************** */

    randomCpuPlayer() {
        const cpuPlayers = ["player1", "player2", "player3", "player4"];
        return cpuPlayers[Math.floor(Math.random() * cpuPlayers.length)];
    }

    uploadResult(winner) {
        let getUsers = getLocalStorage("users");
        console.log("winner", winner);

        getUsers.find((el) => {
            if (el.name === winner) {
                el.result++;
            }
            // this.isEnded = true;
        })


        setLocalStorage("users", getUsers);
        /* settare lo stato.isEnded = true */
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
        //metto isInvalid su false così toglie l'avviso di mettere il nome
        this.setState({
            isvalid: false
        })

        let newUser = {
            name: this.userName,
            result: 0,
            // rank: [],
            id: Math.floor(Math.random() * 10000)
        }
        //controllo che il campo non sia vuoto
        if (newUser.name.trim().length === 0) {
            this.setState({
                isvalid: true
            })
            return console.log("input vuoto");
        }

        let getUsers = getLocalStorage("users")

        getUsers.push(newUser)
        setLocalStorage("users", getUsers)
    }

    scissor = () => {
        let sceltaUtente = 2;
        let sceltaCpu = this.cpuChoice()

        this.winnerRound(sceltaUtente, sceltaCpu)
    }

    rock = () => {
        let sceltaUtente = 0;
        let sceltaCpu = this.cpuChoice()

        this.winnerRound(sceltaUtente, sceltaCpu)
    }

    paper = () => {
        let sceltaUtente = 1;
        let sceltaCpu = this.cpuChoice()

        this.winnerRound(sceltaUtente, sceltaCpu)
    }



    componentWillUnmount() { }

    render() {
        return (
            <div className='container'>
                <motion.h1 animate={ { y: 20, scale: 1 } } initial={ 0 } className='container__title'>Start Game</motion.h1>

                <div>

                    <div className='container__scores'>
                        <p>CPU:
                            <span>
                                { this.state.winsCpu }
                            </span>
                        </p>
                        <p>USER:
                            <span>
                                { this.state.winsUser }
                            </span>
                        </p>
                    </div>

                    <div className='container__input'>
                        { this.state.isvalid && <h3>Insert your name</h3> }
                        <NewInput
                            // label={ "Name" }
                            typeInput={ "text" }
                            callbackInput={ this.inputName }
                            styleNewInput={ "newinput" }
                            styleLabel={ "label" }
                            placeholderInput={ "Write your name" }
                        />
                        <Button
                            callBackButton={ this.addNewUser }
                            label={ "Add User" }
                            styleCss={ "btn add-user" }
                        // animate={ { rotate: 360 } }
                        />
                    </div>


                    { this.state.winsUser === 2 && <h2>You WIN!!!</h2> }
                    { this.state.winsCpu === 2 && <h2>You are a looser...</h2> }

                    <div className='container__buttons'>
                        <Button
                            callBackButton={ this.paper }
                            label={ "Paper" }
                            styleCss={ "btn " }
                        />
                        <Button
                            callBackButton={ this.scissor }
                            label={ "Scissors" }
                            styleCss={ "btn" }
                        />
                        <Button
                            callBackButton={ this.rock }
                            label={ "Rock" }
                            styleCss={ "btn" }
                        />
                    </div>
                </div>
            </div>
        )
    }
}



export default Entry