import '../App.css';

const ColorThemeContainer = ({children}) => {

    return (
        <div id="color-sample-container">
            Color theme
            <br/>
            {children}
        </div>
    );
}

export default ColorThemeContainer;