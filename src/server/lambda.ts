import {Context, Callback, APIGatewayEvent} from "aws-lambda";

interface APIGatewayResponse {
    statusCode: number;
    headers: {};
    body: string;
}

export const handler = (event: APIGatewayEvent, context: Context, callback: Callback) => {
    const response: APIGatewayResponse = {
        statusCode: 200,
        headers: {},
        body: JSON.stringify({message: "Working crossword Lambda"})
    };
    callback(null, response);
}