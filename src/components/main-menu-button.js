import '../App.css';

const MainMenuButton = ({triggerBackToMainMenu}) => {

    return (
        <div id="main-menu-button" onClick={triggerBackToMainMenu}>
            main menu
        </div>
    );
}

export default MainMenuButton;