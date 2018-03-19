<template>
  <div>
      <h3><i class="fa fa-user"></i> ตั้งค่าผู้ใช้</h3><hr>
      <button class="btn btn-info btn-sm" @click="formSetUser"><i class="fa fa-plus"></i> เพิ่มผู้ใช้</button>
      <div class="row" style="margin-top: 20px;">
          <div class="col-sm-12">
            <table class="table table-hover table-bordered table-sm text-center">
                    <thead class="bg-info text-white">
                        <tr>
                            <th>รหัสผู้ใช้</th>
                            <th>ชื่อผู้ใช้</th>
                            <th>สิทธิ์ผู้ใช้</th>
                            <th>จัดการ</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(data,index) in getUser" :key="index">
                            <td>{{ data._id }}</td>
                            <td>{{ data.username || '-' }}</td>
                            <td>{{ getStatus(data.status) || '-' }}</td>
                            <td width="15%">
                                <button @click="updateUser(data)" class="btn btn-info btn-sm"><i class="fa fa-pencil"></i> แก้ไข</button>
                                <button @click="removeUser(data._id)" class="btn btn-default btn-sm"><i class="fa fa-trash-o"></i> ลบ</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
          </div>
      </div>
    <form-set-user ref="formSetUser" :user="user" @finish="actionGetUser()"></form-set-user>
  </div>
</template>
<script>
import formSetUser from '@/components/user/formSetUser'

export default {
    data(){
        return {
            datas: '',
            user: {}
        }
    },
    components:{
        formSetUser
    }
    ,
    methods: {
        formSetUser(){
            this.$refs.formSetUser.toggleModal()
        },
        removeUser(id){
            if(confirm('ยืนยันการลบ ?')){
                this.$store.dispatch('removeUser',id)
                .then(()=> {
                    this.actionGetUser()
                })
                .catch((err) => {
                    console.log(err)
                })
            }
        },
        updateUser(data){
            this.user = data
            this.formSetUser()
        },
        actionGetUser(){
            this.$store.dispatch('getUser')
        },
        getStatus(val){
            if(val == 1){
                return 'พนักงานขาย'
            }else if(val ==2){
                return 'พนักงานบัญชี'
            }else {
                return 'ผู้ดูแลระบบ'
            }
        }
    },
    computed: {
        getUser(){
            return this.$store.getters.getUser
              
        }
    },
    created(){
        this.actionGetUser()
    }
}
</script>
