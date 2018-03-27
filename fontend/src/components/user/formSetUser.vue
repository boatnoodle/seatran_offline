<template>
  <div>
      <div ref="modal" class="modal" tabindex="-1" role="dialog">
        <div class="modal-dialog modal-lg" role="document">
            <div class="modal-content">
            <div class="modal-header text-white bg-info">
                <h5 class="modal-title">เพิ่มชื่อผู้ใช้</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <form v-on:submit.prevent="submit">
                    <div class="form-group">
                        <label>ชื่อผู้ใช้</label>
                        <input type="text" v-model="data.username" class="form-control" placeholder="กรุณาระบุจุดส่ง" required>
                    </div>
                    <div class="form-group">
                        <label>รหัสผ่าน</label>
                        <input type="password" v-model="data.password" class="form-control" placeholder="กรุณาระบุจุดส่ง" required>
                    </div>
                    <div class="form-group">
                        <label>ยืนยันรหัสผ่าน</label>
                        <input type="password" v-model="confrimPassword" class="form-control" placeholder="กรุณาระบุจุดส่ง" required>
                        <p v-show="!statusPassword" style="color: red; font-weight: bold; margin-top: 10px;">รหัสผ่านไม่ตรงกัน</p>
                    </div>
                    <div class="form-group">
                        <label>สถานะ</label>
                        <select v-model="data.status" class="form-control" required>
                            <option value="">กรุณาเลือกสถานะ</option>
                            <option value="1">พนักงานขาย</option>
                            <option value="2">พนักงานบัญชี</option>
                            <option value="99">ผู้ดูแลระบบ</option>
                        </select>
                    </div>
                    <div class="text-center">
                        <button type="submit" class="btn btn-info btn-sm">บันทึก</button>
                        <button type="button" class="btn btn-default btn-sm"  data-dismiss="modal" aria-label="Close">ยกเลิก</button>
                    </div>
                </form>
            </div>
            </div>
        </div>
    </div>
  </div>
</template>
<script>
import axios from '@/service/axios'
import Jquery from 'jquery'
export default {
    props: {
        user: {
            type: Object,
            default: {}
        }
    },
    data(){
        return {
            data: {
                update: false,
                id: '',
                username: '',
                password: '',
                status: ''
            },
            confrimPassword: '',
            statusPassword: true
        }
    },
    methods: {
        toggleModal(){
            $(this.$refs.modal).modal('toggle')
        },
        submit(){
            if(this.statusPassword){
                if(this.data.update){
                    this.$store.dispatch('updateUser',this.data)
                    .then(() => {
                        this.$emit('finish')
                    })
                }else{
                    this.$store.dispatch('addUser',this.data)
                    .then(()=>{
                        this.$emit('finish')
                    })
                }
            this.toggleModal()
            }
        },
        clearData(){
            this.data = {
                update: false,
                id: '',
                username: '',
                password: '',
                status: ''
            }
            this.confrimPassword = ''
            this.$emit('finish')
        }
    },
    computed: {
        checkPassword(){
            if(this.data.password != this.confrimPassword){
                this.statusPassword = false
            }else{
                this.statusPassword = true
            }
        }
    },
    watch:{
        user(val){
            this.data.update = true
            this.data.id = val._id
            this.data.username = val.username
            this.data.password = val.password
            this.confrimPassword = val.password
            this.data.status = val.status
        },
        checkPassword(val){
            console.log(val)
        }
    },
    created(){
        this.checkPassword
    },
    mounted(){
        $(this.$refs.modal).on('hidden.bs.modal',this.clearData)
    }
  
}
</script>

