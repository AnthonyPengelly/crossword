import * as React from "react";
import ClueModel from "../../shared/models/clue";
import Direction from "../../shared/models/direction";
import {answerIsValid} from "../../shared/helpers/answerHelper";

interface ClueEditorProps {
    clue?: ClueModel;
    answer: string;
    maxLength: number;
    updateClue: (clue: ClueModel, answer: string) => void;
    deleteClue: (clue: ClueModel) => void;
    changeDirection: (direction: Direction) => void;
    closeClueEditor: () => void;
}

interface ClueEditorState {
    clue: string;
    answer: string;
}

export default class ClueEditor extends React.Component<ClueEditorProps, ClueEditorState> {
    constructor(props: ClueEditorProps) {
        super(props);
        this.changeDirection = this.changeDirection.bind(this);
        this.handleClueChange = this.handleClueChange.bind(this);
        this.handleAnswerChange = this.handleAnswerChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {clue: props.clue.clue, answer: props.answer};
    }

    componentWillReceiveProps(newProps: ClueEditorProps) {
        this.setState({clue: newProps.clue.clue, answer: newProps.answer});
    }

    render(): JSX.Element {
        const deleteButton = this.props.clue && this.props.clue.length !== 0
            ? <button onClick={() => this.props.deleteClue(this.props.clue)}>Delete</button>
            : undefined;
        return (
            <div className="clue-dialog clue-editor">
                <div className="clickable" onClick={this.props.closeClueEditor}>Close</div>
                <h3>Clue Editor</h3>
                <div>Direction: {this.props.clue.direction === 0 ? "Across" : "Down"}</div>
                <button onClick={this.changeDirection}>Change Direction</button>
                <form onSubmit={this.handleSubmit}>
                    <label htmlFor="clue">Clue</label>
                    <input type="text" name="clue" autoFocus={true} value={this.state.clue} onChange={this.handleClueChange} />
                    <label htmlFor="answer">Answer</label>
                    <input type="text" name="answer" value={this.state.answer} onChange={this.handleAnswerChange} maxLength={this.props.maxLength} />            
                    <input type="submit" style={{visibility: "hidden"}} />
                    <button onClick={this.handleSubmit}>Update</button>
                </form>
                {deleteButton}
            </div>
        );
    }

    private handleClueChange(event: React.FormEvent<HTMLInputElement>) {
        this.setState({clue: event.currentTarget.value});
    }
    
    private handleAnswerChange(event: React.FormEvent<HTMLInputElement>) {
        this.setState({answer: event.currentTarget.value});
    }

    private handleSubmit(event: React.FormEvent<HTMLElement>) {
        event.preventDefault();
        const clue = {
            clue: this.state.clue,
            length: this.state.answer.length,
            startingIndex: this.props.clue.startingIndex,
            direction: this.props.clue.direction
        } as ClueModel;
        if (answerIsValid(this.state.answer, clue)) {
            this.props.updateClue(clue, this.state.answer);
        }
    }

    changeDirection() {
        const newDirection = this.props.clue.direction === Direction.Across
            ? Direction.Down
            : Direction.Across;
        this.props.changeDirection(newDirection);
    }
}