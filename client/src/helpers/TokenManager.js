const get = () => {
    return localStorage.getItem(process.env.REACT_APP_TOKEN_KEY)
}

const set = (token) => {
    localStorage.setItem(process.env.REACT_APP_TOKEN_KEY, token)
}

const reset = () => {
    localStorage.removeItem(process.env.REACT_APP_TOKEN_KEY)
}

export default { get, set, reset }