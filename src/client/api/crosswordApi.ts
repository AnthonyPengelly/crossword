import Api from "./api";
import Crossword from "../../shared/models/crossword";

class CrosswordApi {
    constructor(private api: Api) {}

    async getAll(): Promise<Crossword[]> {
        const crosswords = await api.get<Crossword[]>("crosswords");
        return !!crosswords ? crosswords  : [];
    }

    async getByName(name: string) {
        const crossword = api.get<Crossword>(`crosswords/${name}`);
        return !!crossword ? crossword : undefined;
    }

    async getForEditing(name: string) {
        const crossword = api.get<Crossword>(`crosswords/${name}/edit`);
        return !!crossword ? crossword : undefined;
    }

    async getComplete(name: string) {
        const crossword = api.get<Crossword>(`crosswords/${name}/complete`);
        return !!crossword ? crossword : undefined;
    }

    async createOrUpdate(crossword: Crossword) {
        return api.post<Crossword>("crosswords", crossword);
    }

    async delete(crossword: Crossword) {
        return api.delete(`crosswords/${crossword.name}`);
    }
}

const api = new Api("localhost:3000/api/");
export default new CrosswordApi(api);