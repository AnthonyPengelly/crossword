import * as React from "react";
import {NumberedCrossword} from "../models/crossword";
import SquareModel from "../models/square";
import {NumberedClue} from "../models/clue";
import Direction from "../models/direction";
import Grid from "./grid";
import Square from "./square";
import Clues from "./clues";

interface CrosswordProps {
    crossword: NumberedCrossword;
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
        return (
            <div>
                <div className="clickable" onClick={this.props.returnToList}>Return to list</div>
                <h1>{this.props.crossword.name}</h1>
                <Grid crossword={this.props.crossword} selectedIndices={this.state.selectedIndices} onSquareClick={()=>{}} />
                <Clues clues={this.props.crossword.clues} selectClue={this.selectClue} />
            </div>
        );
    }

    selectClue(clue: NumberedClue): void {
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