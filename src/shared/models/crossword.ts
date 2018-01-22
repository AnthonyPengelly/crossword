import {default as Square, NumberedSquare} from "./square";
import {default as Clue, NumberedClue} from "./clue";

interface Crossword {
    name: string;
    squares: Square[];
    clues: Clue[];
    size: number;
}

export interface NumberedCrossword {
    name: string;
    squares: NumberedSquare[];
    clues: NumberedClue[];
    size: number;
}

export default Crossword;