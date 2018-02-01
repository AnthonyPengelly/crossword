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

const api = new Api("https://e7vek1i6vh.execute-api.eu-west-2.amazonaws.com/test/");
export default new CrosswordApi(api);