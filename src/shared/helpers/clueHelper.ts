import Clue, {RawClue} from "../models/clue";
import Square from "../models/square";
import Crossword from "../models/crossword";
import Direction from "../models/direction";
import {squaresAreNotEmpty} from "./squareHelper";

export function createBlankClue(squareIndex: number, direction: Direction): RawClue {
    return {
        clue: "",
        length: 0,
        startingIndex: squareIndex,
        direction: direction
    };
}

export function getUpdatedAnsweredCluesList(crossword: Crossword): number[] {
    const indices: number[] = [];
    crossword.clues.forEach((clue, index) => {
        if (squaresAreNotEmpty(getSquaresForClue(clue, crossword))) {
            indices.push(index);
        }
    });
    return indices;
}

export function getSquaresForClue(clue: RawClue, crossword: Crossword): Square[] {
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

export function getMaxSquaresForClue(clue: Clue, crossword: Crossword): Square[] {
    const maxLength = getMaxLengthForClue(clue, crossword);
    const mockClue: RawClue = {
        clue: clue.clue,
        startingIndex: clue.startingIndex,
        direction: clue.direction,
        length: maxLength
    }
    return getSquaresForClue(mockClue, crossword);
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

export function getClueForSquareAndDirection(squareIndex: number, direction: Direction, crossword: Crossword): Clue | undefined {
    const clue = crossword.clues.find(clue =>
        clue.startingIndex === squareIndex && clue.direction === direction
    );
    return !!clue ? clue : undefined;
}

export function getIndexOfClue(clue: Clue, crossword: Crossword): number {
    return crossword.clues.findIndex(crosswordClue => 
        crosswordClue.startingIndex === clue.startingIndex
            && crosswordClue.direction === clue.direction);
}

export function crosswordHasMultipleCluesWithNumber(clueNumber: number, crossword: Crossword): boolean {
    const clues = crossword.clues.filter(clue =>
        clue.clueNumber === clueNumber
    );
    return clues.length > 1;
}

export function getIncrementedIndex(index: number, direction: Direction, crossword: Crossword): number {
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