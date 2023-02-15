import { startTransition, useEffect, useState } from 'react';
import Button from '../components/ui/button/Button';
import NewInput from '../components/ui/input/NewInput';

import "../styles/entryApp/entryApp.css"

// ogni volta che cambia lo stato, controllo se c'è il localStorage

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

useState({
  utenti: [
    {
      nome: "",
      punteggioFinale: 0
    },
  ],
  sceltaCpu: "",
  sceltaUtente: "",
  risultatoRound: [0, 0]
})



function EntryApp() {

  const mosse = ['carta', 'forbici', 'sasso'];
  let mossaUtente = '';
  let mossaCpu = '';
  let puntiUtente = 0;
  let puntiCpu = 0;

  function morraCinese(event) {

    if (!puntiCpu && !puntiUtente) {
      console.clear();
    }

    mossaUtente = event.target.innerText.toLowerCase();

    const number = Math.floor((Math.random() * 3));
    mossaCpu = mosse[number];

    if (mossaUtente === 'carta') {
      if (mossaCpu === 'forbici') {
        puntiCpu++;
      }
      if (mossaCpu === 'sasso') {
        puntiUtente++;
      }
    } else if (mossaUtente === 'forbici') {
      if (mossaCpu === 'carta') {
        puntiUtente++;
      }
      if (mossaCpu === 'sasso') {
        puntiCpu++;
      }
    } else if (mossaUtente === 'sasso') {
      if (mossaCpu === 'carta') {
        puntiCpu++;
      }
      if (mossaCpu === 'forbici') {
        puntiUtente++;
      }
    }

    console.log(`Utente = ${mossaUtente} | CPU = ${mossaCpu} | Punteggio: ${puntiUtente} a ${puntiCpu}`);

    // Se uno tra utente e CPU ha raggiunto i 2 punti ha vinto e la partita Ã¨ finita
    if (puntiUtente === 2 || puntiCpu === 2) {
      const vinceUtente = `%c Utente ha vinto la partita ${puntiUtente} a ${puntiCpu} `;
      const vinceCpu = `%c CPU ha vinto la partita ${puntiCpu} a ${puntiUtente} `;
      puntiUtente > puntiCpu ? console.log(vinceUtente, 'background: #222; color: #bada55') : console.log(vinceCpu, 'background: #222; color: #bada55');

      // Azzero i punti di utente e CPU e le mosse dell'utente, in preparazione della prossima partita
      puntiUtente = 0;
      puntiCpu = 0;
    }
  }


  return (
    <div className="App">
      <header className="App-header">

        <div className='container'>
          <Button
            label={ "Carta" }
            callBackButton={ morraCinese }
          />
          <Button
            label={ "Forbici" }
            callBackButton={ morraCinese }
          />
          <Button
            label={ "Sasso" }
            callBackButton={ morraCinese }
          />
        </div>
      </header>

    </div>
  );
}

export default EntryApp;
