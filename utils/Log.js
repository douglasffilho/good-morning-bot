const debug = require('debug');
const log = debug('app');

class Log {
    constructor(namespace, infoLog, errorLog) {
        this._namespace = namespace;
        this._infoLog = infoLog;
        this._errorLog = errorLog;
    }

    info(message, ...args) {
        this._infoLog(
            `%o ::: FROM=${this._namespace}, MESSAGE=${message}`,
            new Date().toString(),
            ...args
        );
    }

    error(message, ...args) {
        this._errorLog(
            `%o ::: FROM=${this._namespace}, MESSAGE=${message}`,
            new Date().toString(),
            ...args
        );
    }
}

const init = (source) => {
    const errorLog = log.extend('error');
    const infoLog = log.extend('info');

    return new Log(source, infoLog, errorLog);
};

module.exports = init;
