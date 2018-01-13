import * as React from "react";
import Crossword from "../models/crossword";
import testCrossword from "../testCrossword";

interface CrosswordListState {
    crosswords: Crossword[];
}

export default class CrosswordList extends React.Component<{}, CrosswordListState> {
    constructor(props: {}) {
        super(props);
        this.state = {crosswords: [testCrossword]};
    }
    
    render(): JSX.Element {
        const crosswordList = this.state.crosswords.map((crossword, index) => (
            <li key={index}>{index + 1}. {crossword.name} (size: {crossword.size})</li>
        ));
        return (
            <div id="content">
                <h1>Crosswords</h1>
                <ul>
                    {crosswordList}
                </ul>
            </div>
        );
    }
}