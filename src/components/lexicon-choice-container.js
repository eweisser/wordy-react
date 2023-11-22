import '../App.css';

const LexiconChoiceContainer = ({children}) => {

    return (
        <div id="lexicon-choice-container">
            Lexicon
            <br/>
            {children}
        </div>
    );
}

export default LexiconChoiceContainer;