import '../App.css';
import AIMenu from '../components/AI-menu.js';

const StartMenu = ({showAiMenu}) => {

    // const dayOrNight = data.weather[0].icon[2] + "Time";
    // document.body.setAttribute('class', dayOrNight);

    return (
        <div id="start-menu-container">
            <div id="start-menu-top-blank"></div>
            <div id="start-menu-1" onClick={showAiMenu}>new</div>
            <div id="start-menu-2">load</div>
            <div id="start-menu-3">help</div>
            <div id="start-menu-bottom-blank"></div>
        </div>
    );
}

export default StartMenu;