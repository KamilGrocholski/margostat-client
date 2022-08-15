import axios from 'axios'

let baseURL = '';
if (process.env.NODE_ENV === 'development') {
  baseURL = 'http://localhost:5000/api'
} else if (process.env.NODE_ENV === 'production') {
  baseURL = process.env.BASE_URL as string;
} else {
  baseURL = 'http://localhost:5000/api'
}

const instance = axios.create({
    baseURL: baseURL
})

export default instance