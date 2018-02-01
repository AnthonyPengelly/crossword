import Config from "./config";

const devConfig: Config = {
    awsConfig: {
        region: "eu-west-1",
        accessKeyId: "akid",
        secretAccessKey: "secret"
    },
    dynamoDbConfig: {
        endpoint: "http://localhost:8000"
    },
    databaseSuffix: ""
};

export default devConfig;
