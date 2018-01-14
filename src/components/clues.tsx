import * as React from "react";
import {NumberedClue} from "../models/clue";
import Direction from "../models/direction";
import Clue from "../components/clue";

interface CluesProps {
    clues: NumberedClue[];
    selectClue: (clue: NumberedClue) => void;
}

export default class Clues extends React.Component<CluesProps, {}> {
    render(): JSX.Element {
        const acrossClues = this.props.clues.filter(clue => clue.direction === Direction.Across);
        const downClues = this.props.clues.filter(clue => clue.direction === Direction.Down);
        return (
            <div className="clues">
                <h2>Across</h2>
                <ul>{this.mapCluesModelsToClueComponents(acrossClues)}</ul>
                <h2>Down</h2>
                <ul>{this.mapCluesModelsToClueComponents(downClues)}</ul>
            </div>
        );
    }

    mapCluesModelsToClueComponents(clues: NumberedClue[]): JSX.Element[] {
        return clues.map((clue, index) => (
            <Clue key={index} selectClue={this.props.selectClue} clue={clue} />
        ));
    }
}