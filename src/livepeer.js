/*!
 * Mux
 * Copyright(c) 2018 Mux Inc.
 */

const Base = require('./base');
const Stream = require('./stream/stream');
const Session = require('./session/session');
const Ingest = require('./ingest/ingest');

/**
 * Livepeer Class - Provides access to the Livepper API
 *
 * @extends Base
 * @type {Stream}
 * @property {Stream} Livepeer.Stream provides access to the Livepeer Stream API
 * @type {Session}
 * @property {Session} Livepeer.Data provides access to the Livepeer Data API
 * @example
 *
 */
class Livepeer extends Base {
    /**
     * Livepeer Constructor
     *
     * @param {string} apiKey - Livepeer API Access Token
     * @param {object} options - Optional configuration object
     * @param {string='https://livepeer.com/api'} options.baseUrl - Change the base URL for API requests.
     * @constructor
     */
    constructor(apiKey, config) {
        super(apiKey, config);

        /** @type {Stream} */
        this.Stream = new Stream(this);

        /** @type {Session} */
        this.Session = new Session(this);

        /** @type {Ingest} */
        this.Ingest = new Ingest(this);
    }
}

Livepeer.default = Livepeer;

module.exports = Mux;
