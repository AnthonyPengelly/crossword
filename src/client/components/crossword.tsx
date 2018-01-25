import * as React from "react";
import {Link} from "react-router-dom";
import CrosswordModel from "../../shared/models/crossword";
import SquareModel from "../../shared/models/square";
import Clue from "../../shared/models/clue";
import Direction from "../../shared/models/direction";
import Grid from "./grid";
import Square from "./square";
import Clues from "./clues";
import ClueSolver from "./clueSolver";
import {getSquaresForClue, getUpdatedAnsweredCluesList} from "../../shared/helpers/clueHelper";
import {getCluesForSquareIndex} from "../../shared/helpers/squareHelper";
import {getUpdatedSquaresWithAnswer} from "../../shared/helpers/answerHelper";
import crosswordApi from "../api/crosswordApi";

interface CrosswordProps {
    match: {
        params: {
            id: string
        }
    };
}

interface CrosswordState {
    crossword: CrosswordModel;
    answeredClues: number[];
    selectedClue?: Clue;
}

export default class Crossword extends React.Component<CrosswordProps, CrosswordState> {
    constructor(props: CrosswordProps) {
        super(props);
        this.state = {selectedClue: undefined, crossword: undefined, answeredClues: []};
        this.selectClue = this.selectClue.bind(this);
        this.selectSquare = this.selectSquare.bind(this);
        this.deselectClue = this.deselectClue.bind(this);
        this.updateAnswer = this.updateAnswer.bind(this);
    }

    componentDidMount() {
        this.getCrossword();
    }
    
    render(): JSX.Element {
        if (!this.state.crossword) {
            return <div>Loading</div>;
        }

        let selectedIndices: number[] = [];
        let clueSolver: JSX.Element = undefined;
        if (!!this.state.selectedClue) {
            selectedIndices = this.getSelectedIndices();
            clueSolver = this.renderClueSolver();
        }
        return (
            <div>
                <Link className="clickable" to="/">Return to list</Link>
                <h1>{this.state.crossword.name}</h1>
                <Grid crossword={this.state.crossword} selectedIndices={selectedIndices} onSquareClick={this.selectSquare} />
                <Clues
                    clues={this.state.crossword.clues}
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

    selectClue(clue: Clue): void {
        this.setState({selectedClue: clue});
    }

    deselectClue(): void {
        this.setState({selectedClue: undefined});
    }

    updateAnswer(clue: Clue, answer: string) {
        this.state.crossword.squares = getUpdatedSquaresWithAnswer(answer, clue, this.state.crossword);
        this.setState({
            answeredClues: getUpdatedAnsweredCluesList(this.state.crossword)
        });
        this.deselectClue();
    }

    async getCrossword() {
        const crossword = await crosswordApi.getById(this.props.match.params.id);
        if (!!crossword) {
            this.setState({crossword: crossword});
        }
    }
}