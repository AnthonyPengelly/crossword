import * as React from "react";
import CrosswordModel from "../models/crossword";
import SquareModel from "../models/square";
import ClueModel from "../models/clue";
import Direction from "../models/direction";
import Square from "./square";
import Clues from "./clues";

interface GridProps {
    crossword: CrosswordModel;
    selectedIndices: number[];
    onSquareClick: (index: number) => void;
}

export default class Grid extends React.Component<GridProps, {}> {
    render(): JSX.Element {
        const squareClasses = "square square--" + this.props.crossword.size;
        const gridClasses = "grid grid--" + this.props.crossword.size;
        const grid = this.props.crossword.squares.map((square, index) => (
            <Square
                key={index}
                square={square}
                isSelected={this.props.selectedIndices.indexOf(index) !== -1}
                className={squareClasses}
                onSquareClick={() => this.props.onSquareClick(index)}
            />
        ));
        return (
            <div className={gridClasses}>
                {grid}
            </div>
        );
    }
}