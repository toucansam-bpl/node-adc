"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _rpc = _interopRequireDefault(require("./rpc"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const fee = 0.0001;

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
        const validInputs = allInputs.filter(t => t.address === tx.from);
        const inputData = validInputs.reduce((all, input) => {
          if (all.uncoveredAmount > 0) {
            all.uncoveredAmount = parseFloat((all.uncoveredAmount - input.amount).toFixed(8));
            all.inputsToUse.push({
              txid: input.txid,
              vout: input.vout
            });
          }

          console.log(all.uncoveredAmount);
          return all;
        }, {
          uncoveredAmount: tx.amount + fee,
          inputsToUse: []
        });
        console.log(inputData.uncoveredAmount);

        if (inputData.amount <= 0) {
          resolve(inputData);
        } else {
          let balance = validInputs.reduce((sum, input) => sum + input.amount, 0);
          reject(new Error(`Trying to send ${tx.amount + fee} from Address "${tx.from}" but it only has balance of ${balance}.`));
        }
      } catch (ex) {
        reject(ex);
      }
    });
  }

}

exports.default = AdcClient;