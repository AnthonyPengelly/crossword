import * as React from "react";
import {default as ClueModel, NumberedClue} from "../models/clue";

interface ClueProps {
    clue: NumberedClue;
    answered: boolean;
    selectClue: (clue: ClueModel) => void;
}

export default class Clue extends React.Component<ClueProps, {}> {
    constructor(props: ClueProps) {
        super(props);
        this.selectClue = this.selectClue.bind(this);
    }

    render(): JSX.Element {
        const className = "clue clickable" + (this.props.answered ? " clue--answered" : "");
        return (
            <li className={className} onClick={this.selectClue}>
                {this.props.clue.clueNumber}. {this.props.clue.clue} ({this.props.clue.length})
            </li>
        );
    }

    selectClue(): void {
        this.props.selectClue(this.props.clue);
    }
}