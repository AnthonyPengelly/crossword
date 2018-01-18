import * as React from "react";
import {NumberedCrossword} from "../models/crossword";
import CrosswordList from "../components/crosswordList";
import Crossword from "../components/crossword";
import CrosswordCreator from "../components/crosswordCreator";
import testCrossword from "../testCrossword";
import {mapCrosswordToNumberedCrossword} from "../helpers/crosswordNumberer";

interface HomeState {
    crosswords: NumberedCrossword[];
    createCrossword: boolean;
    currentCrossword?: NumberedCrossword;
}

export default class Home extends React.Component<{}, HomeState> {
    constructor(props: {}) {
        super(props);
        this.state = {crosswords: [mapCrosswordToNumberedCrossword(testCrossword)], createCrossword: false};
        this.returnToList = this.returnToList.bind(this);
        this.openCrossword = this.openCrossword.bind(this);
        this.openCrosswordCreator = this.openCrosswordCreator.bind(this);
        this.createCrossword = this.createCrossword.bind(this);
    }
    
    render(): JSX.Element {
        return (
            <div id="content">
                {this.getContentFromState()}
            </div>
        );
    }
    
    returnToList() {
        this.setState({currentCrossword: undefined, createCrossword: false});
    }

    openCrossword(crossword: NumberedCrossword) {
        this.setState({currentCrossword: crossword});
    }

    openCrosswordCreator() {
        this.setState({createCrossword: true, currentCrossword: undefined});
    }

    createCrossword(crossword: NumberedCrossword): void {
        this.state.crosswords.push(crossword);
        this.setState({
            currentCrossword: undefined,
            createCrossword: false
        });
    }

    getContentFromState(): JSX.Element {
        if (this.state.createCrossword) {
            return <CrosswordCreator returnToList={this.returnToList} createCrossword={this.createCrossword} />
        }
        if (this.state.currentCrossword !== undefined) {
            return <Crossword crossword={this.state.currentCrossword} returnToList={this.returnToList} />;
        }
        return (
            <CrosswordList 
                crosswords={this.state.crosswords}
                openCrossword={this.openCrossword}
                openCrosswordCreator={this.openCrosswordCreator} 
            />);
    }
}
