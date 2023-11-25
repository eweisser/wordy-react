import '../App.css';
import { useState } from 'react';

const ScratchPadResetButton = ({Label, cycleResetButton}) => {


    return (
        <div className="scratch-pad-reset-button" onClick={() => cycleResetButton()}>{Label}</div>
    );
}

export default ScratchPadResetButton;