import * as express from "express";
import * as bodyParser from "body-parser";
import Database from "./database/database";
import CrosswordDatabase from "./database/crosswordDatabase";
import Crossword from "../shared/models/crossword";
import CrosswordService from "./services/crosswordService";
import ValidationError from "./errors/validationError";

const database: Database<Crossword> = new CrosswordDatabase();
const crosswordService = new CrosswordService(database);
const app = express();

app.use(bodyParser.json());

app.use(express.static('dist/public'));

app.get("/api/crosswords", (req, res) => {
    respondSafely(res, async () => {
        const crosswords = await crosswordService.getAll();
        res.send(crosswords);
    });
});

app.get("/api/crosswords/:id", (req, res) => {
    respondSafely(res, async () => {
        const crossword = await crosswordService.getById(req.params.id);
        res.send(crossword);
    });
});

app.get("/api/crosswords/:id/edit", (req, res) => {
    respondSafely(res, async () => {
        const crossword = await crosswordService.getForEditing(req.params.id);
        res.send(crossword);
    });
});

app.get("/api/crosswords/:id/complete", (req, res) => {
    respondSafely(res, async () => {
        const crossword = await crosswordService.getComplete(req.params.id);
        res.send(crossword);
    });
});

app.post("/api/crosswords", (req, res) => {
    respondSafely(res, async () => {
        const crossword: Crossword = req.body;
        const newCrossword = await crosswordService.createOrUpdate(crossword);
        res.send(newCrossword);
    });
});

app.post("/api/crosswords/mark", (req, res) => {
    respondSafely(res, async () => {
        const crossword: Crossword = req.body;
        const markedCrossword = await crosswordService.getMarkedCrossword(crossword);
        res.send(markedCrossword);
    });
});

app.delete("/api/crosswords/:id", (req, res) => {
    respondSafely(res, async () => {
        await crosswordService.delete(req.params.id);
        res.send();
    });
});

const respondSafely = async (res: express.Response, respondToRequest: () => Promise<void>) => {
    try {
        await respondToRequest();
    } catch(error) {
        console.log(error);
        if (error instanceof ValidationError) {
            res.sendStatus(400);
        } else {
            res.sendStatus(500);
        }
    }
}

app.listen(3000, () => console.log("Listening on port 3000"));
