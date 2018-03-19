<template>
    <div>
        <h3 class="text-center">รางานทัวร์ประจำวัน</h3>
        <!-- <p class="text-center">{{ dateToday }}</p> -->
        <form v-on:submit.prevent="submit" class=" col-sm-6 offset-sm-3">
            <div class="form-group row">
                <div class="text-right col-sm-2">ค้นหา</div>
                <input type="date" v-model="data.dateFrom" class="form-control col-sm-8" >
                <button type="submit" class="btn btn-info btn-sm col-sm-2">ค้นหา</button>
            </div>
        </form>
        <div class="row">
            <div class="col-sm-12">
                <div class="form-group">
                    <input type="text" v-model="searchKey" placeholder="ค้นหาผ่าน รหัส,จุดส่ง,ประเภทรถ" class="form-control" >
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-sm-12">
                <table class="table table-sm table-bordered table-hover text-center">
                    <thead>
                        <tr>
                            <th>รหัส</th>
                            <th>ชื่อ</th>
                            <th>ตัวแทนขาย</th>
                            <th>ชื่อทัวร์</th>
                            <th>ราคาทัวร์</th>
                            <th>จำนวนคน</th>
                            <th>ราคาทั้งหมด</th>
                            <th>Voucher</th>
                            <th>ชื่อโรงแรม</th>
                            <th>ห้องที่</th>
                            <th>หมายเหตุ</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(data,index) in tourTicket" :key="index">
                            <td>{{ data._id }}</td>
                            <td>{{ data.name }}</td>
                            <td>{{ data.nameAgent }}</td>
                            <td>{{ data.tour.nameTour }}</td>
                            <td>{{ data.tour.priceTour }}</td>
                            <td>{{ data.amount }}</td>
                            <td>{{ data.tour.priceTour * data.amount }}</td>
                            <td>{{ data.voucher || '-' }}</td>
                            <td>{{ data.nameHotel || '-' }}</td>
                            <td>{{ data.room || '-' }}</td>
                            <td>{{ data.remark || '-' }}</td>
                        </tr>
                    </tbody>
                    <tfoot>
                        <tr>
                            <th colspan="4">รวม</th>
                            <th>{{ total.totalPrice || 0 }}</th>
                            <th>{{ total.totalAmount || 0 }}</th>
                            <th>{{ total.total || 0}}</th>
                            <th colspan="4"></th>
                        </tr>
                    </tfoot>
                </table>
                <div style="float: right; font-weight: bold; text-align: right">
                    <p>รวม : {{ total.total || 0 }} บาท</p>
                    <p>({{ percentTour * 100 }}%) : {{ total.fee || 0 }} บาท</p>
                    <p>รวมทั้งสิ้น : {{ total.grandTotal || 0 }} บาท</p>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import moment from 'moment';

export default {
    data(){
        return {
            data:{
                dateFrom: '',
            },
            dataReady: [],
            dateToday: moment().locale('th').format("Do MMM YYYY"),
            searchKey: '',
            total: {},
            percentTour: ''
        }
    },
    methods: {
        submit(){
            this.$store.dispatch('getTourTicketByDate',this.data)
            .then(() => {
                this.manipulate
            })
        }
    },
    computed: {
        manipulate(){ //ข้อผิดพลาด ของการดึงดาต้าเบสยังไม่ดีพอ
            this.dataReady = []
            const dataRaw = this.$store.getters.getTourTicketByDate
            
            dataRaw.forEach(val => {
                const obj = val.agent.tour.find(v => v._id == val.tour)
                const data = {
                    '_id' : val._id,
                    'name': val.name,
                    'nameAgent': val.agent.nameAgent,
                    'tour': obj,
                    'amount': val.amount,
                    'total': val.total,
                    'voucher': val.voucher,
                    'nameHotel': val.nameHotel,
                    'room' : val.room,
                    'remark': val.remark,
                    "created": val.created
                }
                this.dataReady.push(data)
            })
        },
        tourTicket(){
            return this.dataReady.filter(v => {
                  return v._id.match(this.searchKey) || v.name.match(this.searchKey) || v.nameAgent.match(this.searchKey) || v.tour.nameTour.match(this.searchKey)
             })
        },
        getPercentTour(){
            this.$store.dispatch('getPercent')
            .then(() => {
                const obj = this.$store.getters.getPercent
                this.percentTour = obj.percentTour / 100
            })
        }
    },
    watch: {
        tourTicket(val){
           if(val.length > 0){
                var totalPrice = val.reduce((a,b)=> parseInt(a) + parseInt(b.tour.priceTour),0)
                var totalAmount = val.reduce((a,b) => parseInt(a) + parseInt(b.amount),0)
                var total = val.reduce((a,b) => parseInt(a) + parseInt(b.total),0)
                this.total = {
                    totalPrice: totalPrice,
                    totalAmount: totalAmount,
                    total: total,
                    fee: total * this.percentTour,
                    grandTotal: total + (total * this.percentTour)
                }
            }else{
                this.total = {
                    totalPrice: 0,
                    totalAmount: 0,
                    total: 0,
                    fee: 0,
                    grandTotal: 0
                }
            }
        }
    },
    created(){
        this.getPercentTour
    }
}
</script>
<style scoped>

</style>
