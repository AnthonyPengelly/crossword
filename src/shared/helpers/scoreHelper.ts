import Crossword from "../models/crossword";

export function getScorePercentageForMarkedCrossword(crossword: Crossword): number {
    const answerableSquares = crossword.squares.filter(square => !square.isBlank);
    const correctlyAnswered = answerableSquares.filter(square => !square.isIncorrect).length;
    return (correctlyAnswered / answerableSquares.length) * 100;
}