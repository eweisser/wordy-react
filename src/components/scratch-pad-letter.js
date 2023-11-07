import '../App.css';

const ScratchPadLetter = ({AiName, pickAi}) => {

    return (
        // <div className="ai-menu-button" onPress={() => pickAi({AiName})}>{AiName}</div>
        <div className="ai-menu-button" onClick={() => pickAi()}>{AiName}</div>
    );
}

export default ScratchPadLetter;