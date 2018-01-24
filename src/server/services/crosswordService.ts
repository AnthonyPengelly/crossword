import Database from "../database/database";
import Crossword from "../../shared/models/crossword";
import {getCrosswordForEditing, getEmptyCrosswordFromCrossword} from "../../shared/helpers/crosswordHelper";

export default class CrosswordService {
    constructor(public crosswordDatabase: Database<Crossword>) {}

    async getAll() {
        const crosswords = await this.crosswordDatabase.getAll();
        return crosswords.map(getEmptyCrosswordFromCrossword);
    }

    async getById(id: string) {
        const crossword = await this.crosswordDatabase.getById(id);
        return getEmptyCrosswordFromCrossword(crossword);
    }

    async getForEditing(id: string) {
        const crossword = await this.crosswordDatabase.getById(id);
        return getCrosswordForEditing(crossword);

    }

    async getComplete(id: string) {
        return await this.crosswordDatabase.getById(id);
    }

    createOrUpdate(crossword: Crossword) {
        this.crosswordDatabase.createOrUpdate(crossword);
    }

    delete(id: string) {
        this.crosswordDatabase.delete(id);
    }
}