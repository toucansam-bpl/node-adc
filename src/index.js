import rpc from './rpc'


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

        resolve(validInputs)
      } catch (ex) {
        reject(ex)
      }
    })
  }
}

