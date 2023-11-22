import '../App.css';

const ColorChangeButton = ({Color, pressColorButton}) => {

    return (
        <div className="color-sample" id={Color} onClick={() => pressColorButton()}></div>
    );
}

export default ColorChangeButton;