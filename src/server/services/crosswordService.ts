import Database from "../database/database";
import Crossword from "../../shared/models/crossword";
import {getCrosswordForEditing, getEmptyCrosswordFromCrossword} from "../../shared/helpers/crosswordHelper";
import ValidationService from "./validationService";
import MarkingService from "./markingService";

export default class CrosswordService {
    validationService: ValidationService;
    markingService: MarkingService

    constructor(public crosswordDatabase: Database<Crossword>) {
        this.validationService = new ValidationService();
        this.markingService = new MarkingService();
    }

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

    getComplete(id: string) {
        return this.crosswordDatabase.getById(id);
    }

    createOrUpdate(crossword: Crossword) {
        this.validationService.validateCrossword(crossword);
        return this.crosswordDatabase.createOrUpdate(crossword);
    }

    delete(id: string) {
        return this.crosswordDatabase.delete(id);
    }

    async getMarkedCrossword(crossword: Crossword) {
        this.validationService.validateCrossword(crossword);
        const correctCrossword = await this.crosswordDatabase.getById(crossword.id);
        return this.markingService.getMarkedCrossword(crossword, correctCrossword);
    }
}