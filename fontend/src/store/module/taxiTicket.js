import axios from '@/service/axios'

const state = {
    taxiTicket: {},
    lastId: null
}

const getters = {
    getLastTaxiTicket: (state) => state.lastId
}

const mutations = {
    getLastTaxiTicket(state,lastId){
        state.lastId = lastId
    }
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
    async addTaxiTicket({commit},data){
        await axios.post('taxiTicket/addTaxiTicket',data)
        .then(res => {
            if(res){
               alert('เพิ่มข้อมูลเรียบร้อยแล้ว')
            }
        })
        .catch(err => {
            console.log(err)
        })
    },
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