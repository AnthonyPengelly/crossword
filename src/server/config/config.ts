import { ConfigurationOptions } from "aws-sdk/lib/config";

export default interface Config {
    databaseSuffix: string;
    awsConfig: ConfigurationOptions;
    dynamoDbConfig: DynamoDBConfig;
}

export interface DynamoDBConfig {
    endpoint?: string;
    apiVersion?: string;
}