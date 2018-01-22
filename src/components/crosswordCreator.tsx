import * as React from "react";
import {NumberedCrossword} from "../models/crossword";
import {default as SquareModel, NumberedSquare} from "../models/square";
import { NumberedClue, default as Clue } from "../models/clue";
import Direction from "../models/direction";
import Grid from "./grid";
import Clues from "./clues";
import ClueEditor from "./clueEditor";
import CrosswordDetailsInput from "./crosswordDetailsInput";
import Crossword from "./crossword";
import {mapCrosswordToNumberedCrossword, getCrosswordForEditing, createBlankCrossword} from "../helpers/crosswordHelper";
import { getAnswerForClue } from "../helpers/answerHelper";
import {getSquaresForClue, getMaxLengthForClue, getMaxSquaresForClue,
    getIndexOfClue, createBlankClue, getClueForSquareAndDirection} from "../helpers/clueHelper";

interface CrosswordCreatorProps {
    crossword?: NumberedCrossword;
    returnToList: () => void;
    createCrossword: (crossword: NumberedCrossword) => void;
}

interface CrosswordCreatorState {
    crossword: NumberedCrossword;
    selectedIndices: number[];
    selectedSquareIndex?: number;
    currentClue?: Clue;
}

export default class CrosswordCreator extends React.Component<CrosswordCreatorProps, CrosswordCreatorState> {
    constructor(props: CrosswordCreatorProps) {
        super(props);
        this.state = {crossword: getCrosswordForEditing(props.crossword), selectedIndices: []};
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
        this.setState({crossword: getCrosswordForEditing(newProps.crossword)});
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
            let clueEditor: JSX.Element = undefined;
            let selectedIndices: number[] = [];
            if (this.state.currentClue !== undefined) {
                clueEditor = (
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
                let selectedSquares: SquareModel[] = [];
                if (this.state.currentClue.length === 0) {
                    selectedSquares = getMaxSquaresForClue(this.state.currentClue, this.state.crossword);
                } else {
                    selectedSquares = getSquaresForClue(this.state.currentClue, this.state.crossword);
                }
                selectedIndices = selectedSquares.map(square => this.state.crossword.squares.indexOf(square));
            }
            return (
                <React.Fragment>
                    <h2>{this.state.crossword.name}</h2>
                    <Grid crossword={this.state.crossword} selectedIndices={selectedIndices} onSquareClick={this.selectSquare} />
                    <Clues clues={this.state.crossword.clues} selectClue={this.selectClue} answeredCluesIndices={[]} />
                    {clueEditor}
                    <button onClick={this.completeCrossword}>Complete</button>
                </React.Fragment>
            );
        }
    }

    createBlankCrossword(name: string, size: number) {
        this.setState({crossword: createBlankCrossword(name, size)});
    }

    completeCrossword(): void {
        this.state.crossword.squares.forEach(square => {
            if (!square.letter) {
                square.isBlank = true;
            }
        });
        this.props.createCrossword(this.state.crossword);
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
            clue = createBlankClue(squareIndex, direction);
        }
        this.setState({selectedSquareIndex: squareIndex, currentClue: clue});
    }

    changeDirection(direction: Direction): void {
        this.selectSquareWithDirection(this.state.selectedSquareIndex, direction);
    }

    updateClue(newClue: Clue, answer: string): void {
        if (getMaxLengthForClue(newClue, this.state.crossword) >= answer.length) {
            this.writeAnswerFromClueToGrid(answer, newClue);
            const indexOfClue = getIndexOfClue(newClue, this.state.crossword);
            if (indexOfClue !== -1) {
                this.state.crossword.clues[indexOfClue] = newClue as NumberedClue;
            } else {
                this.state.crossword.clues.push(newClue as NumberedClue);
            }
            this.setState({crossword: mapCrosswordToNumberedCrossword(this.state.crossword)});
            this.resetState();
        }
    }

    deleteClue(clue: NumberedClue): void {
        const squares = getSquaresForClue(clue, this.state.crossword);
        const shouldRemoveClueNumber = this.state.crossword.clues.filter(currentClue =>
            currentClue.clueNumber === clue.clueNumber
        ).length <= 1;
        for(let i = 0; i < clue.length; i++) {
            squares[i].letter = undefined;
            if (shouldRemoveClueNumber) {
                (squares[i] as NumberedSquare).clueNumber = undefined;
            }
        }
        // Remove clue from list
        this.state.crossword.clues.splice(getIndexOfClue(clue, this.state.crossword), 1);
        this.setState({crossword: mapCrosswordToNumberedCrossword(this.state.crossword)});
        this.resetState();
    }

    selectClue(clue: NumberedClue): void {
        this.setState({selectedSquareIndex: clue.startingIndex, currentClue: clue});
    }

    writeAnswerFromClueToGrid(answer: string, clue: Clue): void {
        const squares = getSquaresForClue(clue, this.state.crossword);
        for(let i = 0; i < clue.length; i++) {
            squares[i].letter = answer[i].toUpperCase();
        }
    }

    resetState(): void {
        this.setState({currentClue: undefined, selectedSquareIndex: undefined});
    }
}