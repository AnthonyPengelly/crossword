import Square, {RawSquare} from "./square";
import Clue, {RawClue} from "./clue";

export interface RawCrossword {
    name: string;
    squares: RawSquare[];
    clues: RawClue[];
    size: number;
}

export default interface Crossword {
    name: string;
    squares: Square[];
    clues: Clue[];
    size: number;
}