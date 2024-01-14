const AI_DAVID = (activeLexicon, computerGuessRecord) => {

    // It guessed AUDIO in ? turns.
    // It guessed CLOUD in ? turns.
    // It guessed MYTHS in ? turns.


    var chosenWord = "";
    var scored_letters = {};
    var scored_word_sample = {};
    for (let n = 97; n <= 122; n++) {
        scored_letters[String.fromCharCode(n)] = 0;         // each letter is initially assigned a score of 0
    }

    console.log("Here...");
    const guessed_words_joined = Object.keys(computerGuessRecord).join("");
    console.log(guessed_words_joined);
    for (let letter in scored_letters) {
        let occurrences = 0;
        let gross_score = 0;
        for (let word in computerGuessRecord) {
            if (word.search(letter) > -1) {
                // console.log(letter + " in " + word);
                occurrences++;
                gross_score = gross_score + computerGuessRecord[word];
            }
        }
        if (occurrences == 0) {
            scored_letters[letter] = 5;
        } else {
            scored_letters[letter] = gross_score / occurrences;
        }
        // console.log(letter);
        // let match = Array.from(guessed_words_joined.matchAll(letter));
        // let occurrences = match.length;
        console.log(letter);
        console.log(scored_letters[letter]);
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
    var lowestWordScore = 1000;
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

export { AI_DAVID };