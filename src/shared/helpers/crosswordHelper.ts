import {default as Crossword, NumberedCrossword} from "../models/crossword";
import {default as Clue, NumberedClue} from "../models/clue";
import {NumberedSquare} from "../models/square";

export function createBlankCrossword(name: string, size: number): NumberedCrossword {
    let squares: NumberedSquare[] = [];
        for(let i = 0; i < (size * size); i++) {
            squares.push({isBlank: false});
        }
        return {
            name: name,
            size: size,
            squares: squares,
            clues: []
        };
}

export function getEmptyCrosswordFromCrossword(crossword: NumberedCrossword): NumberedCrossword {
    return getCrosswordWithSquareModifier(crossword, (square: NumberedSquare) => {
        return {
            isBlank: square.isBlank,
            clueNumber: square.clueNumber
        }
    });
}

export function getCrosswordForEditing(crossword: NumberedCrossword): NumberedCrossword {
    if (!crossword) {
        return undefined;
    }
    return getCrosswordWithSquareModifier(crossword, (square: NumberedSquare) => {
        return {
            isBlank: false,
            letter: square.letter,
            clueNumber: square.clueNumber
        }
    });
}

export function mapCrosswordToNumberedCrossword(crossword: Crossword): NumberedCrossword {
    const numberedClues = mapCluesToNumberedClues(crossword.clues);
    const numberedSquares = crossword.squares as NumberedSquare[];
    numberedClues.forEach(clue => {
        numberedSquares[clue.startingIndex].clueNumber = clue.clueNumber;
    });
    return {
        name: crossword.name,
        size: crossword.size,
        clues: numberedClues,
        squares: numberedSquares
    };
}

function mapCluesToNumberedClues(clues: Clue[]): NumberedClue[] {
    const sortedClues = clues.sort((a, b) => a.startingIndex - b.startingIndex);
    let currentIndex = -1;
    let currentClueNumber = 0;
    return sortedClues.map(clue => {
        if (clue.startingIndex > currentIndex) {
            currentClueNumber++;
        }
        currentIndex = clue.startingIndex;
        return Object.assign({}, clue, {clueNumber: currentClueNumber});
    });
}

function getCrosswordWithSquareModifier(
        crossword: NumberedCrossword,
        squareModifier: (square: NumberedSquare) => NumberedSquare): NumberedCrossword {

    const squares = crossword.squares.map(square => squareModifier(square));
    return {
        name: crossword.name,
        clues: crossword.clues,
        squares: squares,
        size: crossword.size
    };
}