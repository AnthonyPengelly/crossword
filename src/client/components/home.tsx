import * as React from "react";
import Crossword from "../../shared/models/crossword";
import Router from "../components/router";
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
        this.syncCrosswords();
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

    async openCrossword(crossword: Crossword) {
        const crosswordForSolving = await crosswordApi.getById(crossword.id);
        if (!!crosswordForSolving) {
            this.setState({currentCrossword: crosswordForSolving});
        }
    }

    openCrosswordCreator(crossword: Crossword) {
        if (!!crossword) {
            this.openCrosswordCreatorForEditing(crossword);
        } else {
            this.setState({shouldCreate: true, currentCrossword: undefined});
        }
    }

    async openCrosswordCreatorForEditing(crossword: Crossword) {
        const crosswordForEditing = await crosswordApi.getForEditing(crossword.id);
        if (!!crosswordForEditing) {
            this.setState({shouldCreate: true, currentCrossword: crosswordForEditing});
        } else {
            this.setState({shouldCreate: true, currentCrossword: undefined});
        }
    }

    async createCrossword(crossword: Crossword) {
        await crosswordApi.createOrUpdate(crossword)
        this.setState({shouldCreate: false, currentCrossword: undefined});
        this.syncCrosswords();
    }

    async syncCrosswords() {
        const crosswords = await crosswordApi.getAll();
        this.setState({crosswords: crosswords});
    }
}
