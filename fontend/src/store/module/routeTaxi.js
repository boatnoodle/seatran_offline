import axios from '@/service/axios'

const state = {
    routeTaxi: {}
}

const getters = {
    getAllRouteTaxi: (state) => {
        return state.routeTaxi
    }
}

const mutations = {
    getAllRouteTaxi: (state,routeTaxi) =>{
        state.routeTaxi = routeTaxi
    }
}
const actions = {
    async getAllRouteTaxi({commit}){
        await axios.get('routeTaxi/getAllRoute')
        .then((response) => {
            commit('getAllRouteTaxi',response.data)
        })
        .catch(err => {
            console.log(err)
        })
    },
    async addRoute({commit},data){
        await axios.post('routeTaxi/addRoute',data)
        .then(res => {
            if(res){
               alert('เพิ่มข้อมูลเรียบร้อยแล้ว')
            }
        })
        .catch(err => {
            console.log(err)
        })
    },
    async updateRoute({commit},data){
        const dataUpdate = {
            nameRoute: data.nameRoute,
            priceTaxi: data.priceTaxi,
            priceVan: data.priceVan
        }
        await axios.put('routeTaxi/updateRoute/'+ data.id,dataUpdate)
        .then(result => {
            alert('แก้ไขข้อมูลเรียบร้อยแล้ว')
        })
        .catch(err => {
            console.log(err)
        })
    },
    async removeRoute({commit},id){
        await axios.delete('routeTaxi/removeRoute/'+ id)
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