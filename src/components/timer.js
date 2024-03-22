// import '../App.css';

// const Timer = ({Mood}) => {
const Timer = ({zeroFace}) => {

    setTimeout(changeFace, 2000);

    function changeFace() {
        zeroFace();
    }

    // return (
        // <div id="fox">
        //     <svg width="100%" height="100%" viewBox="0 0 800 750">
        //         <polyline points="50,440 170,490 125,510 400,655 675,510 630,490 750,440" stroke-width="15" fill="none" />
        //         <polyline points="214,332 227,92 400,288 573,92 586,332" stroke-width="15" fill="none" />
        //         {/* <path d="M 389 577 C 396 594 404 594 411 577" stroke-width="35" stroke-linecap="round" fill="none" name="oldnose"/> */}
        //         <path d="M 400 600 c -54 -32 54 -32 0 0" stroke-width="27" stroke-linecap="round" fill="none" name="nose"/>

        //         <ActiveEyes Eyeset={Mood} ></ActiveEyes>

        //         {/* <path d="M 250 420 l 80 0 m -40 0 c -30 20 30 40 0 60 c -30 20 30 40 0 60" stroke-width="15" stroke-linecap="round" fill="none" name="ABANDONED curly tears"/> */}
        //     </svg>
        // </div>
    // );
}

export default Timer;