import Crossword from "../models/crossword";
import Square from "../models/square";
import Clue from "../models/clue";
import {getSquaresForClue, crosswordHasMultipleCluesWithNumber} from "./clueHelper";

export function squaresAreNotEmpty(squares: Square[]): boolean {
    return !squares.some(square => !square.letter);
}

export function getCluesForSquareIndex(index: number, crossword: Crossword): Clue[] {
    const square = crossword.squares[index];
        if (!!square.clueNumber) {
            return crossword.clues.filter(clue =>
                clue.clueNumber === square.clueNumber
            );
        }
        return [];
}

export function removeClueNumbersIfNeeded(clue: Clue, crossword: Crossword): void {
    const squares = getSquaresForClue(clue, crossword);
    const shouldRemoveClueNumber = !crosswordHasMultipleCluesWithNumber(clue.startingIndex, crossword);
    for(let i = 0; i < clue.length; i++) {
        squares[i].letter = undefined;
        if (shouldRemoveClueNumber) {
            (squares[i] as Square).clueNumber = undefined;
        }
    }
}