import Clue from "../models/clue";
import Crossword from "../models/crossword";
import {getSquaresForClue, getIncrementedIndex} from "./clueHelper";

export function getUpdatedSquaresWithAnswer(answer: string, clue: Clue, crossword: Crossword) {
    const squares = crossword.squares;
    let squareIndex = clue.startingIndex;
    for (let i = 0; i < clue.length; i++) {
        if (i < answer.length) {
            squares[squareIndex].letter = answer[i].toUpperCase();
        } else {
            squares[squareIndex].letter = undefined;
        }
        squareIndex = getIncrementedIndex(squareIndex, clue.direction, crossword);
    }
    return squares;
}

export function answerIsValid(answer: string, clue: Clue): boolean {
    const regex = new RegExp("[a-zA-Z]");
    for (let i = 0; i < answer.length; i++) {
        if (!regex.test(answer[i])) {
            return false;
        }
    }
    return answer.length <= clue.length;
}