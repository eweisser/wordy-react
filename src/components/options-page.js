import '../App.css';

const OptionsPage = ({children, returnToStartMenu}) => {

    return (
        <div>

        <div id="how-to-play-container">
            {children}
        </div>

        <div className="playerOptionBoxesContainer">
        <div id="go-to-start-menu-button" className="playerOptionBox" onClick={() => returnToStartMenu()}>Go to start menu</div>
        </div>

        </div>
    );
}

export default OptionsPage;