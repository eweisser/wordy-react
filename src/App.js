// import { LEXICON } from './components/lexicon.js';
import StartMenu from './components/start-menu.js';
import AIMenu from './components/AI-menu.js';
import Game from './components/game.js';
import Fox from './components/fox.js';
import Alphabet from './components/alphabet.js';
import './App.css';
import { useState } from 'react';
import AIMenuButton from './components/AI-menu-button.js';
import ScratchPadLetter from './components/scratch-pad-letter.js';

function App() {

  const [startMenuAppear, setStartMenuAppear] = useState(true);
  const [aiMenuAppear, setAiMenuAppear] = useState(false);
  const [gameAppear, setGameAppear] = useState(false);
  const [foxAppear, setFoxAppear] = useState(true);
  const [alphabetAppear, setAlphabetAppear] = useState(true);

  const [activeAi, setActiveAi] = useState(null);

  return (
    <div className="App">
      <div className="LeftFrame">
        {startMenuAppear && <StartMenu showAiMenu={() => {setStartMenuAppear(false); setAiMenuAppear(true)} } />}

        {aiMenuAppear && <AIMenu>
          <AIMenuButton AiName="Amy" pickAi={() => {setActiveAi("Amy"); setAiMenuAppear(false); setGameAppear(true)}}></AIMenuButton>
          <AIMenuButton AiName="Ben" pickAi={() => {setActiveAi("Ben"); setAiMenuAppear(false); setGameAppear(true)}}></AIMenuButton>
          <AIMenuButton AiName="Chloe" pickAi={() => {setActiveAi("Chloe"); setAiMenuAppear(false); setGameAppear(true)}}></AIMenuButton>
        </AIMenu>}

        {gameAppear && <Game sendActiveAi={activeAi} />}

      </div>

      <div className="RightFrame">

        {foxAppear && <Fox />}

        {alphabetAppear && <Alphabet>
          <ScratchPadLetter>A</ScratchPadLetter>
          <ScratchPadLetter></ScratchPadLetter>
          <ScratchPadLetter></ScratchPadLetter>
          <ScratchPadLetter></ScratchPadLetter>
          <ScratchPadLetter></ScratchPadLetter>

          <ScratchPadLetter></ScratchPadLetter>
          <ScratchPadLetter></ScratchPadLetter>
          <ScratchPadLetter></ScratchPadLetter>
          <ScratchPadLetter></ScratchPadLetter>
          <ScratchPadLetter></ScratchPadLetter>
          
          <ScratchPadLetter></ScratchPadLetter>
          <ScratchPadLetter></ScratchPadLetter>
          <ScratchPadLetter></ScratchPadLetter>
          <ScratchPadLetter></ScratchPadLetter>
          <ScratchPadLetter></ScratchPadLetter>
          
          <ScratchPadLetter></ScratchPadLetter>
          <ScratchPadLetter></ScratchPadLetter>
          <ScratchPadLetter></ScratchPadLetter>
          <ScratchPadLetter></ScratchPadLetter>
          <ScratchPadLetter></ScratchPadLetter>

          <ScratchPadLetter></ScratchPadLetter>
          <ScratchPadLetter></ScratchPadLetter>
          <ScratchPadLetter></ScratchPadLetter>
          <ScratchPadLetter></ScratchPadLetter>
          <ScratchPadLetter></ScratchPadLetter>

          <ScratchPadLetter>Z</ScratchPadLetter>
        </Alphabet>}
      </div>
    </div>
  );
}

export default App;
