import axios from '@/service/axios'

const state = {
    taxiTicket: {},
    taxiTicketLasted: {},
    lastId: null
}

const getters = {
    getLastTaxiTicket: (state) => state.lastId,
    getTaxiTicketLasted: (state) => state.taxiTicketLasted
}

const mutations = {
    getLastTaxiTicket(state,lastId){
        state.lastId = lastId
    },
    getTaxiTicketLasted: (state,taxiTicketLasted) => state.taxiTicketLasted = taxiTicketLasted
}
const actions = {
    async getLastTaxiTicket({commit}){
        await axios.get('taxiTicket/getLastTaxiTicket')
        .then((response) => {
            commit('getLastTaxiTicket',response.data)
        })
        .catch(err => {
            console.log(err)
        })
    },
    async getTaxiTicketLasted({commit}){
        await axios.get('taxiTicket/getTaxiTicketLasted')
        .then((response) => {
            commit('getTaxiTicketLasted',response.data)
        })
        .catch(err => {
            console.log(err)
        })
    },
    async addTaxiTicket({commit},data){
        await axios.post('taxiTicket/addTaxiTicket',data)
        .then(res => {
            if(res){
            //    alert('เพิ่มข้อมูลเรียบร้อยแล้ว')
            console.log(res)
            }
        })
        .catch(err => {
            console.log(err)
        })
    },
    async addTaxiTicketRealTime({commit},data){
        await axios.post('taxiTicket/addTaxiTicketRealTime',data)
        .then(res => {
            if(res){
                console.log(res)
            }
        })
        .catch(err => {
            console.log(err)
        })
    }
}

export default {
    state,
    getters,
    mutations,
    actions
}