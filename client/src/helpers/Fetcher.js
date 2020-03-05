import TokenManager from './TokenManager'

const get = (controller, data) => {
    return doFetch('GET', controller)
}

const post = (controller, data) => {
    return doFetch('POST', controller, data)
}

const doFetch = async (method, controller, data) => {
    
    
    const token = TokenManager.get()
    const headers = {'Content-Type': 'application/json'}
    if (token) {
        headers['Authorization'] = `Bearer ${token}`
    }

    const params = {
        method,
        headers
    }

    if (method !== 'GET' && data) {
        const jsonData = (data instanceof FormData) ? Object.fromEntries(data) : data
        params.body = JSON.stringify(jsonData)
    }

    const response = await fetch(`${process.env.REACT_APP_SERVER_URI}/${controller}`, params)
    const json = await response.json()

    if (response.status >= 300) {
        if (response.status === 401) {
            TokenManager.reset()
        }
        throw new Error(json.message || response.statusText || response.status)
    } else {
        return json
    }
}

export default { get, post }