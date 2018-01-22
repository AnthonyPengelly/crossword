import Database from "./database";
import {NumberedCrossword as Crossword} from "../models/crossword";

export default class MemoryCrosswordDatabase extends Database<Crossword> {
    crosswords: Crossword[] = [];

    getAll(): Crossword[] {
        return this.crosswords;
    }

    getById(name: string): Crossword {
        return this.crosswords.find(crossword => crossword.name === name);
    }

    create(item: Crossword): void {
        this.crosswords.push(item);
    }

    update(item: Crossword, index: number): void {
        this.crosswords[index] = item;
    }

    createOrUpdate(item: Crossword): void {
        const index = this.crosswords.indexOf(this.getById(item.name));
        if (index !== -1) {
            this.update(item, index);
        } else {
            this.create(item);
        }
    }

    delete(name: string): void {
        const index = this.crosswords.indexOf(this.getById(name));
        this.crosswords.splice(index, 1);
    }
}