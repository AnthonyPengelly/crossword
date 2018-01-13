import * as React from "react";
import CrosswordModel from "../models/crossword";
import SquareModel from "../models/square";
import ClueModel from "../models/clue";
import Direction from "../models/direction";
import Square from "./square";
import Clues from "./clues";

interface CrosswordProps {
    crossword: CrosswordModel;
    returnToList: () => void;
}

interface CrosswordState {
    selectedIndices: number[];
}

export default class Crossword extends React.Component<CrosswordProps, CrosswordState> {
    constructor(props: CrosswordProps) {
        super(props);
        this.state = {selectedIndices: []};
        this.selectClue = this.selectClue.bind(this);
    }
    
    render(): JSX.Element {
        const squareClasses = "square square--" + this.props.crossword.size;
        const gridClasses = "grid grid--" + this.props.crossword.size;
        const grid = this.props.crossword.squares.map((square, index) => (
            <Square
                key={index}
                square={square}
                isSelected={this.state.selectedIndices.indexOf(index) !== -1}
                className={squareClasses}
            />
        ));
        return (
            <div>
                <div className="clickable" onClick={this.props.returnToList}>Return to list</div>
                <h1>{this.props.crossword.name}</h1>
                <div className={gridClasses}>{grid}</div>
                <Clues clues={this.props.crossword.clues} selectClue={this.selectClue} />
            </div>
        );
    }

    selectClue(clue: ClueModel): void {
        const indices: number[] = [];
        for(let i = 0; i < clue.length; i++) {
            if (clue.direction === Direction.Across) {
                indices.push(clue.startingIndex + i);
            } else {
                indices.push(clue.startingIndex + (i * this.props.crossword.size));
            }
        }
        this.setState({selectedIndices: indices});
    }
}