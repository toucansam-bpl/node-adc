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
        const transactions = this.rpc('listunspent').filter(t => t.address === t.from)

        resolve(transactions)
      } catch (ex) {
        reject(ex)
      }
    })
  }
}

