import Crossword from "../../shared/models/crossword";
import Square from "../../shared/models/square";

export default class MarkingService {
    getMarkedCrossword(crossword: Crossword, correctCrossword: Crossword): Crossword {
        correctCrossword.squares = correctCrossword.squares.map((square, index) => 
            this.getMarkedSquare(crossword.squares[index], square)
        );
        return correctCrossword;
    }

    getMarkedSquare(square: Square, correctSquare: Square): Square {
        correctSquare.isIncorrect = !correctSquare.isBlank && square.letter !== correctSquare.letter;
        return correctSquare;
    }
}