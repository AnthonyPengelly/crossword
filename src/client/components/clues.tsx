import * as React from "react";
import {NumberedClue} from "../../shared/models/clue";
import Direction from "../../shared/models/direction";
import Clue from "../components/clue";

interface CluesProps {
    clues: NumberedClue[];
    answeredCluesIndices: number[];
    selectClue: (clue: NumberedClue) => void;
}

type AnswerableClue = NumberedClue & {answered: boolean};

export default class Clues extends React.Component<CluesProps, {}> {
    constructor(props: CluesProps) {
        super(props);
        this.mapToAnswerableClue = this.mapToAnswerableClue.bind(this);
    }

    render(): JSX.Element {
        const answerableClues = this.props.clues.map(this.mapToAnswerableClue);
        const acrossClues = answerableClues.filter(clue => clue.direction === Direction.Across);
        const downClues = answerableClues.filter(clue => clue.direction === Direction.Down);
        return (
            <div className="clues">
                <h2>Across</h2>
                <ul>{this.mapCluesModelsToClueComponents(acrossClues)}</ul>
                <h2>Down</h2>
                <ul>{this.mapCluesModelsToClueComponents(downClues)}</ul>
            </div>
        );
    }

    mapCluesModelsToClueComponents(clues: AnswerableClue[]): JSX.Element[] {
        return clues.map((clue, index) => (
            <Clue
                key={index}
                selectClue={this.props.selectClue}
                clue={clue}
                answered={clue.answered}
            />
        ));
    }

    mapToAnswerableClue(clue: NumberedClue, index: number): AnswerableClue {
        (clue as AnswerableClue).answered = this.isAnswered(index);
        return clue as AnswerableClue;
    }

    isAnswered(clueIndex: number): boolean {
        return this.props.answeredCluesIndices.indexOf(clueIndex) !== -1;
    }
}