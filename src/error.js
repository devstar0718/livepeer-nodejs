class LivepeerError{
    constructor(status) {
        switch (Math.floor(status / 100)) {
            case 2:
                break;
            case 4:
                return Promise.reject(
                    new Error(status + ' - Client Error, problem with the information provided')
                );
            case 5:
                return Promise.reject(
                    new Error(status + ' - Internal Server Error, problem with Livepeer servers')
                );
            default:
                return Promise.reject(
                    new Error(status + ' - Unknown Error')
                );
        }
    }
}
module.exports = LivepeerError;