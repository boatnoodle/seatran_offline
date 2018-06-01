import axios from '@/service/axios'

const state = {
    tourTicket: {},
    tourTicketLasted: {},
    lastId: null
}

const getters = {
    getLastTourTicket: (state) => state.lastId,
    getTourTicketLasted: (state) => state.tourTicketLasted
}

const mutations = {
    getLastTourTicket(state,lastId){
        state.lastId = lastId
    },
    getTourTicketLasted: (state, tourTicketLasted) => state.tourTicketLasted = tourTicketLasted
}
const actions = {
    async getLastTourTicket({commit}){
        await axios.get('tourTicket/getLastTourTicket')
        .then((response) => {
            commit('getLastTourTicket',response.data)
        })
        .catch(err => {
            console.log(err)
        })
    },
    async getTourTicketLasted({commit}){
        await axios.get('tourTicket/getTourTicketLasted')
        .then((response) => {
            commit('getTourTicketLasted',response.data)
        })
        .catch(err => {
            console.log(err)
        })
    },
    async addTourTicket({commit},data){
        await axios.post('tourTicket/addTourTicket',data)
        .then(res => {
            if(res){
                console.log(res)
            //    alert('เพิ่มข้อมูลเรียบร้อยแล้ว')
            }
        })
        .catch(err => {
            console.log(err)
        })
    },
    async cancelTourTicket({commit},data){
        await axios.put('tourTicket/cancelTourTicket/' + data._id , data)
        .then(res =>{
            if(res){
                console.log(res)
            }
        })
        .catch(err =>{
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