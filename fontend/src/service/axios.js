import axios from 'axios'
import ip from 'ip'
const Ip = ip.address()

const instance = axios.create({
    baseURL: `http://${Ip}:3000/api/`,
})

export default instance