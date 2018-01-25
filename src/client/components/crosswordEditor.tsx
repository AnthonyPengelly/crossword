import * as React from "react";
import {Link} from "react-router-dom";
import Crossword from "../../shared/models/crossword";
import CrosswordBuilder from "./crosswordBuilder";
import crosswordApi from "../api/crosswordApi";

interface CrosswordEditorProps {
    match: {
        params: {
            id: string
        }
    };
}

interface CrosswordEditorState {
    crossword: Crossword;
}

export default class CrosswordEditor extends React.Component<CrosswordEditorProps, CrosswordEditorState> {
    constructor(props: CrosswordEditorProps) {
        super(props);
        this.state = {crossword: undefined};
    }

    componentDidMount() {
        this.getCrossword();
    }

    render(): JSX.Element {
        return (
            <div>
                <Link className="clickable" to="/">Return to list</Link>
                <h1>Crossword Editor</h1>
                {this.getContent()}
            </div>
        );
    }

    getContent(): JSX.Element {
        if (this.state.crossword === undefined) {
            return <div>Loading...</div>;
        } else {
            return (
                <CrosswordBuilder crossword={this.state.crossword} />
            );
        }
    }

    async getCrossword() {
        const crossword = await crosswordApi.getForEditing(this.props.match.params.id);
        if (!!crossword) {
            this.setState({crossword: crossword});
        }
    }
}