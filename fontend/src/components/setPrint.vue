<template>
  <div>
      <h3><i class="fa fa-print"></i> ตั้งค่าการปริ้น</h3><hr>
        <form v-on:submit.prevent="submit">
            <div class="row" style="margin-top: 20px;">
                <div class="col-sm-6">
                        <h5>Taxi</h5>
                        <div class="form-group">
                            <label>1. เปิด/ปิด การออกใบเสร็จ</label>
                            <input v-model="data.statusPrint" class="form-control" style="width: auto;" type="checkbox">
                        </div>
                        <div class="form-group">
                            <label>2. จำนวนครั้งที่ออกใบเสร็จ</label>
                            <input type="number" v-model="data.amountPrint" class="form-control" placeholder="ระบุจำนวนครั้งที่ต้องการออกใบเสร็จ">
                        </div>
                </div>
                <div class="col-sm-6">
                        <h5>Tour</h5>
                        <div class="form-group">
                            <label>1. เปิด/ปิด การออกใบเสร็จ</label>
                            <input v-model="data.statusPrintTour" class="form-control" style="width: auto;" type="checkbox">
                        </div>
                        <div class="form-group">
                            <label>2. จำนวนครั้งที่ออกใบเสร็จ</label>
                            <input type="number" v-model="data.amountPrintTour" class="form-control" placeholder="ระบุจำนวนครั้งที่ต้องการออกใบเสร็จ">
                        </div>
                        <div class="pull-right">
                            <button type="submit" class="btn btn-info">บันทึก</button>
                        </div>
                </div>
            </div>
        </form>
  </div>
</template>
<script>
import axios from 'axios'
export default {
    data(){
        return {
            data: {
               statusPrint: true,
               amountPrint: 1,
               statusPrintTour: true,
               amountPrintTour: 1
            }
        }
    },
    methods: {
        submit(){
            this.$store.dispatch('updatePrintSetting',this.data)
            .then(result => {
                this.actionGetPrintSetting
            })
            .catch(err => {
                console.log(err)
            })
        }
    },
    computed: {
        actionGetPrintSetting(){
            this.$store.dispatch('getPrintSetting')
            .then(() => {
                const obj = this.$store.getters.getPrintSetting
                this.data.statusPrint = obj.statusPrint
                this.data.amountPrint = obj.amountPrint
                this.data.statusPrintTour = obj.statusPrintTour
                this.data.amountPrintTour = obj.amountPrintTour
                // console.log(obj)
                return obj
            })
        }
    },
     created(){
        this.actionGetPrintSetting
    }
}
</script>
<style scoped>
</style>

