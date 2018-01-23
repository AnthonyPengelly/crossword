import * as React from "react";
import CrosswordModel from "../../shared/models/crossword";
import CrosswordList from "../components/crosswordList";
import Crossword from "../components/crossword";
import CrosswordCreator from "../components/crosswordCreator";

interface RouterProps {
    crosswords: CrosswordModel[];
    shouldCreate: boolean;
    currentCrossword?: CrosswordModel;
    returnToList: () => void;
    openCrossword: (crossword: CrosswordModel) => void;
    openCrosswordCreator: (crossword: CrosswordModel) => void;
    createCrossword: (crossword: CrosswordModel) => void;
}

export default class Router extends React.Component<RouterProps, {}> {
    render(): JSX.Element {
        return (
            <div id="content">
                {this.renderContentFromProps()}
            </div>
        );
    }

    renderContentFromProps(): JSX.Element {
        if (this.props.shouldCreate) {
            return this.renderCrosswordCreator();
        }
        if (this.props.currentCrossword !== undefined) {
            return this.renderCrossword();
        }
        return this.renderCrosswordList();
    }

    renderCrosswordCreator(): JSX.Element {
        return <CrosswordCreator
            crossword={this.props.currentCrossword}
            returnToList={this.props.returnToList}
            createCrossword={this.props.createCrossword} />
    }

    renderCrossword(): JSX.Element {
        return <Crossword crossword={this.props.currentCrossword} returnToList={this.props.returnToList} />;
    }

    renderCrosswordList(): JSX.Element {
        return <CrosswordList 
            crosswords={this.props.crosswords}
            openCrossword={this.props.openCrossword}
            openCrosswordCreator={this.props.openCrosswordCreator} 
        />;
    }
}
