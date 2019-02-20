import btoa from 'btoa'
import fetch from 'node-fetch'

let id = 0


export default async (user, password) => {
  const basicAuth = btoa(`${user}:${password}`)
      
  return (method, ...params) => {
    id += 1
  
    return new Promise(async (resolve, reject) => {
      try {
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
    
        if (res.error) {
          reject(new Error(`Server Error: ${res.error}`))
        } else {
          resolve(res.result)
        }
      } catch (ex) {
        reject(ex)
      }
    })
  }
}
