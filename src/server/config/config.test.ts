import Config from "./config";

const testConfig: Config = {
    awsConfig: {
        region: "eu-west-2"
    },
    dynamoDbConfig: {},
    databaseSuffix: "-test"
};

export default testConfig;
