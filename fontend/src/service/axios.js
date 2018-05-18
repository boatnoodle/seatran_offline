import axios from 'axios'
import Ip from 'ip'

const ip = Ip.address()
const instance = axios.create({
    baseURL: `http://localhost:3000/api/`,
    // baseURL: `http://192.168.1.4:3000/api/`
    
})
 export default instance

