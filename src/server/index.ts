import * as express from "express";
import * as bodyParser from "body-parser";
import Database from "./database/database";
import CrosswordDatabase from "./database/crosswordDatabase";
import Crossword from "../shared/models/crossword";
import CrosswordService from "./services/crosswordService";

const database: Database<Crossword> = new CrosswordDatabase();
const crosswordService = new CrosswordService(database);
const app = express();

app.use(bodyParser.json());

app.use(express.static('dist/public'));

app.get("/api/crosswords", async (req, res) => {
    const crosswords = await crosswordService.getAll();
    res.send(crosswords);
});

app.get("/api/crosswords/:id", async (req, res) => {
    const crossword = await crosswordService.getById(req.params.id);
    res.send(crossword);
});

app.get("/api/crosswords/:id/edit", async (req, res) => {
    const crossword = await crosswordService.getForEditing(req.params.id);
    res.send(crossword);
});

app.get("/api/crosswords/:id/complete", async (req, res) => {
    const crossword = await crosswordService.getComplete(req.params.id);
    res.send(crossword);
});

app.post("/api/crosswords", async (req, res) => {
    const crossword: Crossword = req.body;
    const newCrossword = await crosswordService.createOrUpdate(crossword);
    res.send(newCrossword);
});

app.delete("/api/crosswords/:id", async (req, res) => {
    await crosswordService.delete(req.params.id);
    res.send();
});

app.listen(3000, () => console.log("Listening on port 3000"));
