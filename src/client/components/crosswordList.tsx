import * as React from "react";
import {Link} from "react-router-dom";
import Crossword from "../../shared/models/crossword";
import crosswordApi from "../api/crosswordApi";

interface CrosswordListState {
    crosswords: Crossword[];
}

export default class CrosswordList extends React.Component<{}, CrosswordListState> {
    constructor(props: {}) {
        super(props);
        this.state = {crosswords: []};
        this.mapCrosswordToListItem = this.mapCrosswordToListItem.bind(this);
    }

    componentDidMount() {
        this.syncCrosswords();
    }
    
    render(): JSX.Element {
        const crosswordList = this.state.crosswords.map(this.mapCrosswordToListItem);
        return (
            <React.Fragment>
                <Link className="button" to="/crossword/create">
                    Create Crossword
                </Link>
                <h1>Crosswords</h1>
                <div className="crossword-list">
                    {crosswordList}
                </div>
            </React.Fragment>
        );
    }

    mapCrosswordToListItem(crossword: Crossword, index: number): JSX.Element {
        return (
            <React.Fragment key={index}>
                <div className="crossword-list__crossword">
                    <div className="crossword-list__crossword-title">
                        {index + 1}. {crossword.name} (size: {crossword.size})
                    </div>
                    <Link className="button" to={`/crossword/solve/${crossword.id}`}>Solve</Link>
                    <Link className="button" to={`/crossword/edit/${crossword.id}`}>Edit</Link>
                    <div className="button" onClick={() => this.deleteCrossword(crossword)}>Delete</div>
                </div>
            </React.Fragment>
        );
    }

    async deleteCrossword(crossword: Crossword): Promise<void> {
        await crosswordApi.delete(crossword);
        this.syncCrosswords();
    }

    async syncCrosswords(): Promise<void> {
        const crosswords = await crosswordApi.getAll();
        this.setState({crosswords: crosswords});
    }
}