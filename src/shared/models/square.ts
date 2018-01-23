export interface RawSquare {
    isBlank: boolean;
    letter?: string;
}

export type Square = RawSquare & {clueNumber?: number}
export default Square;