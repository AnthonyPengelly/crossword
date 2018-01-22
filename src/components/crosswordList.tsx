import * as React from "react";
import Crossword from "../models/crossword";
import testCrossword from "../testCrossword";

interface CrosswordListProps {
    crosswords: Crossword[];
    openCrossword: (crossword: Crossword) => void;
    openCrosswordCreator: (crossword: Crossword) => void;
}

export default class CrosswordList extends React.Component<CrosswordListProps, {}> {
    constructor(props: CrosswordListProps) {
        super(props);
        this.mapCrosswordToListItem = this.mapCrosswordToListItem.bind(this);
    }
    
    render(): JSX.Element {
        const crosswordList = this.props.crosswords.map(this.mapCrosswordToListItem);
        return (
            <div>
                <div className="clickable" onClick={() => this.props.openCrosswordCreator(undefined)}>
                    Create Crossword
                </div>
                <h1>Crosswords</h1>
                <ul>
                    {crosswordList}
                </ul>
            </div>
        );
    }

    mapCrosswordToListItem(crossword: Crossword, index: number): JSX.Element {
        return (
            <React.Fragment key={index}>
                <li className="clickable"
                    onClick={() => this.props.openCrossword(crossword)}
                >
                    {index + 1}. {crossword.name} (size: {crossword.size})
                </li>
                <button onClick={() => this.props.openCrosswordCreator(crossword)}>Edit</button>
            </React.Fragment>
        );
    }
}