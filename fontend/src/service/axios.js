import axios from 'axios'
import ip from 'ip'
const Ip = ip.address()

const instance = axios.create({
    baseURL: `http://192.168.1.25:3000/api/`,
})

export default instance