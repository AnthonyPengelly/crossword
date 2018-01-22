import * as express from "express";

const app = express();

app.use(express.static('dist/public'));

app.listen(3000, () => console.log("Listening on port 3000"));