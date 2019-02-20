"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _btoa = _interopRequireDefault(require("btoa"));

var _nodeFetch = _interopRequireDefault(require("node-fetch"));

var _credentials = _interopRequireDefault(require("../credentials.json"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const basicAuth = (0, _btoa.default)(`${_credentials.default.user}:${_credentials.default.password}`);
let id = 0;

var _default = async (method, ...params) => {
  id += 1;
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
  console.log(res);
};

exports.default = _default;