/*!
 * Livepeer Stream
 * Copyright(c) 2021 Livepeer Inc.
 */

const Base = require('../base');

const PATH = '/ingest';

class Ingest extends Base {
    constructor(...params) {
        if(!params){
            return Promise.reject(
                new Error('Params are required for creating a ingest object')
            );
        }
        super(params[0]);
        this.parent = params[0];
        if (params.length >= 2) {
            const data = params[1];
            if (typeof data === 'object') {
                this.base = data.base;
                this.ingest = data.ingest;
                this.playback = data.playback;
            }
        }
    }

    async getAll(){
        const response = await this.http.get(PATH + '/?first=false');
        console.log('Get all ingests: ' + response.statusText);
        let ingests =  [];
        for(const element of response.data){
            ingests.push(new Ingest(this.parent, element));
        }
        return ingests;
    }

    async getClosest(){
        const response = await this.http.get(PATH);
        console.log('Get closest ingest: ' + response.statusText);
        return new Ingest(this.parent, response.data[0]);
    }
}

module.exports = Ingest;
