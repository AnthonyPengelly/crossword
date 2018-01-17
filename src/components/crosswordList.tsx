import * as React from "react";
import Crossword from "../models/crossword";
import testCrossword from "../testCrossword";

interface CrosswordListProps {
    crosswords: Crossword[];
    openCrossword: (crossword: Crossword) => void;
    openCrosswordCreator: () => void;
}

export default class CrosswordList extends React.Component<CrosswordListProps, {}> {
    constructor(props: CrosswordListProps) {
        super(props);
    }
    
    render(): JSX.Element {
        const crosswordList = this.props.crosswords.map((crossword, index) => (
            <li className="clickable"
                key={index}
                onClick={() => this.props.openCrossword(crossword)}
            >
                {index + 1}. {crossword.name} (size: {crossword.size})
            </li>
        ));
        return (
            <div>
                <div className="clickable" onClick={this.props.openCrosswordCreator}>
                    Create Crossword
                </div>
                <h1>Crosswords</h1>
                <ul>
                    {crosswordList}
                </ul>
            </div>
        );
    }
}