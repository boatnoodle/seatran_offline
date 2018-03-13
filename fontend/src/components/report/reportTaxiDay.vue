<template>
    <div>
        <h3 class="text-center">รายงานประจำวัน Taxi</h3>
        <p class="text-center">{{ dateToday }}</p>
            <form class=" col-sm-6 offset-sm-3">
                <div class="form-group">
                    <label class="text-right">ค้นหา</label>
                    <input type="date" class="form-control" >
                </div>
                <button class="btn btn-info btn-sm">ค้นหา</button>
            </form>
        <hr>
    </div>
</template>
<script>
import moment from 'moment';
export default {
  data(){
      return {
          dateToday: moment().format("Do MMM YYYY")
      }
  },created(){
    moment.locale('th');
  }
}
</script>
