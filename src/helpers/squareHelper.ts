import Square from "../models/square";

export function squaresAreNotEmpty(squares: Square[]): boolean {
    return !squares.some(square => !square.letter);
}