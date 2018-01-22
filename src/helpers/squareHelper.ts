import {NumberedCrossword} from "../models/crossword";
import Square from "../models/square";
import {NumberedClue} from "../models/clue";

export function squaresAreNotEmpty(squares: Square[]): boolean {
    return !squares.some(square => !square.letter);
}

export function getCluesForSquareIndex(index: number, crossword: NumberedCrossword): NumberedClue[] {
    const square = crossword.squares[index];
        if (!!square.clueNumber) {
            return crossword.clues.filter(clue =>
                clue.clueNumber === square.clueNumber
            );
        }
        return [];
}