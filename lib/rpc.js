"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _btoa = _interopRequireDefault(require("btoa"));

var _nodeFetch = _interopRequireDefault(require("node-fetch"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let id = 0;

var _default = (user, password) => {
  const basicAuth = (0, _btoa.default)(`${user}:${password}`);
  return async (method, ...params) => {
    id += 1;
    return new Promise(async (resolve, reject) => {
      try {
        let rpcData = {
          method: 'POST',
          headers: {
            Authorization: `Basic ${basicAuth}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            jsonrpc: '1.0',
            id,
            method,
            params
          })
        };
        const rawResponse = await (0, _nodeFetch.default)('http://127.0.0.1:15715', rpcData);
        const res = await rawResponse.json();

        if (res.error) {
          reject(new Error(`Server Error: ${res.error}`));
        } else {
          resolve(res.result);
        }
      } catch (ex) {
        reject(ex);
      }
    });
  };
};

exports.default = _default;