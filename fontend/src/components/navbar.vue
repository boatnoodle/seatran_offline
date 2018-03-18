<template>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <router-link to="/" class="navbar-brand" href="#">
            <img src="../assets/logo.jpg" alt="">
        </router-link>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav mr-auto">
                <li class="nav-item active">
                    <router-link to="/taxi/sell"  class="nav-link" href="#">ขาย Taxi</router-link>
                </li>
                <li class="nav-item">
                    <router-link to="/tour/sell" class="nav-link" href="#">ขาย Tour</router-link>
                </li>
                <li class="nav-item dropdown">
                    <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        รายงาน
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
                <li class="nav-item dropdown active">
                    <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        ตั้งค่าระบบ
                    </a>
                    <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                        <b class="title">ระบบ Taxi</b>
                        <router-link  to="/taxi/setRoute" class="dropdown-item" href="#">ตั้งค่าเส้นทาง</router-link>
                        <div class="dropdown-divider"></div>
                        <b class="title">ระบบ Tour</b>
                        <router-link to="/tour/setAgent" class="dropdown-item" href="#">ตั้งค่าตัวแทนขาย</router-link>
                        <router-link to="/tour/setTour" class="dropdown-item" href="#">ตั้งค่าสถานที่</router-link>
                        <div class="dropdown-divider"></div>
                        <router-link to="/setBill" class="dropdown-item" href="#">ตั้งค่าบิล</router-link>
                    </div>
                </li>
            </ul>
        </div>
    </nav>
</template>

<script>
export default {
  
}
</script>
<style scoped>
    .navbar-expand-lg .navbar-nav .dropdown-menu{
        left: -57%;
    }
    .title{
        padding: 20px;
    }
</style>

