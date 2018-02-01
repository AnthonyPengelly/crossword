import Config from "./config";
import DevConfig from "./config.dev";
import LiveConfig from "./config.live";
import TestConfig from "./config.test";

enum Environment {
    test = "test",
    live = "live",
}

const environment = process.env.ENVIRONMENT as Environment | undefined;

let config = {} as Config;

switch (environment) {
    case Environment.live:
        config = LiveConfig as Config;
        break;
    case Environment.test:
        config = TestConfig as Config;
        break;
    default:
        config = DevConfig as Config;
}

export default config;
