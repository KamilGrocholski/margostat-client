import axios from 'axios'

let baseURL
if (process.env.NODE_ENV === 'development') {
    baseURL = 'http://localhost:5000/api'
} else if (process.env.NODE_ENV === 'production') {
    // baseURL = process.env.BASE_URL
    // baseURL = 'https://margostat-server.herokuapp.com/api'
    baseURL = `${ process.env.BASE_URL }/api`
} else {
    baseURL = 'http://localhost:5000/api'
}
console.log(process.env.NODE_ENV)

const instance = axios.create({
    baseURL: baseURL
})

export default instance