import '../App.css';

const ColorThemeContainer = ({children}) => {

    return (
        <div>
        <p>Color theme</p>
        <div id="color-sample-container">
            {children}
        </div>
        </div>
    );
}

export default ColorThemeContainer;