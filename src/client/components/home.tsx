import * as React from "react";
import {NumberedCrossword} from "../../shared/models/crossword";
import Router from "../components/router";
import testCrossword from "../testCrossword";
import {mapCrosswordToNumberedCrossword, getEmptyCrosswordFromCrossword} from "../../shared/helpers/crosswordHelper";
const LucysCrossword = JSON.parse(require("../lucys-crossword.json"));

interface HomeState {
    crosswords: NumberedCrossword[];
    shouldCreate: boolean;
    currentCrossword?: NumberedCrossword;
}

export default class Home extends React.Component<{}, HomeState> {
    constructor(props: {}) {
        super(props);
        this.state = {crosswords: [mapCrosswordToNumberedCrossword(testCrossword), LucysCrossword], shouldCreate: false};
        this.returnToList = this.returnToList.bind(this);
        this.openCrossword = this.openCrossword.bind(this);
        this.openCrosswordCreator = this.openCrosswordCreator.bind(this);
        this.createCrossword = this.createCrossword.bind(this);
    }
    
    render(): JSX.Element {
        return (
            <Router
                crosswords={this.state.crosswords}
                shouldCreate={this.state.shouldCreate}
                currentCrossword={this.state.currentCrossword}
                returnToList={this.returnToList}
                openCrossword={this.openCrossword}
                openCrosswordCreator={this.openCrosswordCreator}
                createCrossword={this.createCrossword}
            />
        );
    }
    
    returnToList() {
        this.setState({currentCrossword: undefined, shouldCreate: false});
    }

    openCrossword(crossword: NumberedCrossword) {
        this.setState({currentCrossword: getEmptyCrosswordFromCrossword(crossword)});
    }

    openCrosswordCreator(crossword: NumberedCrossword) {
        this.setState({shouldCreate: true, currentCrossword: crossword});
    }

    createCrossword(crossword: NumberedCrossword): void {
        if (this.state.currentCrossword !== undefined) {
            this.state.crosswords.splice(this.state.crosswords.indexOf(this.state.currentCrossword), 1);
        }
        this.state.crosswords.push(crossword);
        this.setState({
            currentCrossword: undefined,
            shouldCreate: false,
            crosswords: this.state.crosswords
        });
    }
}
