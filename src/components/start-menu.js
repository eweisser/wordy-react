import '../App.css';

const StartMenu = ({showAiMenu, showHowToPlay, showOptions}) => {

    return (
        <div id="start-menu-container">
            <div id="start-menu-top-blank"></div>
            <div id="start-menu-1" onClick={showAiMenu}>new</div>
            {/* <div id="start-menu-2">load</div> */}
            <div id="start-menu-how-to-play-button" onClick={showHowToPlay}>how to play</div>
            <div id="start-menu-options-button" onClick={showOptions}>options</div>
            <div id="start-menu-bottom-blank"></div>
        </div>
    );
}

export default StartMenu;