<template>
  <div>
      <h3 class="text-center">เข้าสู่ระบบ</h3>
      <div class="row" style="margin-top: 20px;">
          <div class="col-sm-6 offset-sm-3">
              <div class="card">
                  <div class="card-header bg-info text-white">
                      เข้าสู่ระบบ
                  </div>
                  <div class="card-body">
                      <form v-on:submit.prevent="submit" ref="formLogin">
                          <div class="form-group">
                              <label>ชื่อผู้ใช้</label>
                              <input type="text" ref="username" v-model="data.username" class="form-control" placeholder="ชื่อผู้ใช้" required>
                          </div>
                          <div class="form-group">
                              <label>รหัสผ่าน</label>
                              <input type="password" v-model="data.password" class="form-control" placeholder="รหัสผ่าน" required>
                          </div>
                          <div class="text-center">
                              <button type="submit" class="btn btn-default">เข้าสู่ระบบ</button>
                          </div>
                      </form>
                  </div>
              </div>
          </div>
      </div>
  </div>
</template>
<script>
export default {
    data(){
        return {
            data: {
                username: '',
                password: ''
            }
        }
    },
    methods: {
      submit(){
          this.$store.dispatch('checkLoginUser',this.data)
          .then(() => {
            if(this.checkLoginUser == null){
                this.data = {
                    username: '',
                    password: ''
                }
                this.$refs.username.focus()
            }else{
                this.$router.push('/taxi/sell')
            }
          })
      }
    },
    computed: {
        checkLoginUser(){
            return this.$store.getters.checkLoginUser
        }
    },
    mounted(){
        this.$refs.username.focus()
    }
}
</script>
