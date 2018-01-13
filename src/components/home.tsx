import * as React from "react";
import CrosswordModel from "../models/crossword";
import CrosswordList from "../components/crosswordList";
import Crossword from "../components/crossword";
import testCrossword from "../testCrossword";

interface HomeState {
    crosswords: CrosswordModel[];
    currentCrossword?: CrosswordModel;
}

export default class Home extends React.Component<{}, HomeState> {
    constructor(props: {}) {
        super(props);
        this.state = {crosswords: [testCrossword]};
        this.returnToList = this.returnToList.bind(this);
        this.openCrossword = this.openCrossword.bind(this);
    }
    
    render(): JSX.Element {
        const content = this.state.currentCrossword !== undefined
            ? <Crossword crossword={this.state.currentCrossword} returnToList={this.returnToList} />
            : <CrosswordList crosswords={this.state.crosswords} openCrossword={this.openCrossword} />
        return (
            <div id="content">
                {content}
            </div>
        );
    }
    
    returnToList() {
        this.setState({currentCrossword: undefined});
    }

    openCrossword(crossword: CrosswordModel) {
        this.setState({currentCrossword: crossword});
    }
}
