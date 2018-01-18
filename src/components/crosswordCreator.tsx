import * as React from "react";
import {NumberedCrossword} from "../models/crossword";
import SquareModel from "../models/square";
import { NumberedClue, default as Clue } from "../models/clue";
import Direction from "../models/direction";
import Grid from "./grid";
import Clues from "./clues";
import ClueEditor from "./clueEditor";
import CrosswordDetailsInput from "./crosswordDetailsInput";
import Crossword from "./crossword";
import {mapCrosswordToNumberedCrossword} from "../helpers/crosswordNumberer";

interface CrosswordCreatorProps {
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
        this.state = {crossword: undefined, selectedIndices: []};
        this.createBlankCrossword = this.createBlankCrossword.bind(this);
        this.selectSquare = this.selectSquare.bind(this);
        this.highlightClue = this.highlightClue.bind(this);
        this.closeClueCreator = this.closeClueCreator.bind(this);
        this.changeDirection = this.changeDirection.bind(this);
        this.updateClue = this.updateClue.bind(this);
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
            if (this.state.currentClue !== undefined) {
                clueEditor = (
                    <ClueEditor
                        clue={this.state.currentClue}
                        answer={this.getAnswerForCurrentClue()}
                        updateClue={this.updateClue}
                        changeDirection={this.changeDirection}
                        closeClueCreator={this.closeClueCreator}
                    />
                );
            }
            return (
                <React.Fragment>
                    <h2>{this.state.crossword.name}</h2>
                    <Grid crossword={this.state.crossword} selectedIndices={[]} onSquareClick={this.selectSquare} />
                    <Clues clues={this.state.crossword.clues} selectClue={this.highlightClue} />
                    {clueEditor}
                </React.Fragment>
            );
        }
    }

    createBlankCrossword(name: string, size: number) {
        let squares: SquareModel[] = [];
        for(let i = 0; i < (size * size); i++) {
            squares.push({isBlank: false});
        }
        this.setState({crossword: {
            name: name,
            size: size,
            squares: squares,
            clues: []
        }});
    }

    closeClueCreator(): void {
        this.resetState();
    }

    selectSquare(squareIndex: number, direction: Direction = Direction.Across): void {
        let clue = this.getClueForSquareAndDirection(squareIndex, direction);
        if (!clue) {
            clue = {
                clue: "",
                length: 2,
                startingIndex: squareIndex,
                direction: direction
            };
        }
        this.setState({selectedSquareIndex: squareIndex, currentClue: clue});
    }

    changeDirection(direction: Direction): void {
        this.selectSquare(this.state.selectedSquareIndex, direction);
    }

    updateClue(newClue: Clue, answer: string): void {
        // Include answers
        console.log("Should add the following clue:");
        console.log(newClue); 
        console.log(answer);
        const indexOfClue = this.state.crossword.clues.findIndex((clue) => 
            clue.startingIndex === newClue.startingIndex && clue.direction === newClue.direction);
        if (indexOfClue !== -1) {
            this.state.crossword.clues[indexOfClue] = newClue as NumberedClue;
        } else {
            this.state.crossword.clues.push(newClue as NumberedClue);
        }
        this.setState({crossword: mapCrosswordToNumberedCrossword(this.state.crossword)});
        this.resetState();
    }

    highlightClue(clue: NumberedClue): void {
        const indices: number[] = [];
        for(let i = 0; i < clue.length; i++) {
            if (clue.direction === Direction.Across) {
                indices.push(clue.startingIndex + i);
            } else {
                indices.push(clue.startingIndex + (i * this.state.crossword.size));
            }
        }
        this.setState({selectedIndices: indices});
    }

    getClueForSquareAndDirection(squareIndex: number, direction: Direction): Clue | undefined {
        const clue = this.state.crossword.clues.find(clue => 
            clue.startingIndex === squareIndex && clue.direction === direction
        );
        return !!clue ? clue : undefined;
    }

    getAnswerForCurrentClue(): string {
        // TODO
        return "";
    }

    resetState(): void {
        this.setState({currentClue: undefined, selectedSquareIndex: undefined});
    }
}