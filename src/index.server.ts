import * as express from "express";
import * as bodyParser from "body-parser";
import Database from "./database/database";
import MemoryCrosswordDatabase from "./database/memoryCrosswordDatabase";
import Crossword from "./models/crossword";

const database: Database<Crossword> = new MemoryCrosswordDatabase();
const app = express();

app.use(bodyParser.json());

app.use(express.static('dist/public'));

app.get("/api/crosswords", (req, res) => {
    res.send(database.getAll());
});

app.get("/api/crosswords/:id", (req, res) => {
    res.send(database.getById(req.param("id")));
});

app.post("/api/crosswords", (req, res) => {
    const crossword: Crossword = req.body;
    console.log(req);
    res.send(database.createOrUpdate(crossword));
});

app.delete("/api/crosswords/:id", (req, res) => {
    res.send(database.delete(req.param("id")));
});


app.listen(3000, () => console.log("Listening on port 3000"));