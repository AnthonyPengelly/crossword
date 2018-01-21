import Clue from "../models/clue";
import Square from "../models/square";
import Crossword from "../models/crossword";
import Direction from "../models/direction";
import {squaresAreNotEmpty} from "./squareHelper";

export function getUpdatedAnsweredCluesList(crossword: Crossword): number[] {
    const indices: number[] = [];
    crossword.clues.forEach((clue, index) => {
        if (squaresAreNotEmpty(getSquaresForClue(clue, crossword))) {
            indices.push(index);
        }
    });
    return indices;
}

export function getSquaresForClue(clue: Clue, crossword: Crossword): Square[] {
    let squares: Square[] = [];
    for(let i = 0; i < clue.length; i++) {
        if (clue.direction === Direction.Across) {
            squares.push(crossword.squares[clue.startingIndex + i]);
        } else {
            squares.push(crossword.squares[clue.startingIndex + (i * crossword.size)]);
        }
    }
    return squares;
}

export function getMaxLengthForClue(clue: Clue, crossword: Crossword): number {
    let maxLength = 0;
    let currentIndex = clue.startingIndex;
    
    while(currentIndex !== -1 && !crossword.squares[currentIndex].isBlank) {
        maxLength++;
        currentIndex = getIncrementedIndex(currentIndex, clue.direction, crossword);
    }

    return maxLength;
}

export function getIndexOfClue(clue: Clue, crossword: Crossword): number {
    return crossword.clues.findIndex(crosswordClue => 
        crosswordClue.startingIndex === clue.startingIndex
            && crosswordClue.direction === clue.direction);
}

function getIncrementedIndex(index: number, direction: Direction, crossword: Crossword): number {
    if (direction === Direction.Across) {
        const row = Math.floor(index / crossword.size);
        const newIndex = index + 1;
        if (Math.floor(newIndex / crossword.size) !== row || newIndex >= crossword.squares.length) {
            return -1;
        }
        return newIndex;
    } else {
        const newIndex = index + crossword.size;
        if (newIndex >= crossword.squares.length) {
            return -1;
        }
        return newIndex;
    }
}