import * as React from "react";
import ClueModel from "../models/clue";
import Direction from "../models/direction";
import Clue from "../components/clue";

interface CluesProps {
    clues: ClueModel[];
    selectClue: (clue: ClueModel) => void;
}

export default class Clues extends React.Component<CluesProps, {}> {
    render(): JSX.Element {
        const acrossClues = this.props.clues.filter(clue => clue.direction === Direction.Across);
        const downClues = this.props.clues.filter(clue => clue.direction === Direction.Down);
        return (
            <div>
                <h2>Across</h2>
                <ul>{this.mapCluesModelsToClueComponents(acrossClues)}</ul>
                <h2>Down</h2>
                <ul>{this.mapCluesModelsToClueComponents(downClues)}</ul>
            </div>
        );
    }

    mapCluesModelsToClueComponents(clues: ClueModel[]): JSX.Element[] {
        return clues.map((clue, index) => (
            <Clue key={index} index={index} selectClue={this.props.selectClue} clue={clue} />
        ));
    }
}