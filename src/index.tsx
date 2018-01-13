import * as React from "react";
import * as ReactDOM from "react-dom";

import Crossword from "./components/crossword";
import CrosswordModel from "./models/crossword";
import Direction from "./models/direction";
import testCrossword from "./testCrossword";

ReactDOM.render(
    <Crossword crossword={testCrossword} />,
    document.getElementById("react-body")
);