import Clue from "../models/clue";

export function answerIsValid(answer: string, clue: Clue): boolean {
    const regex = new RegExp("[a-zA-Z]");
    for (let i = 0; i < answer.length; i++) {
        if (!regex.test(answer[i])) {
            return false;
        }
    }
    return answer.length <= clue.length;
}