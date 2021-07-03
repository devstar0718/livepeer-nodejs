/*!
 * Livepeer Stream
 * Copyright(c) 2021 Mux Inc.
 */

const Base = require('../base');

const PATH = '/stream';

class Stream extends Base {
    create(params){
        if(!params){
            return Promise.reject(
                new Error('Params are required for creating a stream')
            );
        }
        return this.http.post(PATH, params);
    }
}

module.exports = Stream;
