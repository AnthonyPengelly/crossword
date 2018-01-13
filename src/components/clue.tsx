import * as React from "react";
import ClueModel from "../models/clue";

interface ClueProps {
    clue: ClueModel;
    selectClue: (clue: ClueModel) => void;
    index: number;
}

export default class Clue extends React.Component<ClueProps, {}> {
    constructor(props: ClueProps) {
        super(props);
        this.selectClue = this.selectClue.bind(this);
    }

    render(): JSX.Element {
        return (
            <li className="clue clickable" onClick={this.selectClue}>
                {this.props.index + 1}. {this.props.clue.clue} ({this.props.clue.length})
            </li>
        );
    }

    selectClue(): void {
        this.props.selectClue(this.props.clue);
    }
}