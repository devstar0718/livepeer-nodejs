/*!
 * Livepeer Stream
 * Copyright(c) 2021 Mux Inc.
 */

const Base = require('../base');

const PATH = '/stream';

class Stream extends Base {
    constructor(...params) {
        if(!params){
            return Promise.reject(
                new Error('Params are required for creating a stream')
            );
        }
        super(params[0]);
        this.parent = params[0];
        if (params.length >= 2) {
            const data = params[1];
            if (typeof data === 'object') {
                this.name = data.name;
                this.profiles = data.profiles;
                this.id = data.id;
                this.createdAt = data.createdAt;
                this.streamKey = data.streamKey;
                this.playbackId = data.playbackId;
            }
        }
    }

    async create(params) {
        if (!params) {
            return Promise.reject(
                new Error('Params are required for creating a stream')
            );
        }
        const response = await this.http.post(PATH, params);
        console.log('Create a Stream: ' + response.statusText);
        switch (Math.floor(response.status / 100)) {
            case 2:
                return new Stream(this.parent, response.data);
            case 4:
                return Promise.reject(
                    new Error('Client Error, problem with the information provided')
                );
            case 5:
                return Promise.reject(
                    new Error('Internal Server Error, problem with Livepeer servers')
                );
            default:
                return Promise.reject(
                    new Error('Unknown Error')
                );
        }
    }
}

module.exports = Stream;
