import {
    AllowNull, BelongsToMany, Column, DataType, Default, DefaultScope, HasMany, Model,
    Table, PrimaryKey, AutoIncrement
} from "sequelize-typescript";
import * as Sequelize from 'sequelize';
import CrosswordInterface from "../../../shared/models/crossword";
import Square from "./square";
import Clue from "./clue";

interface CrosswordAttributes extends CrosswordInterface {
    id: number;
}

@Table
export default class Crossword extends Model<Crossword> implements CrosswordAttributes {
    @PrimaryKey
    @AutoIncrement
    @Column
    id: number;

    @AllowNull(false)
    @Column
    name: string;

    @AllowNull(false)
    @Column
    size: number;


    @HasMany(() => Square) squares: Square[];

    @HasMany(() => Clue) clues: Clue[];
}