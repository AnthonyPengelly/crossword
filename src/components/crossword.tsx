import * as React from "react";
import {NumberedCrossword} from "../models/crossword";
import SquareModel from "../models/square";
import {NumberedClue} from "../models/clue";
import Direction from "../models/direction";
import Grid from "./grid";
import Square from "./square";
import Clues from "./clues";
import ClueSolver from "./clueSolver";
import {getSquaresForClue} from "../helpers/answerHelper";

interface CrosswordProps {
    crossword: NumberedCrossword;
    returnToList: () => void;
}

interface CrosswordState {
    crossword: NumberedCrossword;
    selectedClue?: NumberedClue;
}

export default class Crossword extends React.Component<CrosswordProps, CrosswordState> {
    constructor(props: CrosswordProps) {
        super(props);
        this.state = {selectedClue: undefined, crossword: props.crossword};
        this.selectClue = this.selectClue.bind(this);
        this.selectSquare = this.selectSquare.bind(this);
        this.deselectClue = this.deselectClue.bind(this);
        this.updateAnswer = this.updateAnswer.bind(this);
    }

    componentWillReceiveProps(newProps: CrosswordProps) {
        this.setState({crossword: newProps.crossword});
    }
    
    render(): JSX.Element {
        let selectedIndices: number[] = [];
        let clueSolver: JSX.Element = undefined;
        if (!!this.state.selectedClue) {
            const selectedSquares = getSquaresForClue(this.state.selectedClue, this.state.crossword);
            const answer = selectedSquares.map (square => square.letter).join("");
            selectedIndices = selectedSquares.map(square => this.state.crossword.squares.indexOf(square));
            clueSolver = (
                <ClueSolver
                    clue={this.state.selectedClue}
                    updateAnswer={this.updateAnswer}
                    closeClueSolver={this.deselectClue}
                    answer={answer}
                />
            );
        }
        return (
            <div>
                <div className="clickable" onClick={this.props.returnToList}>Return to list</div>
                <h1>{this.props.crossword.name}</h1>
                <Grid crossword={this.props.crossword} selectedIndices={selectedIndices} onSquareClick={this.selectSquare} />
                <Clues clues={this.props.crossword.clues} selectClue={this.selectClue} />
                {clueSolver}
            </div>
        );
    }

    selectSquare(index: number) {
        const square = this.state.crossword.squares[index];
        if (!!square.clueNumber) {
            this.selectClue(this.state.crossword.clues.find(clue =>
                clue.clueNumber === square.clueNumber
            ));
        }
    }

    selectClue(clue: NumberedClue): void {
        this.setState({selectedClue: clue});
    }

    deselectClue(): void {
        this.setState({selectedClue: undefined});
    }

    updateAnswer(clue: NumberedClue, answer: string) {
        const squares = getSquaresForClue(clue, this.state.crossword);
        for (let i = 0; i < answer.length; i++) {
            squares[i].letter = answer[i].toUpperCase();
        }
        this.deselectClue();
    }
}