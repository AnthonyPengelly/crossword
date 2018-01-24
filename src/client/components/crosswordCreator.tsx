import * as React from "react";
import Crossword from "../../shared/models/crossword";
import SquareModel from "../../shared/models/square";
import Clue from "../../shared/models/clue";
import Direction from "../../shared/models/direction";
import Grid from "./grid";
import Clues from "./clues";
import ClueEditor from "./clueEditor";
import CrosswordDetailsInput from "./crosswordDetailsInput";
import {mapCrosswordToNumberedCrossword, createBlankCrossword} from "../../shared/helpers/crosswordHelper";
import { getAnswerForClue } from "../../shared/helpers/answerHelper";
import {getSquaresForClue, getMaxLengthForClue, getMaxSquaresForClue,
    getIndexOfClue, createBlankClue, getClueForSquareAndDirection} from "../../shared/helpers/clueHelper";
import { removeClueNumbersIfNeeded } from "../../shared/helpers/squareHelper";

interface CrosswordCreatorProps {
    crossword?: Crossword;
    returnToList: () => void;
    createCrossword: (crossword: Crossword) => void;
}

interface CrosswordCreatorState {
    crossword: Crossword;
    selectedIndices: number[];
    selectedSquareIndex?: number;
    currentClue?: Clue;
}

export default class CrosswordCreator extends React.Component<CrosswordCreatorProps, CrosswordCreatorState> {
    constructor(props: CrosswordCreatorProps) {
        super(props);
        this.state = {crossword: props.crossword, selectedIndices: []};
        this.createBlankCrossword = this.createBlankCrossword.bind(this);
        this.completeCrossword = this.completeCrossword.bind(this);
        this.selectSquare = this.selectSquare.bind(this);
        this.selectClue = this.selectClue.bind(this);
        this.closeClueCreator = this.closeClueCreator.bind(this);
        this.changeDirection = this.changeDirection.bind(this);
        this.updateClue = this.updateClue.bind(this);
        this.deleteClue = this.deleteClue.bind(this);
    }

    componentWillReceiveProps(newProps: CrosswordCreatorProps): void {
        this.setState({crossword: newProps.crossword});
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
            return (
                <React.Fragment>
                    <h2>{this.state.crossword.name}</h2>
                    <Grid crossword={this.state.crossword} selectedIndices={this.getSelectedIndices()} onSquareClick={this.selectSquare} />
                    <Clues clues={this.state.crossword.clues} selectClue={this.selectClue} answeredCluesIndices={[]} />
                    {this.renderClueEditor()}
                    <button onClick={this.completeCrossword}>Complete</button>
                </React.Fragment>
            );
        }
    }

    renderClueEditor(): JSX.Element {
        if (this.state.currentClue !== undefined) {
            return (
                <ClueEditor
                    clue={this.state.currentClue}
                    answer={getAnswerForClue(this.state.currentClue, this.state.crossword)}
                    maxLength={getMaxLengthForClue(this.state.currentClue, this.state.crossword)}
                    updateClue={this.updateClue}
                    deleteClue={this.deleteClue}
                    changeDirection={this.changeDirection}
                    closeClueEditor={this.closeClueCreator}
                />
            );
        }
    }

    completeCrossword(): void {
        this.state.crossword.squares.forEach(square => {
            if (!square.letter) {
                square.isBlank = true;
            }
        });
        this.props.createCrossword(this.state.crossword);
    }

    updateClue(newClue: Clue, answer: string): void {
        if (getMaxLengthForClue(newClue, this.state.crossword) >= answer.length) {
            this.writeAnswerFromClueToGrid(answer, newClue);
            this.addOrUpdateClue(newClue);
            this.setState({crossword: mapCrosswordToNumberedCrossword(this.state.crossword)});
            this.resetState();
        }
    }

    deleteClue(clue: Clue): void {
        removeClueNumbersIfNeeded(clue, this.state.crossword);
        // Remove clue from list
        this.state.crossword.clues.splice(getIndexOfClue(clue, this.state.crossword), 1);
        this.setState({crossword: mapCrosswordToNumberedCrossword(this.state.crossword)});
        this.resetState();
    }

    selectClue(clue: Clue): void {
        this.setState({selectedSquareIndex: clue.startingIndex, currentClue: clue});
    }

    createBlankCrossword(name: string, size: number) {
        this.setState({crossword: createBlankCrossword(name, size)});
    }

    closeClueCreator(): void {
        this.resetState();
    }

    selectSquare(squareIndex: number): void {
        let direction = Direction.Across;
        if (squareIndex === this.state.selectedSquareIndex && !! this.state.currentClue) {
            direction = this.state.currentClue.direction === Direction.Across
                ? Direction.Down
                : Direction.Across;
        }
        this.selectSquareWithDirection(squareIndex, direction);
    }

    selectSquareWithDirection(squareIndex: number, direction: Direction): void {
        let clue = getClueForSquareAndDirection(squareIndex, direction, this.state.crossword);
        if (!clue) {
            clue = createBlankClue(squareIndex, direction) as Clue;
        }
        this.setState({selectedSquareIndex: squareIndex, currentClue: clue});
    }

    changeDirection(direction: Direction): void {
        this.selectSquareWithDirection(this.state.selectedSquareIndex, direction);
    }

    writeAnswerFromClueToGrid(answer: string, clue: Clue): void {
        const squares = getSquaresForClue(clue, this.state.crossword);
        for(let i = 0; i < clue.length; i++) {
            squares[i].letter = answer[i].toUpperCase();
        }
    }

    addOrUpdateClue(clue: Clue): void {
        const indexOfClue = getIndexOfClue(clue, this.state.crossword);
        if (indexOfClue !== -1) {
            this.state.crossword.clues[indexOfClue] = clue as Clue;
        } else {
            this.state.crossword.clues.push(clue as Clue);
        }
    }

    getSelectedIndices(): number[] {
        if (!this.state.currentClue) {
            return [];
        }
        let selectedSquares: SquareModel[] = [];
        if (this.state.currentClue.length === 0) {
            selectedSquares = getMaxSquaresForClue(this.state.currentClue, this.state.crossword);
        } else {
            selectedSquares = getSquaresForClue(this.state.currentClue, this.state.crossword);
        }
        return selectedSquares.map(square => this.state.crossword.squares.indexOf(square));
    }

    resetState(): void {
        this.setState({currentClue: undefined, selectedSquareIndex: undefined});
    }
}