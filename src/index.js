import rpc from './rpc'

const fee = 0.0001

export default class AdcClient {
  constructor(username, password) {
    this.rpc = rpc(username, password)
  }

  async getBalance(address) {
    return this.rpc('getreceivedbyaddress', address)
  }
  
  async getInfo() {
    return this.rpc('getinfo')
  }
  
  async getNewAddress() {
    return this.rpc('getnewaddress')
  }

  async sendAdc(tx) {
    return new Promise(async (resolve, reject) => {
      try {
        const allInputs = await this.rpc('listunspent')
        const validInputs = allInputs.filter(t => t.address === tx.from)

        const inputData = validInputs.reduce((all, input) => {
          if (all.uncoveredAmount > 0) {
            all.uncoveredAmount = parseFloat((all.uncoveredAmount - input.amount).toFixed(8))
            all.inputsToUse.push({
              txid: input.txid,
              vout: input.vout,
            })
          }
          return all
        }, {
          uncoveredAmount: tx.amount + fee,
          inputsToUse: [],
        })

        console.log(inputData.uncoveredAmount)
        if (inputData.uncoveredAmount > 0) {
          let balance = validInputs.reduce((sum, input) => sum + input.amount, 0)
          let message = `Trying to send ${tx.amount + fee} from Address "${tx.from}" but it only has balance of ${balance}.`
          return reject(new Error(message))
        }

        const change = inputData.uncoveredAmount * -1
        const changeOutput = change === 0 ? {} : {
          [tx.from]: change
        }
        
        const rawTx = await this.rpc('createrawtransaction', inputData.inputsToUse, {
          ... changeOutput,
          [tx.to]: tx.amount,
        })
        const signedTx = await this.rpc('signrawtransaction', rawTx)
        const txId = await this.rpc('sendrawtransaction', signedTx.hex)
        
        const decoded = await this.rpc('decoderawtransaction', signedTx.hex)
        console.log(decoded)

        resolve(txId)
      } catch (ex) {
        reject(ex)
      }
    })
  }
}

