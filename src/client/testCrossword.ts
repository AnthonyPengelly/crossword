import Crossword from "../shared/models/crossword";
import Direction from "../shared/models/direction";

const crossword: Crossword = {
    name: "Easy Crossword",
    size: 8,
    squares: [
        {
            isBlank: false,
            letter: "O"
        },
        {
            isBlank: false,
            letter: "U"
        },
        {
            isBlank: false,
            letter: "T"
        },
        {
            isBlank: true
        },
        {
            isBlank: false,
            letter: "D"
        },
        {
            isBlank: false,
            letter: "A"
        },
        {
            isBlank: false,
            letter: "R"
        },
        {
            isBlank: false,
            letter: "N"
        },
        {
            isBlank: false,
            letter: "P"
        },
        {
            isBlank: true
        },
        {
            isBlank: false,
            letter: "H"
        },
        {
            isBlank: false,
            letter: "E"
        },
        {
            isBlank: true
        },
        {
            isBlank: false,
            letter: "I"
        },
        {
            isBlank: true
        },
        {
            isBlank: false,
            letter: "O"
        },
        {
            isBlank: false,
            letter: "E"
        },
        {
            isBlank: true
        },
        {
            isBlank: false,
            letter: "A"
        },
        {
            isBlank: true
        },
        {
            isBlank: false,
            letter: "D"
        },
        {
            isBlank: false,
            letter: "R"
        },
        {
            isBlank: false,
            letter: "Y"
        },
        {
            isBlank: true
        },
        {
            isBlank: false,
            letter: "N"
        },
        {
            isBlank: false,
            letter: "O"
        },
        {
            isBlank: false,
            letter: "T"
        },
        {
            isBlank: true
        },
        {
            isBlank: false,
            letter: "O"
        },
        {
            isBlank: true
        },
        {
            isBlank: false,
            letter: "A"
        },
        {
            isBlank: true
        },
        {
            isBlank: true
        },
        {
            isBlank: true
        },
        {
            isBlank: true
        },
        {
            isBlank: false,
            letter: "E"
        },
        {
            isBlank: true
        },
        {
            isBlank: false,
            letter: "A"
        },
        {
            isBlank: false,
            letter: "P"
        },
        {
            isBlank: false,
            letter: "E"
        },
        {
            isBlank: true
        },
        {
            isBlank: false,
            letter: "F"
        },
        {
            isBlank: false,
            letter: "A"
        },
        {
            isBlank: false,
            letter: "T"
        },
        {
            isBlank: true
        },
        {
            isBlank: false,
            letter: "M"
        },
        {
            isBlank: true
        },
        {
            isBlank: false,
            letter: "V"
        },
        {
            isBlank: true
        },
        {
            isBlank: true
        },
        {
            isBlank: true
        },
        {
            isBlank: true
        },
        {
            isBlank: false,
            letter: "M"
        },
        {
            isBlank: false,
            letter: "E"
        },
        {
            isBlank: true
        },
        {
            isBlank: false,
            letter: "E"
        },
        {
            isBlank: false,
            letter: "P"
        },
        {
            isBlank: false,
            letter: "A"
        },
        {
            isBlank: false,
            letter: "T"
        },
        {
            isBlank: false,
            letter: "H"
        },
        {
            isBlank: true
        },
        {
            isBlank: false,
            letter: "N"
        },
        {
            isBlank: false,
            letter: "U"
        },
        {
            isBlank: false,
            letter: "N"
        },
    ],
    clues: [
        {
            clue: "Not in",
            length: 3,
            startingIndex: 0,
            direction: Direction.Across
        },
        {
            clue: "The swear word you use when mending your socks",
            length: 4,
            startingIndex: 4,
            direction: Direction.Across
        },
        {
            clue: "Not she",
            length: 2,
            startingIndex: 10,
            direction: Direction.Across
        },
        {
            clue: "Not wet",
            length: 3,
            startingIndex: 20,
            direction: Direction.Across
        },
        {
            clue: "Negative - note without \"e\"",
            length: 3,
            startingIndex: 24,
            direction: Direction.Across
        },
        {
            clue: "Gorilla",
            length: 3,
            startingIndex: 37,
            direction: Direction.Across
        },
        {
            clue: "Not thin",
            length: 3,
            startingIndex: 41,
            direction: Direction.Across
        },
        {
            clue: "I, myself",
            length: 2,
            startingIndex: 52,
            direction: Direction.Across
        },
        {
            clue: "Walk up the garden...",
            length: 4,
            startingIndex: 56,
            direction: Direction.Across
        },
        {
            clue: "Female monk",
            length: 3,
            startingIndex: 61,
            direction: Direction.Across
        },
        {
            clue: "Not closed",
            length: 4,
            startingIndex: 0,
            direction: Direction.Down
        },
        {
            clue: "Not this",
            length: 4,
            startingIndex: 2,
            direction: Direction.Down
        },
        {
            clue: "We breathe this",
            length: 3,
            startingIndex: 5,
            direction: Direction.Down
        },
        {
            clue: "Not yes",
            length: 2,
            startingIndex: 7,
            direction: Direction.Down
        },
        {
            clue: "Dot without the \"t\"",
            length: 2,
            startingIndex: 20,
            direction: Direction.Down
        },
        {
            clue: "Talk like a dog",
            length: 3,
            startingIndex: 22,
            direction: Direction.Down
        },
        {
            clue: "Not of this World, also a Steven Spielberg film",
            length: 2,
            startingIndex: 35,
            direction: Direction.Down
        },
        {
            clue: "The end of a prayer",
            length: 4,
            startingIndex: 37,
            direction: Direction.Down
        },
        {
            clue: "Not odd",
            length: 4,
            startingIndex: 39,
            direction: Direction.Down
        },
    ]
};
export default crossword;