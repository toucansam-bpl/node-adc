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

  async getBalance(address) {
    return this.rpc('getreceivedbyaddress', address);
  }

  async getInfo() {
    return this.rpc('getinfo');
  }

  async getNewAddress() {
    return this.rpc('getnewaddress');
  }

  async sendAdc(tx) {
    return new Promise(async (resolve, reject) => {
      try {
        const allInputs = await this.rpc('listunspent');
        console.log(Array.isArray(allInputs), allInputs);
        const validInputs = allInputs.filter(t => t.address === t.from);
        resolve(validInputs);
      } catch (ex) {
        reject(ex);
      }
    });
  }

}

exports.default = AdcClient;