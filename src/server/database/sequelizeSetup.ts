import {Sequelize} from "sequelize-typescript";
import Crossword from "./models/crossword";
import Square from "./models/square";
import Clue from "./models/clue";

export default function initialiseSequelize() {
    const sequelize = new Sequelize({
        host: 'localhost',
        dialect: 'mysql',
        pool: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000
        },
        database: 'crossword',
        username: "crossword",
        password: "database_password",
    });

    sequelize.addModels([Square, Clue, Crossword]);
    
    sequelize.authenticate()
        .then(() => {
            console.log('Connection has been established successfully.');
        })
        .catch((err: any) => {
            console.error('Unable to connect to the database:', err);
        });
    return sequelize.sync();
}
