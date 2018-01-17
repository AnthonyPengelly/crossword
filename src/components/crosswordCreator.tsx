import * as React from "react";
import {NumberedCrossword} from "../models/crossword";
import SquareModel from "../models/square";
import Grid from "./grid";
import Clues from "./clues";
import CrosswordDetailsInput from "./crosswordDetailsInput";

interface CrosswordCreatorProps {
    returnToList: () => void;
    createCrossword: (crossword: NumberedCrossword) => void;
}

interface CrosswordCreatorState {
    crossword: NumberedCrossword;
}

export default class CrosswordCreator extends React.Component<CrosswordCreatorProps, CrosswordCreatorState> {
    constructor(props: CrosswordCreatorProps) {
        super(props);
        this.state = {crossword: undefined};
        this.createBlankCrossword = this.createBlankCrossword.bind(this);
    }
    
    render(): JSX.Element {
        return (
            <div>
                <div className="clickable" onClick={this.props.returnToList}>Return to list</div>
                <h1>Crossword Creator</h1>
                {this.getContent()}
            </div>
        );
    }

    getContent(): JSX.Element {
        if (this.state.crossword === undefined) {
            return <CrosswordDetailsInput createCrossword={this.createBlankCrossword} />;
        } else {
            return <Grid crossword={this.state.crossword} selectedIndices={[]} />;
        }
    }

    createBlankCrossword(name: string, size: number) {
        let squares: SquareModel[] = [];
        for(let i = 0; i < (size * size); i++) {
            squares.push({isBlank: true});
        }
        this.setState({crossword: {
            name: name,
            size: size,
            squares: squares,
            clues: []
        }});
    }

    // selectClue(clue: NumberedClue): void {
    //     const indices: number[] = [];
    //     for(let i = 0; i < clue.length; i++) {
    //         if (clue.direction === Direction.Across) {
    //             indices.push(clue.startingIndex + i);
    //         } else {
    //             indices.push(clue.startingIndex + (i * this.props.crossword.size));
    //         }
    //     }
    //     this.setState({selectedIndices: indices});
    // }
}