import * as React from "react";
import {NumberedCrossword} from "../models/crossword";
import SquareModel from "../models/square";
import {NumberedClue} from "../models/clue";
import Direction from "../models/direction";
import Grid from "./grid";
import Square from "./square";
import Clues from "./clues";
import ClueSolver from "./clueSolver";
import {getSquaresForClue, getUpdatedAnsweredCluesList} from "../helpers/clueHelper";
import {getCluesForSquareIndex} from "../helpers/squareHelper";
import {getUpdatedSquaresWithAnswer} from "../helpers/answerHelper";

interface CrosswordProps {
    crossword: NumberedCrossword;
    returnToList: () => void;
}

interface CrosswordState {
    crossword: NumberedCrossword;
    answeredClues: number[];
    selectedClue?: NumberedClue;
}

export default class Crossword extends React.Component<CrosswordProps, CrosswordState> {
    constructor(props: CrosswordProps) {
        super(props);
        this.state = {selectedClue: undefined, crossword: props.crossword, answeredClues: []};
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
            selectedIndices = this.getSelectedIndices();
            clueSolver = this.renderClueSolver();
        }
        return (
            <div>
                <div className="clickable" onClick={this.props.returnToList}>Return to list</div>
                <h1>{this.props.crossword.name}</h1>
                <Grid crossword={this.props.crossword} selectedIndices={selectedIndices} onSquareClick={this.selectSquare} />
                <Clues
                    clues={this.props.crossword.clues}
                    selectClue={this.selectClue}
                    answeredCluesIndices={this.state.answeredClues}
                />
                {clueSolver}
            </div>
        );
    }

    renderClueSolver(): JSX.Element {
        const selectedSquares = getSquaresForClue(this.state.selectedClue, this.state.crossword);
        const answer = selectedSquares.map(square => square.letter).join("");
        return (
            <ClueSolver
                clue={this.state.selectedClue}
                updateAnswer={this.updateAnswer}
                closeClueSolver={this.deselectClue}
                answer={answer}
            />
        );
    }

    getSelectedIndices(): number[] {
        return getSquaresForClue(this.state.selectedClue, this.state.crossword)
            .map(square => this.state.crossword.squares.indexOf(square));
    }

    selectSquare(index: number) {
        const clues = getCluesForSquareIndex(index, this.state.crossword);
        if (clues.length > 1 && !!this.state.selectedClue && this.state.selectedClue.startingIndex === index) {
                this.selectClue(clues.find(clue => clue.direction !== this.state.selectedClue.direction));
        } else if (clues.length >= 1) {
            this.selectClue(clues[0]);
        }
    }

    selectClue(clue: NumberedClue): void {
        this.setState({selectedClue: clue});
    }

    deselectClue(): void {
        this.setState({selectedClue: undefined});
    }

    updateAnswer(clue: NumberedClue, answer: string) {
        this.state.crossword.squares = getUpdatedSquaresWithAnswer(answer, clue, this.state.crossword);
        this.setState({
            answeredClues: getUpdatedAnsweredCluesList(this.state.crossword)
        });
        this.deselectClue();
    }
}