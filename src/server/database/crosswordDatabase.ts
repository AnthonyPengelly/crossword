import {DynamoDB} from "aws-sdk";
import * as uuid from "uuid/v1";
import Database from "./database";
import Crossword from "../../shared/models/crossword";
import initialiseDatabase from "./dynamoSetup";

export default class CrosswordDatabase extends Database<Crossword> {
    private database: DynamoDB.DocumentClient;
    static TABLE_NAME = "Crosswords";

    constructor() {
        super();
        this.database = initialiseDatabase();
    }

    async getAll(): Promise<Crossword[]> {
        const params = {
            TableName: CrosswordDatabase.TABLE_NAME
        };
        const result = await this.database.scan(params).promise();
        return result.Items.map(item => item.Crossword as Crossword);
    }

    async getById(id: string): Promise<Crossword> {
        const params = {
            TableName: CrosswordDatabase.TABLE_NAME,
            Key: {
                HashKey: id
            }
        };
        const result = await this.database.get(params).promise();
        return result.Item.Crossword as Crossword;
    }

    async createOrUpdate(item: Crossword): Promise<Crossword> {
        if (!item.id) {
            item.id = this.generateUniqueId();
        }
        const params = {
            TableName: CrosswordDatabase.TABLE_NAME,
            Item: {
                HashKey: item.id,
                Crossword: item
            }
        };
        await this.database.put(params).promise();
        return item;
    }

    async delete(id: string): Promise<void> {
        var params = {
            TableName : CrosswordDatabase.TABLE_NAME,
            Key: {
                HashKey: id
            }
        };
        await this.database.delete(params).promise();
        console.log(`Successfully deleted crossword with id ${id}`);
        return;
    }

    private generateUniqueId(): string {
        return uuid();
    }
}