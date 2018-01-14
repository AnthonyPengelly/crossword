import * as React from "react";
import {NumberedSquare} from "../models/square";

interface SquareProps {
    square: NumberedSquare;
    isSelected: boolean;
    className: string;
}

export default class Square extends React.Component<SquareProps, {}> {
    render(): JSX.Element {
        const className = this.props.className 
            + (this.props.square.isBlank ? " square--blank" : "")
            + (this.props.isSelected ? " square--selected" : "");
        return (
            <div className={className}>
                <div className="clue-number">{this.props.square.clueNumber}</div>
                {this.props.square.letter !== undefined ? this.props.square.letter : ""}
            </div>
        );
    }
}