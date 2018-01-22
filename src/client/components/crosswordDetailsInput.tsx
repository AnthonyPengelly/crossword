import * as React from "react";

interface CrosswordDetailsInputProps {
    createCrossword: (name: string, size: number) => void;
}

interface CrosswordDetailsInputState {
    name: string;
    size: number;
}

export default class CrosswordDetailsInput extends React.Component<CrosswordDetailsInputProps, CrosswordDetailsInputState> {
    constructor(props: CrosswordDetailsInputProps) {
        super(props);
        this.state = {name: "Crossword", size: 8};
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleSizeChange = this.handleSizeChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    render(): JSX.Element {
        return (
            <form onSubmit={this.handleSubmit}>
                <label htmlFor="name">Name</label>
                <input type="text" name="name" autoFocus={true} value={this.state.name} onChange={this.handleNameChange} />
                <label htmlFor="size">Size</label>
                <select name="size" value={this.state.size} onChange={this.handleSizeChange}>
                    <option value="5">5</option>
                    <option value="8">8</option>
                    <option value="10">10</option>
                    <option value="12">12</option>
                    <option value="16">16</option>
                    <option value="20">20</option>
                </select>
                <input type="submit" style={{visibility: "hidden"}} />
                <button onClick={this.handleSubmit}>Create</button>
            </form>
        );
    }

    private handleNameChange(event: React.FormEvent<HTMLInputElement>) {
        this.setState({name: event.currentTarget.value});
    }
    
    private handleSizeChange(event: React.ChangeEvent<HTMLSelectElement>) {
        this.setState({size: parseInt(event.currentTarget.value)});
    }

    private handleSubmit(event: React.FormEvent<HTMLElement>) {
        event.preventDefault();
        this.props.createCrossword(this.state.name, this.state.size);
    }
}