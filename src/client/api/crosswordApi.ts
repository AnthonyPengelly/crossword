import Api from "./api";
import Crossword from "../../shared/models/crossword";

class CrosswordApi {
    constructor(private api: Api) {}

    async getAll(): Promise<Crossword[]> {
        const crosswords = await api.get<Crossword[]>("crosswords");
        return !!crosswords ? crosswords  : [];
    }

    async getById(id: string) {
        const crossword = await api.get<Crossword>(`crosswords/${id}`);
        return !!crossword ? crossword : undefined;
    }

    async getForEditing(id: string) {
        const crossword = await api.get<Crossword>(`crosswords/${id}/edit`);
        return !!crossword ? crossword : undefined;
    }

    async getComplete(id: string) {
        const crossword = await api.get<Crossword>(`crosswords/${id}/complete`);
        return !!crossword ? crossword : undefined;
    }

    async createOrUpdate(crossword: Crossword) {
        return api.post<Crossword, Crossword>("crosswords", crossword);
    }

    async markCrossword(crossword: Crossword) {
        const markedCrossword = await api.post<Crossword, Crossword>("crosswords/mark", crossword);
        return !!markedCrossword ? markedCrossword : undefined;
    }

    async delete(crossword: Crossword) {
        return api.delete(`crosswords/${crossword.id}`);
    }
}

// __API_URL__ is injected at compile time by the webpack DefinePlugin
declare var __API_URL__: string;
const api = new Api(__API_URL__);
export default new CrosswordApi(api);