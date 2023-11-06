import '../App.css';
import AIMenuButton from './AI-menu-button.js';

const Fox = () => {

    return (
        <div id="fox">
            <svg width="100%" height="100%" viewBox="0 0 800 750">
                <polyline points="50,440 170,490 125,510 400,655 675,510 630,490 750,440" stroke="#830" stroke-width="15" fill="none" />
                <path d="M 390 450 q 8 16 22 0" stroke="#000" stroke-width="35" fill="none" />
            </svg>
        </div>
    );
}

export default Fox;