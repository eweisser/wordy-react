import '../App.css';

const LexiconChoiceContainer = ({Label, pressLexiconChoiceButton}) => {

    return (
        <div className="playerOptionBox" onClick={() => pressLexiconChoiceButton()}>{Label}</div>
    );
}

export default LexiconChoiceContainer;