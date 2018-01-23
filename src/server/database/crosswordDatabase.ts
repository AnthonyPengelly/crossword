import Database from "./database";
import Crossword from "../../shared/models/crossword";
import DatabaseCrossword from "./models/crossword";
import DatabaseClue from "./models/clue";
import DatabaseSquare from "./models/square";
import initialiseSequelize from "./sequelizeSetup";

export default class CrosswordDatabase extends Database<Crossword> {
    constructor() {
        super();
        initialiseSequelize();
    }

    getAll(): Promise<Crossword[]> {
        return this.toPromise<Crossword[]>(
            DatabaseCrossword.findAll({include: [DatabaseClue, DatabaseSquare]})
        );
    }

    getById(id: number): Promise<Crossword> {
        return this.toPromise<Crossword>(
            DatabaseCrossword.findById(id, {include: [DatabaseClue, DatabaseSquare]})
        );
    }

    createOrUpdate(item: Crossword): void {
        console.log(item);
    }

    delete(id: number): void {
        DatabaseCrossword.destroy({
            where: {
                id: id
            }
        });
    }
}