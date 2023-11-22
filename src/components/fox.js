// import '../App.css';

const Fox = () => {

    return (
        <div id="fox">
            <svg width="100%" height="100%" viewBox="0 0 800 750">
                <polyline points="50,440 170,490 125,510 400,655 675,510 630,490 750,440" stroke-width="15" fill="none" />
                <polyline points="214,332 227,92 400,288 573,92 586,332" stroke-width="15" fill="none" />
                {/* <path d="M 389 577 C 396 594 404 594 411 577" stroke-width="35" stroke-linecap="round" fill="none" name="oldnose"/> */}
                <path d="M 400 577 C 346 545 454 545 400 577" stroke-width="35" stroke-linecap="round" fill="none" name="nose"/>
                <path d="M 279 425 c 31 3 34 25 32 35" stroke-width="20" stroke-linecap="round" fill="none" name="left eye"/>
                <path d="M 521 425 c -31 3 -34 25 -32 35" stroke-width="20" stroke-linecap="round" fill="none" name="right eye"/>
            </svg>
        </div>
    );
}

export default Fox;