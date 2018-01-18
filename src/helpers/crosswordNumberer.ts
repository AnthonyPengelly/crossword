import {default as Crossword, NumberedCrossword} from "../models/crossword";
import {default as Clue, NumberedClue} from "../models/clue";
import {NumberedSquare} from "../models/square";

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