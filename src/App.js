// import { LEXICON } from './components/lexicon.js';
import StartMenu from './components/start-menu.js';
import AIMenu from './components/AI-menu.js';
import Game from './components/game.js';
import './App.css';
import { useState } from 'react';
import AIMenuButton from './components/AI-menu-button.js';

function App() {

  const [startMenuAppear, setStartMenuAppear] = useState(true);
  const [aiMenuAppear, setAiMenuAppear] = useState(false);
  const [gameAppear, setGameAppear] = useState(false);

  const [activeAi, setActiveAi] = useState(null);

  return (
    <div className="App">
      <div className="LeftFrame">
        {startMenuAppear && <StartMenu showAiMenu={() => {setStartMenuAppear(false); setAiMenuAppear(true)} } />}

        {/* {aiMenuAppear && <AIMenu sendAi={(chosenAi) => {setAiMenuAppear(false); setGameAppear(true); alert(chosenAi)}} />} */}
        {aiMenuAppear && <AIMenu>
          <AIMenuButton AiName="Amy" pickAi={() => {setActiveAi("Amy"); setAiMenuAppear(false); setGameAppear(true)}}></AIMenuButton>
          <AIMenuButton AiName="Ben" pickAi={() => {setActiveAi("Ben"); setAiMenuAppear(false); setGameAppear(true)}}></AIMenuButton>
          <AIMenuButton AiName="Chloe" pickAi={() => {setActiveAi("Chloe"); setAiMenuAppear(false); setGameAppear(true)}}></AIMenuButton>
        </AIMenu>}

        {gameAppear && <Game sendActiveAi={activeAi} />}
      </div>
      <div className="RightFrame">
      </div>
      
    </div>
  );
}

export default App;
