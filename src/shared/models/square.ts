interface Square {
    isBlank: boolean;
    letter?: string;
}

export type NumberedSquare = Square & {clueNumber?: number}

export default Square;