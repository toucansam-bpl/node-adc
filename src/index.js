import fetch from 'node-fetch'

import credentials from '../credentials.json'

// curl --user audiocoinrpc --data-binary '{"jsonrpc":"1.0","id":"curltext","method":"getnewaddress","params":[]}'
// -H 'content-type:text/plain;' http://127.0.0.1:15715
let id = 0

export default () => {
  id += 1

  let rpcData = {
    method: 'POST',
    credentials,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      jsonrpc: '1.0',
      id,
      method: 'getinfo',
      params: [],
    }),
  }


  const rawResponse = await fetch('http://127.0.0.1:15715', rpcData)
  const res = await rawResponse.json()

  console.log(res)
}
