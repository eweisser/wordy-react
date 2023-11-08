import '../App.css';

const ScratchPadLetter = ({Letter, cycleLetterButton}) => {

    return (
        // <div className="ai-menu-button" onPress={() => pickAi({AiName})}>{AiName}</div>
        <div className="scratch-pad-letter-button" onClick={() => cycleLetterButton()}>{Letter}</div>
    );
}

export default ScratchPadLetter;