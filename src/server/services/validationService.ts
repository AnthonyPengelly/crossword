import Crossword from "../../shared/models/crossword";
import Clue from "../../shared/models/clue";
import Square from "../../shared/models/square";
import ValidationError from "../errors/validationError";

export default class ValidationService {
    validateCrossword(crossword: Crossword) {
        this.validateProperties(crossword);
        this.validateClues(crossword);
        this.validateSquares(crossword);
    }

    private validateProperties(crossword: Crossword) {
        if (!crossword) throw new ValidationError("Crossword is undefined");
        if (!crossword.name) throw new ValidationError("Crossword must have a name");
        if (!crossword.size) throw new ValidationError("Crossword must have a size");
    }

    private validateClues(crossword: Crossword) {
        if (!crossword.clues || crossword.clues.length === 0) {
            throw new ValidationError("Crossword must have clues");
        }
        crossword.clues.forEach(this.validateClue);
    }

    private validateSquares(crossword: Crossword) {
        if (!crossword.squares || crossword.squares.length === 0) {
            throw new ValidationError("Crossword must have squares");
        }
        if (crossword.squares.length !== (crossword.size * crossword.size)) {
            throw new ValidationError("Crossword has wrong number of squares");
        }
        crossword.squares.forEach(this.validateSquare);
    }

    private validateClue(clue: Clue) {
        if (!clue) throw new ValidationError("Clue is undefined");
        if (!clue.clue) throw new ValidationError("Clue must contain text");
        if (!clue.clueNumber) throw new ValidationError("Clue must have a number");
        if (!clue.length || clue.length <= 0) throw new ValidationError("Clue must have length greater than zero");
    }

    private validateSquare(square: Square) {
        if (!square) throw new ValidationError("Square is undefined");
    }
}