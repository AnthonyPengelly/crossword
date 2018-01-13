import Square from "./square";
import Clue from "./clue";

interface Crossword {
    name: string;
    squares: Square[];
    clues: Clue[];
    size: number;
}

export default Crossword;