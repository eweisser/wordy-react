import '../App.css';

const OptionsPage = ({children, returnToStartMenu}) => {

    return (
        <div>

        <div id="how-to-play-container">
            {children}
        </div>

        <div className="playerOptionBox" onClick={() => returnToStartMenu()}>Go to start menu</div>
        </div>
    );
}

export default OptionsPage;