export interface RawSquare {
    isBlank: boolean;
    letter?: string;
}

type Square = RawSquare & {clueNumber?: number}
export default Square;