import '../App.css';
import AIMenuButton from './AI-menu-button.js';

const Fox = () => {

    return (
        <div id="fox">
            <svg>
                <line x1="50" y1="50" x2="150" y2="150" stroke="#a70" stroke-width="15" />
                <path d="M 50 50 q 150 -300 100 100" stroke="#000" stroke-width="15" fill="none" />
            </svg>
        </div>
    );
}

export default Fox;