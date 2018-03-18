import axios from '@/service/axios'

const state = {
    tourTicket: {},
    tourTicketSummery: {}
}

const getters = {
    getTourTicketByDate: (state) => state.tourTicket,
    getTourTicketSummery: (state) => state.tourTicketSummery
    
}

const mutations = {
    getTourTicketByDate(state,data){
        state.tourTicket = data
    },
    getTourTicketSummery: (state,data) => state.tourTicketSummery = data
}
const actions = {
    async getTourTicketByDate({commit},date){
        await axios.post('tourTicket/getTourTicketByDate',date)
        .then((response) => {
            commit('getTourTicketByDate',response.data)
        })
        .catch(err => {
            console.log(err)
        })
    },
    async getTourTicketSummery({commit},date){
        await axios.post('tourTicket/getTourTicketSummery',date)
        .then((response) => {
            commit('getTourTicketSummery',response.data)
        })
        .catch(err => {
            console.log(err)
        })
    },
    // async getTaxiTicketSummery({commit},date){
    //     await axios.post('taxiTicket/getTaxiTicketSummery',date)
    //     .then((response) => {
    //         commit('getTaxiTicketSummery',response.data)
    //     })
    //     .catch(err => {
    //         console.log(err)
    //     })
    // },
    // async addTaxiTicket({commit},data){
    //     await axios.post('taxiTicket/addTaxiTicket',data)
    //     .then(res => {
    //         if(res){
    //            alert('เพิ่มข้อมูลเรียบร้อยแล้ว')
    //         }
    //     })
    //     .catch(err => {
    //         console.log(err)
    //     })
    // },
    // async updateRoute({commit},data){
    //     const dataUpdate = {
    //         nameRoute: data.nameRoute,
    //         priceRoute: data.priceRoute
    //     }
    //     await axios.put('routeTaxi/updateRoute/'+ data.id,dataUpdate)
    //     .then(result => {
    //         alert('แก้ไขข้อมูลเรียบร้อยแล้ว')
    //     })
    //     .catch(err => {
    //         console.log(err)
    //     })
    // },
    // async removeRoute({commit},id){
    //     await axios.delete('routeTaxi/removeRoute/'+ id)
    //     .then(response => {
    //         if(response.status == 200){
    //             alert('ลบข้อมูลเรียบร้อยแล้ว')
    //         }
    //     })
    //     .catch(err => {
    //         console.log(err)
    //     })
    // }
}

export default {
    state,
    getters,
    mutations,
    actions
}