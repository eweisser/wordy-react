import '../App.css';

const HowToPlay = ({returnToStartMenu}) => {

    return (
        <div id="how-to-play-container">
            <p>This is a word guessing game you play against a computer AI.</p>
            <p>To begin, think of a "secret" five-letter word. Make sure each of the five letters is different. For example, you can't choose THERE, because it has two E's.</p>
            <p>You and the AI take turns trying to guess each other's word.</p>
            <p>After you make a guess, the AI tells you how many letters your guess has in common with its "secret" word. For example, if the AI's secret word is CLOUD, and you guess CODES, the AI will say you have 3 letters right; if you guess BRACE, it will say you have 1 letter right.</p>
            <p>To the right, there's a letter "scratchpad". Click on a letter to indicate that you've ruled it out, and click on it again to indicate that you've figured out it must be in the AI's secret word. Try it out!</p>
            <div className="playerOptionBox" onClick={() => returnToStartMenu()}>Go to start menu</div>
        </div>
    );
}

export default HowToPlay;