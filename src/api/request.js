import axios from 'axios'

const request = axios.create({
  baseURL: 'https://backend-test1.gxjnmall.com',
  timeout: 20000
})

export default request
