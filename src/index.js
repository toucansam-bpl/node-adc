import creds from '../credentials.json'
import rpc from './rpc'


export default class AdcClient {
  constructor(username, password) {
    this.rpc = rpc(username, password)
  }
  
  async getInfo() {
    return await this.rpc('getinfo')
  }
  
  async getNewAddress() {
    return await this.rpc('getnewaddress')
  }
}

