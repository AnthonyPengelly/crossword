import * as React from "react";
import {default as ClueModel, NumberedClue} from "../models/clue";
import Direction from "../models/direction";

interface ClueSolverProps {
    clue: ClueModel;
    answer: string;
    updateAnswer: (clue: ClueModel, answer: string) => void;
    closeClueSolver: () => void;
}

interface ClueSolverState {
    answer: string;
}

export default class ClueSolver extends React.Component<ClueSolverProps, ClueSolverState> {
    constructor(props: ClueSolverProps) {
        super(props);
        this.handleAnswerChange = this.handleAnswerChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {answer: props.answer};
    }

    componentWillReceiveProps(newProps: ClueSolverProps) {
        this.setState({answer: newProps.answer});
    }

    render(): JSX.Element {
        return (
            <div className="clue-dialog clue-editor">
                <div className="clickable" onClick={this.props.closeClueSolver}>Close</div>
                <div>{this.props.clue.clue} ({this.props.clue.length})</div>
                <form onSubmit={this.handleSubmit}>
                    <label htmlFor="answer">Answer</label>
                    <input type="text" name="answer" autoFocus={true} value={this.state.answer} onChange={this.handleAnswerChange} />            
                    <input type="submit" style={{visibility: "hidden"}} />
                    <button onClick={this.handleSubmit}>Update</button>
                </form>
            </div>
        );
    }
    
    private handleAnswerChange(event: React.FormEvent<HTMLInputElement>) {
        this.setState({answer: event.currentTarget.value});
    }

    private handleSubmit(event: React.FormEvent<HTMLElement>) {
        event.preventDefault();
        this.props.updateAnswer(this.props.clue, this.state.answer);
    }
}