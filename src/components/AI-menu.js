import '../App.css';
import AIMenuButton from './AI-menu-button.js';

const AIMenu = ({children}) => {

    return (
        <div id="ai-menu-container">
            Choose an AI
            {children}
        </div>
    );
}

export default AIMenu;