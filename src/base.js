/* eslint no-underscore-dangle: ["error", { "allow": ["_config", "_apiKey"] }] */

const axios = require('axios');
const EventEmitter = require('events');
const pkg = require('../package.json');

/**
 * Livepeer Base Class - Simple base class to be extended by all child modules.
 *
 * @ignore
 * @property {string} apiKey - The key for the access token.
 * @property {object} config - The configuration for the Base object.
 *
 */
class Base extends EventEmitter {
    constructor(...params) {
        super();

        if (params[0] instanceof Base) {
            return Object.assign(this, params[0]);
        }

        if (typeof params[0] === 'object') {
            this.config = params[0]; // eslint-disable-line prefer-destructuring
            this.apiKey = undefined;
        } else {
            this.apiKey = params[0]; // eslint-disable-line prefer-destructuring
            this.config = params[1]; // eslint-disable-line prefer-destructuring
        }

        this.http = axios.create({
            baseURL: this.config.baseUrl,
            headers: {
                'User-Agent': `Livepeer Node | ${pkg.version}`,
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.apiKey}`
            }
        });
    }

    set config(options = {}) {
        this._config = {
            baseUrl: 'https://livepeer.com/api',
            ...options,
        };
    }

    get config() {
        return this._config;
    }

    set apiKey(token) {
        this._apiKey = token;

        if (typeof this._apiKey === 'undefined') {
            throw new Error('API Key must be provided.');
        }
    }

    get apiKey() {
        return this._apiKey;
    }

}

module.exports = Base;
