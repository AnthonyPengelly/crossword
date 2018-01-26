export interface RawSquare {
    isBlank: boolean;
    letter?: string;
    isIncorrect?: boolean;
}

type Square = RawSquare & {clueNumber?: number}
export default Square;