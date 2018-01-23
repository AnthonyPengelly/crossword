import Direction from "./direction";

export interface RawClue {
    clue: string;
    length: number;
    startingIndex: number;
    direction: Direction;
}

type Clue = RawClue & {clueNumber: number};
export default Clue;