import axios from "axios";

export default class Api {
    constructor(private baseUrl: string) {}

    get<T>(path: string): Promise<void | T> {
        return axios.get<T>(this.baseUrl + path)
            .then(response => 
                response.data
            )
            .catch((err) => {
                console.log("Failed to fetch " + path);
                console.log(err);
            });
    }

    post<T>(path: string, body: T) {
        axios.post(this.baseUrl + path, body)
            .catch((err) => {
                console.log("Failed to post " + path);
                console.log(err);
            });
    }

    delete(path: string) {
        axios.delete(this.baseUrl + path)
            .catch((err) => {
                console.log("Failed to delete " + path);
                console.log(err);
            });
    }
}