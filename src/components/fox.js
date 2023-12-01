// import '../App.css';

const Fox = ({Mood}) => {

    // alert(Mood);

    const ActiveEyes = ({Eyeset}) => {
        var eyesSVG = "";
        if (Eyeset === "neutral") {
            eyesSVG = <g><path d="M 279 425 c 31 3 34 25 32 35" stroke-width="15" stroke-linecap="round" fill="none" name="left eye"/>
                <path d="M 521 425 c -31 3 -34 25 -32 35" stroke-width="15" stroke-linecap="round" fill="none" name="right eye"/></g>
        } else if (Eyeset === "dead") {
            eyesSVG = <g><path d="M 250 400 l 60 60 m -60 0 l 60 -60" stroke-width="10" stroke-linecap="round" fill="none" name="left eye X"/>
                <path d="M 490 400 l 60 60 m -60 0 l 60 -60" stroke-width="10" stroke-linecap="round" fill="none" name="right eye X"/></g>
        } else if (Eyeset === "shocked") {
            eyesSVG = <g><circle cx="270" cy="430" r="50" stroke-width="15" stroke-linecap="round" fill="none" name="left eye O"/>
                <circle cx="530" cy="430" r="50" stroke-width="15" stroke-linecap="round" fill="none" name="right eye O"/></g>
        } else if (Eyeset === "crying") {
            eyesSVG = <g><path d="M 250 420 l 80 0 m -40 20 l 0 100" stroke-width="15" stroke-linecap="round" fill="none" name="left eye crying-T"/>
                <path d="M 470 420 l 80 0 m -40 20 l 0 100" stroke-width="15" stroke-linecap="round" fill="none" name="right eye crying-T"/></g>
        } else if (Eyeset === "suspicious") {
            eyesSVG = <g><path d="M 230 440 l 80 0 M 240 440 l 0 20" stroke-width="15" stroke-linecap="round" fill="none" name="left eye squinting left"/>
                <path d="M 450 440 l 80 0 M 460 440 l 0 20" stroke-width="15" stroke-linecap="round" fill="none" name="right eye squinting left"/>
                {/* <path d="M 270 440 l 80 0 M 340 440 l 0 20" stroke-width="15" stroke-linecap="round" fill="none" name="left eye squinting right"/> */}
                {/* <path d="M 490 440 l 80 0 M 560 440 l 0 20" stroke-width="15" stroke-linecap="round" fill="none" name="right eye squinting right"/> */}
            </g>
        }
        // alert({Mood});
        return (
            eyesSVG
        )
    }

    return (
        <div id="fox">
            <svg width="100%" height="100%" viewBox="0 0 800 750">
                <polyline points="50,440 170,490 125,510 400,655 675,510 630,490 750,440" stroke-width="15" fill="none" />
                <polyline points="214,332 227,92 400,288 573,92 586,332" stroke-width="15" fill="none" />
                {/* <path d="M 389 577 C 396 594 404 594 411 577" stroke-width="35" stroke-linecap="round" fill="none" name="oldnose"/> */}
                <path d="M 400 600 c -54 -32 54 -32 0 0" stroke-width="27" stroke-linecap="round" fill="none" name="nose"/>

                <ActiveEyes Eyeset={Mood} ></ActiveEyes>

                {/* <path d="M 250 420 l 80 0 m -40 0 c -30 20 30 40 0 60 c -30 20 30 40 0 60" stroke-width="15" stroke-linecap="round" fill="none" name="ABANDONED curly tears"/> */}
            </svg>
        </div>
    );
}

export default Fox;