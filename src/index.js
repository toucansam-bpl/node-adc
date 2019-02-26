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
}

