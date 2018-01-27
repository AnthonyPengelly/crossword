import * as React from "react";
import {Link} from "react-router-dom";
import Crossword from "../../shared/models/crossword";
import SquareModel from "../../shared/models/square";
import Clue from "../../shared/models/clue";
import Direction from "../../shared/models/direction";
import Grid from "./grid";
import Clues from "./clues";
import ClueEditor from "./clueEditor";
import CrosswordBuilder from "./crosswordBuilder";
import CrosswordDetailsInput from "./crosswordDetailsInput";
import {mapCrosswordToNumberedCrossword, createBlankCrossword} from "../../shared/helpers/crosswordHelper";
import { getAnswerForClue } from "../../shared/helpers/answerHelper";
import {getSquaresForClue, getMaxLengthForClue, getMaxSquaresForClue,
    getIndexOfClue, createBlankClue, getClueForSquareAndDirection} from "../../shared/helpers/clueHelper";
import { removeClueNumbersIfNeeded } from "../../shared/helpers/squareHelper";

interface CrosswordCreatorState {
    crossword: Crossword;
}

export default class CrosswordCreator extends React.Component<{}, CrosswordCreatorState> {
    constructor(props: {}) {
        super(props);
        this.state = {crossword: undefined};
        this.createBlankCrossword = this.createBlankCrossword.bind(this);
    }
    
    render(): JSX.Element {
        return (
            <React.Fragment>
                <Link className="button" to="/">Return to list</Link>
                <h1>Crossword Creator</h1>
                {this.getContent()}
            </React.Fragment>
        );
    }

    getContent(): JSX.Element {
        if (this.state.crossword === undefined) {
            return <CrosswordDetailsInput createCrossword={this.createBlankCrossword} />;
        } else {
            return (
                <CrosswordBuilder crossword={this.state.crossword} />
            );
        }
    }

    createBlankCrossword(name: string, size: number) {
        this.setState({crossword: createBlankCrossword(name, size)});
    }
}