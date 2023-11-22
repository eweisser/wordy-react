import '../App.css';

const AIMenu = ({children}) => {

    return (
        <div id="ai-menu-container">
            Choose an AI
            {children}
        </div>
    );
}

export default AIMenu;