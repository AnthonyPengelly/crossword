import {Context, Callback, APIGatewayEvent} from "aws-lambda";
import CrosswordService from "./services/crosswordService";
import Database from "./database/database";
import CrosswordDatabase from "./database/crosswordDatabase";
import Crossword from "../shared/models/crossword";
import ValidationError from "./errors/validationError";

const database: Database<Crossword> = new CrosswordDatabase();
const crosswordService = new CrosswordService(database);

interface APIGatewayResponse {
    statusCode: number;
    headers: {};
    body: string;
}

export const handler = async (event: APIGatewayEvent, context: Context, callback: Callback) => {
    switch (event.httpMethod) {
        case "GET":
            if (event.path === "/crosswords") {
                getAllCrosswords(callback);
            } else if (event.path.indexOf("edit") !== -1) {
                getCrosswordForEditing(event.path.split("/")[2], callback);
            } else if (event.path.indexOf("complete") !== -1) {
                getCompleteCrossword(event.path.split("/")[2], callback);
            } else {
                getCrossword(event.path.split("/")[2], callback);
            }
            break;
        case "POST":
            if (event.path === "/crosswords/mark") {
                markCrossword(JSON.parse(event.body) as Crossword, callback);
            } else {
                createOrUpdateCrossword(JSON.parse(event.body) as Crossword, callback);
            }
            break;
        case "DELETE":
            deleteCrossword(event.path.split("/")[2], callback);
            break;
        default:
            throw "Not implemented";
    }
    const crosswords = await crosswordService.getAll();
}

const getAllCrosswords = async (callback: Callback) => {
    respondSafely(callback, async () => {
        const crosswords = await crosswordService.getAll();
        sendGoodResponse(crosswords, callback);
    });
}

const getCrossword = async (id: string, callback: Callback) => {
    respondSafely(callback, async () => {
        const crossword = await crosswordService.getById(id);
        sendGoodResponse(crossword, callback);
    });
}

const getCrosswordForEditing = async (id: string, callback: Callback) => {
    respondSafely(callback, async () => {
        const crossword = await crosswordService.getForEditing(id);
        sendGoodResponse(crossword, callback);
    });
}

const getCompleteCrossword = async (id: string, callback: Callback) => {
    respondSafely(callback, async () => {
        const crossword = await crosswordService.getComplete(id);
        sendGoodResponse(crossword, callback);
    });
}

const createOrUpdateCrossword = async (crossword: Crossword, callback: Callback) => {
    respondSafely(callback, async () => {
        const newCrossword = await crosswordService.createOrUpdate(crossword);
        sendGoodResponse(newCrossword, callback);
    });
}

const markCrossword = async (crossword: Crossword, callback: Callback) => {
    respondSafely(callback, async () => {
        const markedCrossword = await crosswordService.getMarkedCrossword(crossword);
        sendGoodResponse(markedCrossword, callback);
    });
}

const deleteCrossword = async (id: string, callback: Callback) => {
    respondSafely(callback, async () => {
        await crosswordService.delete(id);
        sendGoodResponse({message: "Successfully deleted"}, callback);
    });
}

const respondSafely = async (callback: Callback, respondToRequest: () => Promise<void>) => {
    try {
        await respondToRequest();
    } catch(error) {
        console.log(error);
        if (error instanceof ValidationError) {
            callback(null,
                {statusCode: 400, headers: {'Access-Control-Allow-Origin': '*'}, body: "Bad Request"}
            );
        } else {
            callback(null,
                {statusCode: 500, headers: {'Access-Control-Allow-Origin': '*'}, body: "Server Error"}
            );
        }
    }
}

const sendGoodResponse = (body: {}, callback: Callback) => {
    const response: APIGatewayResponse = {
        statusCode: 200,
        headers: {'Access-Control-Allow-Origin': '*'},
        body: JSON.stringify(body)
    };
    callback(null, response);
}