// This assignment is inspired by a problem on Exercism (https://exercism.org/tracks/javascript/exercises/etl) that demonstrates Extract-Transform-Load using Scrabble's scoring system. 

const input = require("readline-sync");

const oldPointStructure = {
  1: ['A', 'E', 'I', 'O', 'U', 'L', 'N', 'R', 'S', 'T'],
  2: ['D', 'G'],
  3: ['B', 'C', 'M', 'P'],
  4: ['F', 'H', 'V', 'W', 'Y'],
  5: ['K'],
  8: ['J', 'X'],
  10: ['Q', 'Z']
};

const simplePointStructure = {
   1: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K','L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'],
};

const vowelBonusStructure = {
   1: ['B', 'C', 'D', 'F', 'G', 'H', 'J', 'K','L', 'M', 'N', 'P', 'Q', 'R', 'S', 'T', 'V', 'W', 'X', 'Y', 'Z'],
   3: ['A', 'E', 'I', 'O', 'U']
};

let enteredWord

let oldScrabbleScorer={   
name: 'Scrabble',
description: 'The traditional scoring algorithm.',
scoringFunction: function oldScrabbleScorer(word) {
word = word.toUpperCase();
let letterPoints = "";

for (let i = 0; i < word.length; i++) {

  for (const pointValue in oldPointStructure) {

    if (oldPointStructure[pointValue].includes(word[i])) {
      letterPoints += `Points for '${word[i]}': ${pointValue}\n`
    }

  }
}
return letterPoints;
}

};

// your job is to finish writing these functions and variables that we've named //
// don't change the names or your program won't work as expected. //


function initialPrompt() {
   enteredWord = input.question("Let's play some scrabble!\n\n Enter a word: ");
   return enteredWord
};

function simpleScorer(word){
   word = word.toUpperCase();
   let letterTotal = 0;

   for (let i = 0; i < word.length; i++) {
      for (const pointValue in simplePointStructure) {
      if (simplePointStructure['1'].includes(word[i])) {
         letterTotal += Number(pointValue)
      }
      }
   }
    return letterTotal;
   }

let simple={
   name: 'Simple Score',
   description: 'Each letter is worth 1 point.',
   scorerFunction: simpleScorer
};

function vowelBonusScorer(word){
   word = word.toUpperCase();
   let letterTotal = 0

for (let i = 0; i < word.length; i++) {
   for (const pointValue in vowelBonusStructure) {
   if (vowelBonusStructure[pointValue].includes(word[i])) {
      letterTotal += Number(pointValue)
   }
}
}
   return letterTotal;
}

let vowelBonus={
   name: 'Bonus Vowels',
   description: 'Vowels are 3 pts, consonants are 1 pt.',
   scorerFunction: vowelBonusScorer
};

function scrabbleScorer(word) {
	word = word.toLowerCase();
	let letterPoints = 0
 
	for (let i = 0; i < word.length; i++) {

	  for (const pointValue in newPointStructure) {
      let numbers = newPointStructure[pointValue]
		 if (pointValue == word[i]) {
         letterPoints += numbers
		 }
 
	  }
	}
	return letterPoints;
 }


let scrabble = {
   name: 'Scrabble',
   description: 'The traditional scoring algorithm.',
   scorerFunction: scrabbleScorer,
};

const scoringAlgorithms = [simple, vowelBonus, scrabble];


function scorerPrompt() {
   
   enteredAlgorithm = input.question("Which scoring algorithm would you like to use?\n\n 0 - Simple: One point per character\n 1 - Vowel Bonus: Vowels are worth 3 points\n 2 - Scrabble: Uses scrabble point system\n Enter 0, 1, or 2: ");
   return enteredAlgorithm
};

function transform(pointStructure) {
   let newStruc = {};
   for (const key in pointStructure){
   let switcher = pointStructure[key];
      for (let i = 0; i < switcher.length; i++) {
         newStruc[switcher[i].toLowerCase()] = Number(key);
      }
   }
   return newStruc;
    };

let newPointStructure = transform(oldPointStructure);

function runProgram() {
   initialPrompt();
   scorerPrompt();
   console.log(`Score for "${enteredWord}": `+scoringAlgorithms[enteredAlgorithm].scorerFunction(enteredWord));
};


// Don't write any code below this line //
// And don't change these or your program will not run as expected //
module.exports = {
   initialPrompt: initialPrompt,
   transform: transform,
   oldPointStructure: oldPointStructure,
   simpleScorer: simpleScorer,
   vowelBonusScorer: vowelBonusScorer,
   scrabbleScorer: scrabbleScorer,
   scoringAlgorithms: scoringAlgorithms,
   newPointStructure: newPointStructure,
	runProgram: runProgram,
	scorerPrompt: scorerPrompt
};
