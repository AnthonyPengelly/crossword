import {DynamoDB}from "aws-sdk";
import * as AWS from "aws-sdk";

export default function createDynamoTable() {
    AWS.config.update({
        region: "eu-west-1",
        accessKeyId: "akid",
        secretAccessKey: "secret"
    });
    const db = new DynamoDB({
        endpoint: "http://localhost:8000"
    });
     
    const tableParams: DynamoDB.CreateTableInput = {
        TableName: "Crosswords",
        KeySchema: [
            { AttributeName: "HashKey", KeyType: "HASH"}
        ],
        AttributeDefinitions: [
            {AttributeName: "HashKey", AttributeType: "S"}
        ],
        ProvisionedThroughput: {
            ReadCapacityUnits: 10,
            WriteCapacityUnits: 10
        }
    };

    db.createTable(tableParams, (err, data) => {
        if (err) {
            console.log(err);
        } else {
            console.log("Success!");
        }
    })
}

createDynamoTable();