import * as React from "react";
import SquareModel from "../../shared/models/square";

interface SquareProps {
    square: SquareModel;
    isSelected: boolean;
    className: string;
    onSquareClick: () => void;
}

export default class Square extends React.Component<SquareProps, {}> {
    render(): JSX.Element {
        const className = this.props.className 
            + (this.props.square.isBlank ? " square--blank" : "")
            + (this.props.isSelected ? " square--selected" : "");
        return (
            <div className={className} onClick={() => this.props.onSquareClick()}>
                <div className="clue-number">{this.props.square.clueNumber}</div>
                {this.props.square.letter !== undefined ? this.props.square.letter : ""}
            </div>
        );
    }
}