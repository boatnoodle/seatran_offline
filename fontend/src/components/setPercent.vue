<template>
  <div>
      <h3><i class="fa fa-cog"></i> ตั้งค่า % รายงาน</h3><hr>
      <div class="row" style="margin-top: 20px;">
          <div class="col-sm-6 offset-sm-3">
            <form v-on:submit.prevent="submit">
                <div class="form-group">
                    <label>เปอร์เซ็นรายงานแท็กซี่</label>
                    <input type="number" v-model="data.percentTaxi" class="form-control" placeholder="ระบุแค่จำนวนไม่ต้องใส่ % ตัวอย่าง 30">
                </div>
                <div class="form-group">
                    <label>เปอร์เซ็นรายงานทัวร์</label>
                    <input type="number" v-model="data.percentTour" class="form-control" placeholder="ระบุแค่จำนวนไม่ต้องใส่ % ตัวอย่าง 20">
                </div>
                <div>
                    <button type="submit" class="btn btn-info">บันทึก</button>
                </div>
            </form>
          </div>
      </div>
  </div>
</template>
<script>
import axios from 'axios'
export default {
    data(){
        return {
            data: {
                percentTaxi : '',
                percentTour: ''
            }
        }
    },
    methods: {
         submit(){
            this.$store.dispatch('updatePercent',this.data)
            .then(response => {
                this.actionGetBillHead
            })
            .catch(error => {
                console.log(error);
            });
        }
    },
    computed: {
        getPercent(){
            const obj = this.$store.getters.getPercent
            this.data.percentTaxi = obj.percentTaxi
            this.data.percentTour = obj.percentTour
            return obj
        },
        actionGetPercent(){
            this.$store.dispatch('getPercent')
            .then(() => {
                this.getPercent
            })
        }
    },
     created(){
        this.actionGetPercent
    }
}
</script>
<style scoped>
</style>

