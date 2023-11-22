// import { LEXICON } from './components/lexicon.js';
import StartMenu from './components/start-menu.js';
import AIMenu from './components/AI-menu.js';
import Game from './components/game.js';
import Fox from './components/fox.js';
import ScratchPad from './components/scratchpad.js';
import './App.css';
// import './bkgd_gold.css';
import { useState } from 'react';
import AIMenuButton from './components/AI-menu-button.js';
import ScratchPadLetter from './components/scratch-pad-letter.js';
import HowToPlay from './components/how-to-play.js';
import OptionsPage from './components/options-page.js';
import ColorThemeContainer from './components/color-theme-container.js';
import ColorChangeButton from './components/color-change-button.js';
import LexiconChoiceContainer from './components/lexicon-choice-container.js';
import LexiconChoiceButton from './components/lexicon-choice-button.js';

// implement fox reactions
// AI actually tries to solve
// save / load
// minilex
// clear scratchpad
// mark numbers for rounds
// auto-refocus

function App() {

  const [startMenuAppear, setStartMenuAppear] = useState(true);
  const [aiMenuAppear, setAiMenuAppear] = useState(false);
  const [gameAppear, setGameAppear] = useState(false);
  const [howToPlayAppear, setHowToPlayAppear] = useState(false);
  const [optionsAppear, setOptionsAppear] = useState(false);
  const [colorThemeContainerAppear, setColorThemeContainerAppear] = useState(false);
  // const [color1, setColor1] = useState("#fc0");
  // const [color2, setColor2] = useState("#830");
  // const [color3, setColor3] = useState("#fffb");
  const [alphabetAppear, setAlphabetAppear] = useState(false);

  const [activeAi, setActiveAi] = useState(null);

  const changeColorsExperiment = (colorPack) => {

    // document.querySelector(".App").style.backgroundColor = colorPack[0];
    // document.querySelector(".App").style.color = colorPack[1];
    // // document.querySelector(".RightFrame:after").style.background = colorPack[1];
    // document.querySelector(".fox").style.stroke = colorPack[1];

    // var compDialogueNodeList = document.querySelectorAll(".compDialogue");
    // for (let i = 0; i < compDialogueNodeList.length; i++) {
    //   compDialogueNodeList[i].style.backgroundColor = colorPack[2];
    // }
    // var compDialogueNodeList = document.querySelectorAll(".playerInput");
    // for (let i = 0; i < compDialogueNodeList.length; i++) {
    //   compDialogueNodeList[i].style.backgroundColor = colorPack[2];
    // }

    // var playerOptionBoxNodeList = document.querySelectorAll(".playerOptionBox");
    // for (let i = 0; i < playerOptionBoxNodeList.length; i++) {
    //   playerOptionBoxNodeList[i].style.borderColor = colorPack[1];
    // }

    // var letterEliminatedNodeList = document.querySelectorAll(".letter_eliminated");
    // for (let i = 0; i < letterEliminatedNodeList.length; i++) {
    //   letterEliminatedNodeList[i].style.color = colorPack[1];
    // }
  }

  return (
    <div id="ColorWrapper" className="GoldTheme">
    <div className="App">
      <div className="LeftFrame">
        {startMenuAppear && <StartMenu showAiMenu={() => {setStartMenuAppear(false); setAiMenuAppear(true)}} showHowToPlay={() => {setStartMenuAppear(false); setHowToPlayAppear(true); setAlphabetAppear(true)} } showOptions={() => {setStartMenuAppear(false); setOptionsAppear(true); setAlphabetAppear(false)} } />}

        {aiMenuAppear && <AIMenu>
          <AIMenuButton AiName="Amy" pickAi={() => {setActiveAi("Amy"); setAiMenuAppear(false); setGameAppear(true); setAlphabetAppear(true)}}></AIMenuButton>
          <AIMenuButton AiName="Ben" pickAi={() => {setActiveAi("Ben"); setAiMenuAppear(false); setGameAppear(true); setAlphabetAppear(true)}}></AIMenuButton>
          <AIMenuButton AiName="Clair" pickAi={() => {setActiveAi("Clair"); setAiMenuAppear(false); setGameAppear(true); setAlphabetAppear(true)}}></AIMenuButton>
        </AIMenu>}

        {gameAppear && <Game sendActiveAi={activeAi} newGamePickAi={(clue) => {setGameAppear(false); setAiMenuAppear(clue); setStartMenuAppear(!clue); setAlphabetAppear(false)}} />}

        {howToPlayAppear && <HowToPlay returnToStartMenu={() => {setStartMenuAppear(true); setAlphabetAppear(false); setHowToPlayAppear(false)}} />}

        {optionsAppear && <OptionsPage returnToStartMenu={() => {setStartMenuAppear(true); setAlphabetAppear(false); setOptionsAppear(false)}} >
            <ColorThemeContainer>
              <ColorChangeButton Color="white-sample" pressColorButton={() => {changeColorsExperiment(["#fed","#830","#fff"])}}></ColorChangeButton>
              <ColorChangeButton Color="black-sample" pressColorButton={() => {changeColorsExperiment(["#444","#fc0","#000"])}}></ColorChangeButton>
              <ColorChangeButton Color="red-sample" pressColorButton={() => {changeColorsExperiment(["#b00","#fed","#0003"])}}></ColorChangeButton>
              <ColorChangeButton Color="gold-sample" pressColorButton={() => {changeColorsExperiment(["#fc0","#830","#fffb"])}}></ColorChangeButton>
              <ColorChangeButton Color="yg-sample" pressColorButton={() => {document.getElementById("ColorWrapper").className = "YGTheme"; }}></ColorChangeButton>
              <ColorChangeButton Color="green-sample" pressColorButton={() => {changeColorsExperiment(["#035d30","#dfe","#000"])}}></ColorChangeButton>
              <ColorChangeButton Color="sky-sample" pressColorButton={() => {changeColorsExperiment(["#0df","#059","#fffc"])}}></ColorChangeButton>
              <ColorChangeButton Color="blue-sample" pressColorButton={() => {changeColorsExperiment(["#009","#def","#000"])}}></ColorChangeButton>
              <ColorChangeButton Color="purple-sample" pressColorButton={() => {changeColorsExperiment(["#74007a","#ff80b9","#000"])}}></ColorChangeButton>
              <ColorChangeButton Color="pink-sample" pressColorButton={() => {changeColorsExperiment(["#f8b","#704","#fffa"])}}></ColorChangeButton>
            </ColorThemeContainer>

            <LexiconChoiceContainer>
              <LexiconChoiceButton Label="Maximal"></LexiconChoiceButton>
              <LexiconChoiceButton Label="Standard"></LexiconChoiceButton>
            </LexiconChoiceContainer>

        </OptionsPage>}

      </div>

      <div className="RightFrame">

        {<Fox />}

        {alphabetAppear && <ScratchPad>
          <ScratchPadLetter Letter="A"></ScratchPadLetter>
          <ScratchPadLetter Letter="B"></ScratchPadLetter>
          <ScratchPadLetter Letter="C"></ScratchPadLetter>
          <ScratchPadLetter Letter="D"></ScratchPadLetter>
          <ScratchPadLetter Letter="E"></ScratchPadLetter>

          <ScratchPadLetter Letter="F"></ScratchPadLetter>
          <ScratchPadLetter Letter="G"></ScratchPadLetter>
          <ScratchPadLetter Letter="H"></ScratchPadLetter>
          <ScratchPadLetter Letter="I"></ScratchPadLetter>
          <ScratchPadLetter Letter="J"></ScratchPadLetter>
          
          <ScratchPadLetter Letter="K"></ScratchPadLetter>
          <ScratchPadLetter Letter="L"></ScratchPadLetter>
          <ScratchPadLetter Letter="M"></ScratchPadLetter>
          <ScratchPadLetter Letter="N"></ScratchPadLetter>
          <ScratchPadLetter Letter="O"></ScratchPadLetter>
          
          <ScratchPadLetter Letter="P"></ScratchPadLetter>
          <ScratchPadLetter Letter="Q"></ScratchPadLetter>
          <ScratchPadLetter Letter="R"></ScratchPadLetter>
          <ScratchPadLetter Letter="S"></ScratchPadLetter>
          <ScratchPadLetter Letter="T"></ScratchPadLetter>

          <ScratchPadLetter Letter="U"></ScratchPadLetter>
          <ScratchPadLetter Letter="V"></ScratchPadLetter>
          <ScratchPadLetter Letter="W"></ScratchPadLetter>
          <ScratchPadLetter Letter="X"></ScratchPadLetter>
          <ScratchPadLetter Letter="Y"></ScratchPadLetter>

          <ScratchPadLetter Letter="Z"></ScratchPadLetter>
        </ScratchPad>}
      </div>
    </div>
    </div>
  );
}

export default App;
