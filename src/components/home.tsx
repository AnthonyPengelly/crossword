import * as React from "react";
import {NumberedCrossword} from "../models/crossword";
import CrosswordList from "../components/crosswordList";
import Crossword from "../components/crossword";
import testCrossword from "../testCrossword";
import {mapCrosswordToNumberedCrossword} from "../helpers/crosswordNumberer";

interface HomeState {
    crosswords: NumberedCrossword[];
    currentCrossword?: NumberedCrossword;
}

export default class Home extends React.Component<{}, HomeState> {
    constructor(props: {}) {
        super(props);
        this.state = {crosswords: [mapCrosswordToNumberedCrossword(testCrossword)]};
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

    openCrossword(crossword: NumberedCrossword) {
        this.setState({currentCrossword: crossword});
    }
}
