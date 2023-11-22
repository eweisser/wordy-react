import '../App.css';

const LexiconChoiceContainer = ({children}) => {

    return (
        <div>
        <p>Lexicon</p>
        <div id="lexicon-choice-container">
            {children}
        </div>
        </div>
    );
}

export default LexiconChoiceContainer;