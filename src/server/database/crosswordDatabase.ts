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

    getAll(): Promise<Crossword[]> {
        const params = {
            TableName: CrosswordDatabase.TABLE_NAME
        };
        return new Promise((resolve, reject) => {
            this.database.scan(params, (err, data) => {
                if(err) {
                    reject(err);
                } else {
                    const crosswords = data.Items.map(item => (item.Crossword as Crossword));
                    resolve(crosswords);
                }
            });
        });
    }

    getById(id: string): Promise<Crossword> {
        const params = {
            TableName: CrosswordDatabase.TABLE_NAME,
            Key: {
                HashKey: id
            }
        };
        return new Promise((resolve, reject) => {
            this.database.get(params, (err, data) => {
                if(err) {
                    reject(err);
                } else {
                    if (data && data.Item && data.Item.HashKey === id) {
                        resolve(data.Item.Crossword as Crossword);
                    }
                    reject("Unable to find Crossword with id " + id);
                }
            });
        });
    }

    createOrUpdate(item: Crossword): Promise<Crossword> {
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
        return new Promise((resolve, reject) => {
            this.database.put(params, (err, data) => {
                if(err) {
                    reject(err);
                } else {
                    resolve(item);
                }
            });
        });
    }

    delete(id: string): Promise<void> {
        var params = {
            TableName : CrosswordDatabase.TABLE_NAME,
            Key: {
                HashKey: id
            }
        };
        return new Promise((resolve, reject) => {
            this.database.delete(params, function(err, data) {
                if(err) {
                    reject(err);
                } else {
                    console.log(`Crossword with id ${id} deleted successfully`);
                    resolve();
                }
            });
        });
    }

    private generateUniqueId(): string {
        return uuid();
    }
}