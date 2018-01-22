export default abstract class Database<T> {
    abstract getAll(): T[];
    abstract getById(id: string): T;
    abstract createOrUpdate(item: T): void;
    abstract delete(id: string): void;
}