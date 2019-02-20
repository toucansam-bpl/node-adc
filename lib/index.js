"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _rpc = _interopRequireDefault(require("./rpc"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class AdcClient {
  constructor(username, password) {
    this.rpc = (0, _rpc.default)(username, password);
  }

  async getInfo() {
    return this.rpc('getinfo');
  }

  async getNewAddress() {
    return this.rpc('getnewaddress');
  }

}

exports.default = AdcClient;