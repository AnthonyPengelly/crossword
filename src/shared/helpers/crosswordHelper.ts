import Crossword, {RawCrossword} from "../models/crossword";
import Clue, {RawClue} from "../models/clue";
import Square from "../models/square";

export function createBlankCrossword(name: string, size: number): Crossword {
    let squares: Square[] = [];
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

export function getEmptyCrosswordFromCrossword(crossword: Crossword): Crossword {
    return getCrosswordWithSquareModifier(crossword, (square: Square) => {
        return {
            isBlank: square.isBlank,
            clueNumber: square.clueNumber
        }
    });
}

export function getCrosswordForEditing(crossword: Crossword): Crossword {
    if (!crossword) {
        return undefined;
    }
    return getCrosswordWithSquareModifier(crossword, (square: Square) => {
        return {
            isBlank: false,
            letter: square.letter,
            clueNumber: square.clueNumber
        }
    });
}

export function mapCrosswordToNumberedCrossword(crossword: RawCrossword): Crossword {
    const numberedClues = mapCluesToNumberedClues(crossword.clues);
    const numberedSquares = crossword.squares as Square[];
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

function mapCluesToNumberedClues(clues: RawClue[]): Clue[] {
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
        crossword: Crossword,
        squareModifier: (square: Square) => Square): Crossword {

    const squares = crossword.squares.map(square => squareModifier(square));
    return {
        id: crossword.id,
        name: crossword.name,
        clues: crossword.clues,
        squares: squares,
        size: crossword.size
    };
}