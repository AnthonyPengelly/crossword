import * as React from "react";
import {HashRouter, Switch, Route} from "react-router-dom";
import CrosswordList from "./crosswordList";
import Crossword from "./crossword";
import CrosswordEditor from "./crosswordEditor";
import CrosswordCreator from "./crosswordCreator";

export default class Router extends React.Component<{}, {}> {
    render() {
        return (
            <div id="content">
                <HashRouter>
                    <Switch>
                        <Route exact path="/" component={CrosswordList} />
                        <Route path="/crossword/edit/:id" component={CrosswordEditor} />
                        <Route path="/crossword/create" component={CrosswordCreator} />
                        <Route path="/crossword/solve/:id" component={Crossword} />
                    </Switch>
                </HashRouter>
            </div>
        );
    }
}