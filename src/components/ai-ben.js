const AI_BEN = (activeLexicon) => {

    // alert(activeLexicon[0]);
    // return activeLexicon[0];
    return activeLexicon[(Math.floor(Math.random()*activeLexicon.length))];
    
}

export { AI_BEN };