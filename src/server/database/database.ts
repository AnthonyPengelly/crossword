import * as Bluebird from 'bluebird';


export default abstract class Database<T> {
    abstract getAll(): Promise<T[]>;
    abstract getById(id: number): Promise<T>;
    abstract createOrUpdate(item: T): void;
    abstract delete(id: number): void;

    protected toPromise<P>(bluebird: Bluebird<P>): Promise<P> {
        return new Promise((resolve, reject) => {
            bluebird.then(resolve).catch(reject);
        });
    }
}