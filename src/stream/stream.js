/*!
 * Livepeer Stream
 * Copyright(c) 2021 Livepeer Inc.
 */

const Base = require('../base');
const LivepeerError = require('../error')

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
                new Error('Params are required to create a stream')
            );
        }
        const response = await this.http.post(PATH, params);
        console.log('Create a Stream: ' + response.statusText);
        return new Stream(this.parent, response.data);
    }

    async getAll(streamOnly = 0, isActive = false, record = false){
        let filter = ``;
        if(streamOnly === 1){
            filter += '/?streamsonly=1';
            if(isActive){
                if(record){
                    filter += '&filters=[{"id": "isActive", "value": true}, {"id": "record", "value": true}]'
                }
                else{
                    filter += '&filters=[{"id": "isActive", "value": true}]'
                }
            }
        }
        const response = await this.http.get(PATH + filter);
        console.log('Get all Streams: ' + response.statusText);
        let streams =  [];
        for(const element of response.data){
            streams.push(new Stream(this.parent, element));
        }
        return streams;
    }

    async get(id){
        if (!id) {
            return Promise.reject(
                new Error('ID of stream is required to get the stream')
            );
        }
        const response = await this.http.get(PATH + '/' + id);
        console.log('Get a Stream: ' + response.statusText);
        return new Stream(this.parent, response.data);
    }

    async record(isOn){
        if(!this.id){
            return Promise.reject(
                new Error('Instance does not exist')
            );
        }
        const response = await this.http.patch(PATH + '/' + this.id + '/record', {
            "record": isOn
        });
        console.log('Change Record: ' + response.statusText);
    }
}

module.exports = Stream;
