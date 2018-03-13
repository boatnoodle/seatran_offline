import axios from '@/service/axios'

const state = {
    tour: {}
}

const getters = {
    getTour: (state) => {
        return state.tour
    }
}

const mutations = {
    getTour: (state,tour) =>{
        state.tour = tour
    }
}
const actions = {
    async getTour({commit}){
        await axios.get('tour/getTour')
        .then((response) => {
            commit('getTour',response.data)
        })
        .catch(err => {
            console.log(err)
        })
    },
    async updateTour({commit},data){
        await axios.post('tour/updateTour',data)
        .then(res => {
            if(res){
               alert('เพิ่มข้อมูลเรียบร้อยแล้ว')
            }
        })
        .catch(err => {
            console.log(err)
        })
    },
    async updateCompany({commit},data){
        const dataUpdate = {
            nameCompany: data.nameCompany
        }
        await axios.put('tour/updateCompany/'+ data.id,dataUpdate)
        .then(result => {
            alert('แก้ไขข้อมูลเรียบร้อยแล้ว')
        })
        .catch(err => {
            console.log(err)
        })
    },
    async removeCompany({commit},id){
        await axios.delete('tour/removeCompany/'+ id)
        .then(response => {
            if(response.status == 200){
                alert('ลบข้อมูลเรียบร้อยแล้ว')
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