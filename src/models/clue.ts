import Direction from "./direction";

interface Clue {
    clue: string;
    length: number;
    startingIndex: number;
    direction: Direction;
}

export type NumberedClue = Clue & {clueNumber: number};

export default Clue;