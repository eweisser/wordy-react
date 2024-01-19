const AI_DAVID = (activeLexicon, computerGuessRecord) => {

    // It guessed AUDIO in 33 turns.
    // It guessed CLOUD in 14 turns.
    // It guessed MYTHS in 35 turns.


    var chosenWord = "";
    var scored_letters = {};
    var scored_word_sample = {};
    for (let n = 97; n <= 122; n++) {
        scored_letters[String.fromCharCode(n)] = 0;         // each letter is initially assigned a score of 0
    }

    // console.log("Here...");
    const guessed_words_joined = Object.keys(computerGuessRecord).join("");     // all words already guessed are joined together in a single string, to make searching easier
    // console.log(guessed_words_joined);
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
            scored_letters[letter] = gross_score / occurrences;         // set the letter's score to the mean of the user responses for all the guessed words the letter appeared in
        }
        console.log(letter);
        console.log(scored_letters[letter]);
    }


    const candidateWords = {};          // let's get a random sample of words to judge
    do {
        let considerationWord = activeLexicon[(Math.floor(Math.random()*activeLexicon.length))];
        if (considerationWord in computerGuessRecord || considerationWord in Object.keys(candidateWords)) {
        } else {
            candidateWords[considerationWord] = [0,0];
        }
    } while (Object.keys(candidateWords).length < 700);



    
    var highestSumWordScore = -1000;
    var highestStDevWordScore = -1000;
    var highestSumWord = "";
    var highestStDevWord = "";
    var lowestWordScore = 1000;
    var lowestScoringWord = "";

    // alert(highestSumWordScore);
    // alert(highestSumWord);

    for (let word in candidateWords) {
        let scoredLetterSum = 0;
        for (let letter of word) {      // finding average
            scoredLetterSum = scoredLetterSum + scored_letters[letter];
        }
        let scoredLetterMean = scoredLetterSum / 5;
        let scoredLetterStDev = 0;

        for (let letter of word) {      // calculating stdev
            scoredLetterStDev = scoredLetterStDev + (scored_letters[letter] - scoredLetterMean)**2;
        }
        scoredLetterStDev = scoredLetterStDev / 5;
        scoredLetterStDev = scoredLetterStDev**0.5;


        candidateWords[word] = [scoredLetterSum,scoredLetterStDev];

        if (scoredLetterSum > highestSumWordScore) {
            highestSumWordScore = scoredLetterSum;
            highestSumWord = word;
        }
        if (scoredLetterStDev > highestStDevWordScore) {
            highestStDevWordScore = scoredLetterStDev;
            highestStDevWord = word;
        }
        if (scoredLetterStDev < lowestWordScore) {
            lowestWordScore = scoredLetterStDev;
            lowestScoringWord = word;
        }
    }
    
    console.log("Candidate words (sample of lexicon):");
    console.log(candidateWords);

    if (Object.keys(computerGuessRecord).length < 8) {
        console.log("RANDOM WORD");
        chosenWord = Object.keys(candidateWords)[(Math.floor(Math.random()*Object.keys(candidateWords).length))];
    }
    // else if (Object.keys(computerGuessRecord).length > 7 && Object.keys(computerGuessRecord).length % 3 == 0) {
    //     console.log("Choosing lowest scoring word!!!");
    //     chosenWord = lowestScoringWord;
    // }
    else if (Object.keys(computerGuessRecord).length % 4 > 0) {
        console.log("HIGHEST SUM WORD");
        console.log(highestSumWord);
        chosenWord = highestSumWord;
    }
    else {
        console.log("HIGHEST ST DEV WORD");
        chosenWord = highestStDevWord;
    }
    return chosenWord;
    
}

export { AI_DAVID };