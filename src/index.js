import btoa from 'btoa'
import fetch from 'node-fetch'

import creds from '../credentials.json'
const basicAuth = btoa(`${creds.user}:${creds.password}`)

let id = 0

export default async (method, ...params) => {
  id += 1

  let rpcData = {
    method: 'POST',
    headers: {
      Authorization: `Basic ${basicAuth}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      jsonrpc: '1.0',
      id,
      method,
      params,
    }),
  }


  const rawResponse = await fetch('http://127.0.0.1:15715', rpcData)
  const res = await rawResponse.json()

  console.log(res)
}
