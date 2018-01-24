import * as Bluebird from 'bluebird';


export default abstract class Database<T> {
    abstract getAll(): Promise<T[]>;
    abstract getById(id: string): Promise<T>;
    abstract createOrUpdate(item: T): Promise<T>;
    abstract delete(id: string): Promise<void>;
}