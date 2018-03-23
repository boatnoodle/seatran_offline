import axios from 'axios'
import Ip from 'ip'

const ip = Ip.address()
const instance = axios.create({
    baseURL: `http://${ip}:3000/api/`,
})
 export default instance

