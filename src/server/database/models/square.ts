import {
    AllowNull, BelongsTo, Column, DataType, Default, DefaultScope, HasMany, Model,
    Table, ForeignKey
} from "sequelize-typescript";
import * as Sequelize from 'sequelize';
import SquareAttributes from "../../../shared/models/square";
import Crossword from "./crossword";

@Table
export default class Square extends Model<Square> implements SquareAttributes {
    @AllowNull
    @Column
    letter: string;

    @AllowNull(false)
    @Column
    isBlank: boolean;

    @AllowNull
    @Column
    clueNumber: number;

    @Column @ForeignKey(() => Crossword) crosswordId: number;
    @BelongsTo(() => Crossword) crossword: Crossword;
}