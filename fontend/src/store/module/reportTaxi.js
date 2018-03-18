import axios from '@/service/axios'

const state = {
    taxiTicket: {},
    taxiTicketSummery: {}
}

const getters = {
    getTaxiTicketByDate: (state) => state.taxiTicket,
    getTaxiTicketSummery: (state) => state.taxiTicketSummery
    
}

const mutations = {
    getTaxiTicketByDate(state,data){
        state.taxiTicket = data
    },
    getTaxiTicketSummery: (state,data) => state.taxiTicketSummery = data
}
const actions = {
    async getTaxiTicketByDate({commit},date){
        await axios.post('taxiTicket/getTaxiTicketByDate',date)
        .then((response) => {
            commit('getTaxiTicketByDate',response.data)
        })
        .catch(err => {
            console.log(err)
        })
    },
    async getTaxiTicketSummery({commit},date){
        await axios.post('taxiTicket/getTaxiTicketSummery',date)
        .then((response) => {
            commit('getTaxiTicketSummery',response.data)
        })
        .catch(err => {
            console.log(err)
        })
    },
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