import * as React from "react";
import {NumberedCrossword} from "../models/crossword";
import CrosswordList from "../components/crosswordList";
import Crossword from "../components/crossword";
import CrosswordCreator from "../components/crosswordCreator";
import testCrossword from "../testCrossword";
import {mapCrosswordToNumberedCrossword} from "../helpers/crosswordNumberer";
import { NumberedClue } from "../models/clue";
const LucysCrossword = JSON.parse(require("../lucys-crossword.json"));

interface HomeState {
    crosswords: NumberedCrossword[];
    createCrossword: boolean;
    currentCrossword?: NumberedCrossword;
}

export default class Home extends React.Component<{}, HomeState> {
    constructor(props: {}) {
        super(props);
        this.state = {crosswords: [mapCrosswordToNumberedCrossword(testCrossword), LucysCrossword], createCrossword: false};
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
        this.setState({currentCrossword: this.getEmptyCrosswordFromCrossword(crossword)});
    }

    openCrosswordCreator(crossword: NumberedCrossword) {
        this.setState({createCrossword: true, currentCrossword: crossword});
    }

    createCrossword(crossword: NumberedCrossword): void {
        if (this.state.currentCrossword !== undefined) {
            this.state.crosswords.splice(this.state.crosswords.indexOf(this.state.currentCrossword), 1);
        }
        this.state.crosswords.push(crossword);
        this.setState({
            currentCrossword: undefined,
            createCrossword: false,
            crosswords: this.state.crosswords
        });
    }

    getContentFromState(): JSX.Element {
        if (this.state.createCrossword) {
            return <CrosswordCreator
                crossword={this.state.currentCrossword}
                returnToList={this.returnToList}
                createCrossword={this.createCrossword} />
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

    getEmptyCrosswordFromCrossword(crossword: NumberedCrossword): NumberedCrossword {
        const squares = crossword.squares.map(square => {return {
            isBlank: square.isBlank, 
            clueNumber: square.clueNumber
        }});
        return {
            name: crossword.name,
            clues: crossword.clues,
            squares: squares,
            size: crossword.size
        };
    }
}
