import Api from "./api";
import Crossword from "../../shared/models/crossword";

class CrosswordApi {
    constructor(private api: Api) {}

    async getAll(): Promise<Crossword[]> {
        const crosswords = await api.get<Crossword[]>("crosswords");
        return !!crosswords ? crosswords  : [];
    }

    async getById(id: string) {
        const crossword = api.get<Crossword>(`crosswords/${id}`);
        return !!crossword ? crossword : undefined;
    }

    async getForEditing(id: string) {
        const crossword = api.get<Crossword>(`crosswords/${id}/edit`);
        return !!crossword ? crossword : undefined;
    }

    async getComplete(id: string) {
        const crossword = api.get<Crossword>(`crosswords/${id}/complete`);
        return !!crossword ? crossword : undefined;
    }

    async createOrUpdate(crossword: Crossword) {
        return api.post<Crossword>("crosswords", crossword);
    }

    async delete(crossword: Crossword) {
        return api.delete(`crosswords/${crossword.id}`);
    }
}

const api = new Api("http://localhost:3000/api/");
export default new CrosswordApi(api);