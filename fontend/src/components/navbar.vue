<template>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <router-link to="/" class="navbar-brand" href="#">
            <img src="../assets/logo.jpg" alt="">
        </router-link>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav mr-auto"  v-show="statusShow">
                <li class="nav-item active">
                    <router-link to="/taxi/sell"  class="nav-link" href="#"><i class="fa fa-taxi"></i> ขาย Taxi</router-link>
                </li>
                <li class="nav-item">
                    <router-link to="/tour/sell" class="nav-link" href="#"><i class="fa fa-bus"></i> ขาย Tour</router-link>
                </li>
                <li class="nav-item dropdown" v-show="statusShow && status != 1">
                    <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        <i class="fa fa-file-text-o"></i> รายงาน
                    </a>
                    <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                        <b class="title">ระบบ Taxi</b>
                        <router-link to="/report/reportTaxiDay" class="dropdown-item">รายงานประจำวัน</router-link>
                        <router-link to="/report/reportTaxiPeriod" class="dropdown-item">รายงานประจำช่วง</router-link>
                        <router-link to="/report/reportSummeryTaxiDay" class="dropdown-item">รายงานสรุปประจำวัน</router-link>
                        <router-link to="/report/reportSummeryTaxiPeriod" class="dropdown-item">รางานสรุปประจำช่วง</router-link>
                        <div class="dropdown-divider"></div>
                        <b class="title">ระบบ Tour</b>
                        <router-link to="/report/reportTourDay" class="dropdown-item">รายงานประจำวัน</router-link>
                        <router-link to="/report/reportTourPeriod" class="dropdown-item">รายงานประจำช่วง</router-link>
                        <router-link to="/report/reportSummeryTourDay" class="dropdown-item">รายงานสรุปประจำวัน</router-link>
                        <router-link to="/report/reportSummeryTourPeriod" class="dropdown-item">รายงานสรุปประจำช่วง</router-link>
                        
                    </div>
                </li>
            </ul>
            <ul class="navbar-nav">
                <li class="nav-item dropdown active" v-show="statusShow && status == 99">
                    <a class="nav-link dropdown-toggle" href="#" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        <i class="fa fa-cog"></i> ตั้งค่าระบบ
                    </a>
                    <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                        <b class="title">ระบบ Taxi</b>
                        <router-link  to="/taxi/setRoute" class="dropdown-item">ตั้งค่าเส้นทาง</router-link>
                        <div class="dropdown-divider"></div>
                        <b class="title">ระบบ Tour</b>
                        <router-link to="/tour/setAgent" class="dropdown-item">ตั้งค่าตัวแทนขาย</router-link>
                        <router-link to="/tour/setTour" class="dropdown-item">ตั้งค่ารายการทัวร์</router-link>
                        <div class="dropdown-divider"></div>
                        <b class="title">ตั้งค่าระบบ</b>
                        <router-link to="/user/setUser" class="dropdown-item">ตั้งค่าผู้ใช้</router-link>
                        <router-link to="/setBill" class="dropdown-item">ตั้งค่าบิล</router-link>
                        <router-link to="/setPercent" class="dropdown-item">ตั้งค่า % รายงาน</router-link>
                    </div>
                </li>
                <li class="nav-item active" v-show="statusShow">
                    <a href="#" @click="logout"  class="nav-link"><i class="fa fa-power-off"></i> ออกจากระบบ</a>
                </li>
            </ul>
        </div>
        <h5 href="#" class="welcomeUser" v-show="statusShow">ยินดีต้อนรับ {{ username }}</h5>
    </nav>
</template>

<script>
export default{
   data(){
        return {
           statusShow: false,
           status: '',
           username: ''
        }
    },
    methods: {
        logout(){
            this.$store.dispatch('logout')
            .then(() => {
              this.checkLoginUser  
            })
        }
    },
    computed:{
        checkLoginUser(){
            return this.$store.getters.checkLoginUser
        }
    },
    watch: {
        checkLoginUser(val){
            if(val){
                this.status = val.status
                this.username = val.username
                this.statusShow = true
            }else{
                this.status = ''
                this.username = ''
                this.statusShow = false
                this.$router.push('/user/login')
            }
        }
    },
    created(){
        const obj = this.checkLoginUser
        if(obj){
            this.status = obj.status
            this.username = obj.username
            this.statusShow = true
        }
    }
}
</script>
<style scoped>
    .navbar-expand-lg .navbar-nav .dropdown-menu{
        left: -57%;
    }
    .title{
        padding: 20px;
    }
    .welcomeUser{
        position: absolute;
        right: 0;
        bottom: -42px;
        background: #8ad9ff;
        padding: 5px;
    }
</style>

