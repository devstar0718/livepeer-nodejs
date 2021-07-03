/*!
 * Livepeer Stream
 * Copyright(c) 2021 Livepeer Inc.
 */

const Base = require('../base');
const PATH = '/session';

class Session extends Base {
    constructor(...params) {
        if(!params){
            return Promise.reject(
                new Error('Params are required for creating a session object')
            );
        }
        super(params[0]);
        this.parent = params[0];
        if (params.length >= 2) {
            const data = params[1];
            if (typeof data === 'object') {
                this.id = data.id;
                this.sourceSegmentsDuration = data.sourceSegmentsDuration;
                this.record = data.record;
                this.parentId = data.parentId;
                this.recordingStatus = data.recordingStatus;
                this.recordingUrl = data.recordingUrl;
            }
        }
    }

    async getAll(){
        const response = await this.http.get(PATH);
        console.log('Get all sessions: ' + response.statusText);
        let sessions =  [];
        for(const element of response.data){
            sessions.push(new Session(this.parent, element));
        }
        return sessions;
    }

    async get(id){
        if (!id) {
            return Promise.reject(
                new Error('ID of session is required to get a session')
            );
        }
        const response = await this.http.get(PATH + '/' + id);
        console.log('Get a Session: ' + response.statusText);
        return new Session(this.parent, response.data);
    }
}

module.exports = Session;
