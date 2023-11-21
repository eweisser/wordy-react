import '../App.css';

const OptionsPage = ({returnToStartMenu, changeColorTheme}) => {

    return (
        <div id="how-to-play-container">
            <p>Color theme</p>
            <div id="color-sample-container">
                <div className="color-sample" id="white-sample" onClick={() => changeColorTheme(["#fed","#830","#fff"])}></div>
                <div className="color-sample" id="black-sample" onClick={() => changeColorTheme(["#444","#fc0","#000"])}></div>
                <div className="color-sample" id="red-sample" onClick={() => changeColorTheme(["#b00","#fed","#0003"])}></div>
                <div className="color-sample" id="gold-sample" onClick={() => changeColorTheme(["#fc0","#830","#fffb"])}></div>
                <div className="color-sample" id="yg-sample" onClick={() => changeColorTheme(["#90d21f","#053","#fffb"])}></div>
                <div className="color-sample" id="green-sample" onClick={() => changeColorTheme(["#035d30","#dfe","#0004"])}></div>
                <div className="color-sample" id="sky-sample" onClick={() => changeColorTheme(["#0df","#059","#fffc"])}></div>
                <div className="color-sample" id="blue-sample" onClick={() => changeColorTheme(["#009","#def","#0004"])}></div>
                <div className="color-sample" id="purple-sample" onClick={() => changeColorTheme(["#74007a","#ff80b9","#ff80b9"])}></div>
                <div className="color-sample" id="pink-sample" onClick={() => changeColorTheme(["#f8b","#704","#fffa"])}></div>
            </div>
            <p>Dictionary</p>
            <div className="playerOptionBox">Full</div>
            <div className="playerOptionBox">Standard</div>
            <div className="playerOptionBox" onClick={() => returnToStartMenu()}>Go to start menu</div>
        </div>
    );
}

export default OptionsPage;