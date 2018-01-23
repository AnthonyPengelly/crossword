import {
    AllowNull, BelongsTo, Column, DataType, Default, DefaultScope, HasMany, Model,
    Table, ForeignKey
} from "sequelize-typescript";
import * as Sequelize from 'sequelize';
import ClueAttributes from "../../../shared/models/clue";
import Direction from "../../../shared/models/direction";
import Crossword from "./crossword";

@Table
export default class Clue extends Model<Clue> implements ClueAttributes {
    @AllowNull
    @Column
    clue: string;

    @AllowNull(false)
    @Column
    length: number;

    @AllowNull(false)
    @Column
    startingIndex: number;

    @AllowNull(false)
    @Column
    direction: number;

    @AllowNull
    @Column
    clueNumber: number;

    @Column @ForeignKey(() => Crossword) crosswordId: number;
    @BelongsTo(() => Crossword) crossword: Crossword;
}