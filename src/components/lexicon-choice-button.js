import '../App.css';

const ColorChangeButton = ({pressColorButton}) => {

    return (
        <div className="playerOptionBox" onClick={() => pressColorButton()}></div>
    );
}

export default ColorChangeButton;