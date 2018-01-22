import Database from "../database/database";
import {NumberedCrossword as Crossword} from "../../shared/models/crossword";
import {getCrosswordForEditing, getEmptyCrosswordFromCrossword} from "../../shared/helpers/crosswordHelper";

export default class CrosswordService {
    constructor(public crosswordDatabase: Database<Crossword>) {}

    getAll() {
        return this.crosswordDatabase.getAll()
            .map(getEmptyCrosswordFromCrossword);
    }

    getByName(name: string) {
        const crossword = this.crosswordDatabase.getById(name);
        return getEmptyCrosswordFromCrossword(crossword);
    }

    getForEditing(name: string) {
        const crossword = this.crosswordDatabase.getById(name);
        return getCrosswordForEditing(crossword);

    }

    getComplete(name: string) {        
        return this.crosswordDatabase.getById(name);
    }

    createOrUpdate(crossword: Crossword) {
        this.crosswordDatabase.createOrUpdate(crossword);
    }

    delete(name: string) {
        this.crosswordDatabase.delete(name);
    }
}