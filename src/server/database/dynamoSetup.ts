import * as AWS from "aws-sdk";
import {DynamoDB} from "aws-sdk";

export default function initialiseDynamo(): DynamoDB.DocumentClient {
    AWS.config.update({
        region: "eu-west-1",
        accessKeyId: "akid",
        secretAccessKey: "secret"
    });
    return new DynamoDB.DocumentClient({
        endpoint: "http://localhost:8000"
    });
}