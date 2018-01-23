import * as express from "express";
import * as bodyParser from "body-parser";
import Database from "./database/database";
import MemoryCrosswordDatabase from "./database/memoryCrosswordDatabase";
import Crossword from "../shared/models/crossword";
import CrosswordService from "./services/crosswordService";
import initialiseSequelize from "./database/sequelizeSetup";

import DatabaseCrossword from "./database/models/crossword";
import DatabaseSquare from "./database/models/square";
import DatabaseClue from "./database/models/clue";
const lucy = JSON.parse(require("../client/lucys-crossword.json"));
initialiseSequelize()
    .then(() => {
        DatabaseCrossword.create(lucy, {include: [DatabaseSquare, DatabaseClue]})
            .then(() => console.log("it worked!"));
    });

const database: Database<Crossword> = new MemoryCrosswordDatabase();
const crosswordService = new CrosswordService(database);
const app = express();

app.use(bodyParser.json());

app.use(express.static('dist/public'));

app.get("/api/crosswords", (req, res) => {
    res.send(crosswordService.getAll());
});

app.get("/api/crosswords/:id", (req, res) => {
    res.send(crosswordService.getByName(req.params.id));
});

app.get("/api/crosswords/:id/edit", (req, res) => {
    res.send(crosswordService.getForEditing(req.params.id));
});

app.get("/api/crosswords/:id/complete", (req, res) => {
    res.send(crosswordService.getComplete(req.params.id));
});

app.post("/api/crosswords", (req, res) => {
    const crossword: Crossword = req.body;
    res.send(crosswordService.createOrUpdate(crossword));
});

app.delete("/api/crosswords/:id", (req, res) => {
    res.send(crosswordService.delete(req.params.id));
});

app.listen(3000, () => console.log("Listening on port 3000"));
