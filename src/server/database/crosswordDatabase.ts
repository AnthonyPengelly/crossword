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
                    console.log(err);
                } else {
                    console.log((data.Items[0].Crossword as Crossword));
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
        return new Promise(() => {
            this.database.get(params, (err, data) => {
                if(err) {
                    console.log(err);
                } else {
                    console.log(data);
                }
            });
        });
    }

    createOrUpdate(item: Crossword): void {
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
        this.database.put(params, (err, data) => {
            if(err) {
                console.log(err);
            } else {
                console.log(data);
            }
        });
    }

    delete(id: string): void {
        var params = {
            TableName : CrosswordDatabase.TABLE_NAME,
            Key: {
              HashKey: id,
              NumberRangeKey: 1
            }
          };
          this.database.delete(params, function(err, data) {
            if(err) {
                console.log(err);
            } else {
                console.log(data);
            }
          });
    }

    private generateUniqueId(): string {
        const id = uuid();
        console.log("generated id: " + id);
        return id;
    }
}