const AI_CLAIR = (activeLexicon, computerGuessRecord) => {

    // It guessed AUDIO in ? turns.
    // It guessed CLOUD in 41 turns.
    // It guessed MYTHS in 26 turns.


    var chosenWord = "";
    var scored_letters = {};
    var scored_word_sample = {};
    for (let n = 97; n <= 122; n++) {
        scored_letters[String.fromCharCode(n)] = 0;
    }

    for (let word in computerGuessRecord) {                                     // take each word the computer has guessed
        for (let letter of word) {                                              // take each letter in that word
            switch (computerGuessRecord[word]) {
                case 5:
                    scored_letters[letter] = scored_letters[letter] + 3.5;
                    break;
                case 4:
                    scored_letters[letter] = scored_letters[letter] + 2.5;
                    break;
                case 3:
                    scored_letters[letter] = scored_letters[letter] + 0.5;
                    break;
                case 2:
                    scored_letters[letter] = scored_letters[letter] - 3.5;
                    break;
                case 1:
                    scored_letters[letter] = scored_letters[letter] - 11.5;
                    break;
                case 0:
                    scored_letters[letter] = scored_letters[letter] - 27.5;
                    break;
                default:
            }
        }
    }

    const candidateWords = {};
    do {
        let considerationWord = activeLexicon[(Math.floor(Math.random()*activeLexicon.length))];
        if (considerationWord in computerGuessRecord || considerationWord in Object.keys(candidateWords)) {
        } else {
            candidateWords[considerationWord] = 0;
        }
    } while (Object.keys(candidateWords).length < 700);

    var highestWordScore = -1000;
    var highestScoringWord = "";
    var lowestWordScore = 1;
    var lowestScoringWord = "";

    for (let word in candidateWords) {
        // console.log(word);
        let scoreSoFar = 0;
        for (let letter of word) {
            scoreSoFar = scoreSoFar + scored_letters[letter];
        }
        candidateWords[word] = scoreSoFar;
        if (scoreSoFar > highestWordScore) {
            highestWordScore = scoreSoFar;
            highestScoringWord = word;
        }
        if (scoreSoFar < lowestWordScore) {
            lowestWordScore = scoreSoFar;
            lowestScoringWord = word;
        }
    }

    // const highestWordScore = Math.max(Object.values(candidateWords));

    // console.log("So far the computer has guessed...");
    // console.log(computerGuessRecord);
    // console.log("Letter scores:");
    // console.log(scored_letters);
    console.log("Candidate words (sample of lexicon):");
    console.log(candidateWords);

    if (Object.keys(computerGuessRecord).length > 7 && Object.keys(computerGuessRecord).length % 3 == 0) {
        console.log("Choosing lowest scoring word!!!");
        chosenWord = lowestScoringWord;
    } else {
        chosenWord = highestScoringWord;
    }
    return chosenWord;
    
}

export { AI_CLAIR };