import axios from '@/service/axios'

const state = {
    user: {},
    isLogin: ''
}

const getters = {
    getUser: (state) => {
        return state.user
    },
    checkLoginUser: (state) => state.isLogin
}

const mutations = {
    getUser: (state,user) =>{
        state.user = user
    },
    checkLoginUser: (state,user) => state.isLogin = user,
    logout: (state) => state.isLogin = ''
}
const actions = {
    async checkLoginUser({commit},data){
        await axios.post('user/checkLoginUser',data)
        .then(response => {
            if(response.data != null){
               commit('checkLoginUser',response.data)
            }else{
                // this.$refs.formLogin.reset[0]
                commit('checkLoginUser',response.data)
                alert('ชื่อผู้ใช้ หรือ รหัสผ่านไม่ถูกต้อง')
            }
        })
        .catch(err => {
            console.log(err)
        })
    },
    logout({commit}){
        commit('logout')
    },
    async getUser({commit}){
        await axios.get('user/getUser')
        .then((response) => {
            commit('getUser',response.data)
        })
        .catch(err => {
            console.log(err)
        })
    },
    async addUser({commit},data){
        await axios.post('user/addUser',data)
        .then(res => {
            if(res){
               alert('เพิ่มข้อมูลเรียบร้อยแล้ว')
            }
        })
        .catch(err => {
            console.log(err)
        })
    },
    async updateUser({commit},data){
        const dataUpdate = {
            username: data.username,
            password: data.password,
            status: data.status
        }
        await axios.put('user/updateUser/'+ data.id,dataUpdate)
        .then(result => {
            alert('แก้ไขข้อมูลเรียบร้อยแล้ว')
        })
        .catch(err => {
            console.log(err)
        })
    },
    async removeUser({commit},id){
        await axios.delete('user/removeUser/'+ id)
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