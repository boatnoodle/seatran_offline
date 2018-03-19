import axios from '@/service/axios'

const state = {
    billHead: '',
    percent: ''
}

const getters = {
    getBillHead: (state) => state.billHead,
    getPercent: (state) => state.percent,

}

const mutations = {
    getBillHead: (state,billHead) => state.billHead = billHead,
    getPercent: (state,percent) => state.percent = percent,

}
const actions = {
    async getBillHead({commit}){
        await axios.get('system/getBillHead')
        .then((response) => {
            commit('getBillHead',response.data)
        })
        .catch(err => {
            console.log(err)
        })
    },
    async updateBillHead({commit},data){
        await axios.post('system/updateBillHead',data)
        .then(res => {
            if(res){
               alert('แก้ไขหัวบิลเรียบร้อยแล้ว')
            }
        })
        .catch(err => {
            console.log(err)
        })
    },
    async getPercent({commit}){
        await axios.get('system/getPercent')
        .then((response) => {
            commit('getPercent',response.data)
        })
        .catch(err => {
            console.log(err)
        })
    },
    async updatePercent({commit},data){
        await axios.post('system/updatePercent',data)
        .then(res => {
            if(res){
               alert('แก้ไขเปอร์เซ็นรายงานเรียบร้อยแล้ว')
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