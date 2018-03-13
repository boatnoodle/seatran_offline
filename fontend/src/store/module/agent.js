import axios from '@/service/axios'

const state = {
    agent: {}
}

const getters = {
    getAgent: (state) => {
        return state.agent
    }
}

const mutations = {
    getAgent: (state,agent) =>{
        state.agent = agent
    }
}
const actions = {
    async getAgent({commit}){
        await axios.get('tour/getAgent')
        .then((response) => {
            commit('getAgent',response.data)
        })
        .catch(err => {
            console.log(err)
        })
    },
    async addAgent({commit},data){
        console.log(data,'acttion')
        await axios.post('tour/addAgent',data)
        .then(res => {
            if(res){
               alert('เพิ่มข้อมูลเรียบร้อยแล้ว')
            }
        })
        .catch(err => {
            console.log(err)
        })
    },
    async updateAgent({commit},data){
        const dataUpdate = {
            nameAgent: data.nameAgent
        }
        await axios.put('tour/updateAgent/'+ data.id,dataUpdate)
        .then(result => {
            alert('แก้ไขข้อมูลเรียบร้อยแล้ว')
        })
        .catch(err => {
            console.log(err)
        })
    },
    async removeAgent({commit},id){
        await axios.delete('tour/removeAgent/'+ id)
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