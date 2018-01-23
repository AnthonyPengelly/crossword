import * as React from "react";
import Crossword from "../../shared/models/crossword";
import Router from "../components/router";
import {getEmptyCrosswordFromCrossword} from "../../shared/helpers/crosswordHelper";
import crosswordApi from "../api/crosswordApi";

interface HomeState {
    crosswords: Crossword[];
    shouldCreate: boolean;
    currentCrossword?: Crossword;
}

export default class Home extends React.Component<{}, HomeState> {
    constructor(props: {}) {
        super(props);
        this.state = {crosswords: [], shouldCreate: false};
        this.returnToList = this.returnToList.bind(this);
        this.openCrossword = this.openCrossword.bind(this);
        this.openCrosswordCreator = this.openCrosswordCreator.bind(this);
        this.createCrossword = this.createCrossword.bind(this);
    }

    async componentDidMount() {
        const crosswords = await crosswordApi.getAll();
        this.setState({crosswords: crosswords});
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

    openCrossword(crossword: Crossword) {
        this.setState({currentCrossword: getEmptyCrosswordFromCrossword(crossword)});
    }

    openCrosswordCreator(crossword: Crossword) {
        this.setState({shouldCreate: true, currentCrossword: crossword});
    }

    createCrossword(crossword: Crossword): void {
        crosswordApi.createOrUpdate(crossword);
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
