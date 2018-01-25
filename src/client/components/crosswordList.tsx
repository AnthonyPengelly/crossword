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
            <div>
                <Link className="clickable" to="/crossword/create">
                    Create Crossword
                </Link>
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
                <li>
                    <Link className="clickable" to={`/crossword/solve/${crossword.id}`}>
                        {index + 1}. {crossword.name} (size: {crossword.size})
                    </Link>
                    <br />
                    <Link className="clickable" to={`/crossword/edit/${crossword.id}`}>Edit</Link>
                </li>
            </React.Fragment>
        );
    }

    async syncCrosswords(): Promise<void> {
        const crosswords = await crosswordApi.getAll();
        this.setState({crosswords: crosswords});
    }
}