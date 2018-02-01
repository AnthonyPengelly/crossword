import * as AWS from "aws-sdk";
import {DynamoDB} from "aws-sdk";
import Config from "../config";

export default function initialiseDynamo(): DynamoDB.DocumentClient {
    AWS.config.update(Config.awsConfig);
    return new DynamoDB.DocumentClient(Config.dynamoDbConfig);
}