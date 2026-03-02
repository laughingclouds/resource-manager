// isDev returns true if development environment, false otherwise
// import { loadEnvFile } from 'process';

export function isDev() {
    // TODO: make it so the env is loaded on its own
    // loadEnvFile(".development.env");
    // https://stackoverflow.com/questions/25112510/how-to-set-environment-variables-from-within-package-json#comment58812038_27090755

    return process.env.NODE_ENV == "development";
}