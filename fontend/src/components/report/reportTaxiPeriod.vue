<template>
    <div>
        <h3 class="text-center">รายงานการขนส่งประจำช่วง</h3>
        <form v-on:submit.prevent="submit" class=" col-sm-12">
            <div class="form-group row">
                <div class="text-right col-sm-2">จากวันที่</div>
                <input type="date" v-model="data.dateFrom" class="form-control col-sm-3" required>
                 <div class="text-right col-sm-2">ถึงวันที่</div>
                <input type="date" v-model="data.dateTo" class="form-control col-sm-3" required>
                <button type="submit" class="btn btn-info btn-sm">ค้นหา</button>
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
                <table class="table table-sm table-bordered table-hover">
                    <thead>
                        <tr>
                            <th>วันที่</th>
                            <th>รหัส</th>
                            <th>จุดส่ง</th>  
                            <th>ประเภทรถ</th>
                            <th>ราคา</th>
                            <th>จำนวนผู้โดยสาร</th>
                            <th>ราคารวม</th>
                            <th>หมายเหตุ</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(data,index) in taxiTicket" :key="index">
                            <td>{{ dateFormat(data.created) }}</td>
                            <td>{{ data._id }}</td>
                            <td>{{ data.destination.nameRoute }}</td>
                            <td>{{ data.typeCar }}</td>
                            <td>{{ data.price }}</td>
                            <td>{{ data.amount }}</td>
                            <td>{{ data.total }}</td>
                            <td>{{ data.remark || '-' }}</td>
                        </tr>
                    </tbody>
                    <tfoot>
                        <tr>
                            <th>รวม</th>
                            <th></th>
                            <th></th>
                            <th></th>
                            <th>{{ total.totalPrice || 0 }}</th>
                            <th>{{ total.totalAmount || 0 }}</th>
                            <th>{{ total.total || 0}}</th>
                            <th></th>
                        </tr>
                    </tfoot>
                </table>
                <div style="float: right; font-weight: bold; text-align: right">
                    <p>รวม : {{ total.total || 0 }} บาท</p>
                    <p>(30%) : {{ total.fee || 0 }} บาท</p>
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
                dateTo: ''
            },
            dataTable: [],
            dateToday: moment().locale('th').format("Do MMM YYYY"),
            searchKey: '',
            total: {}
        }
    },
    methods: {
        submit(){
            this.$store.dispatch('getTaxiTicketByDate',this.data)
            .then(() => {
                this.getTaxiTicketByDate
                this.taxiTicket
            })
        },
        dateFormat(date){
            return moment(date).format('D/MM/YYYY')
        }
    },
    computed: {
        getTaxiTicketByDate(){
            this.dataTable = this.$store.getters.getTaxiTicketByDate
            this.getTotal
             return this.dataTable
        },
        taxiTicket(){
            return this.dataTable.filter(v => {
                  return v._id.match(this.searchKey) || v.destination.nameRoute.match(this.searchKey) || v.typeCar.match(this.searchKey)
             })
        },
        getTotal(){
            if(this.dataTable.length > 0){
                var totalPrice = this.dataTable.reduce((a,b)=> parseInt(a) + parseInt(b.price),0)
                var totalAmount = this.dataTable.reduce((a,b) => parseInt(a) + parseInt(b.amount),0)
                var total = this.dataTable.reduce((a,b) => parseInt(a) + parseInt(b.total),0)
                this.total = {
                    totalPrice: totalPrice,
                    totalAmount: totalAmount,
                    total: total,
                    fee: total * 0.3,
                    grandTotal: total + (total * 0.3)
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
    watch: {
        taxiTicket(val){
           if(val.length > 0){
                var totalPrice = val.reduce((a,b)=> parseInt(a) + parseInt(b.price),0)
                var totalAmount = val.reduce((a,b) => parseInt(a) + parseInt(b.amount),0)
                var total = val.reduce((a,b) => parseInt(a) + parseInt(b.total),0)
                this.total = {
                    totalPrice: totalPrice,
                    totalAmount: totalAmount,
                    total: total,
                    fee: total * 0.3,
                    grandTotal: total + (total * 0.3)
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
    }
}
</script>
<style scoped>

.VuePagination {
  text-align: center;
}

.vue-title {
  text-align: center;
  margin-bottom: 10px;
}

.vue-pagination-ad {
  text-align: center;
}

.glyphicon.glyphicon-eye-open {
  width: 16px;
  display: block;
  margin: 0 auto;
}

th:nth-child(3) {
  text-align: center;
}

.VueTables__child-row-toggler {
  width: 16px;
  height: 16px;
  line-height: 16px;
  display: block;
  margin: auto;
  text-align: center;
}

.VueTables__child-row-toggler--closed::before {
  content: "+";
}

.VueTables__child-row-toggler--open::before {
  content: "-";
}
</style>
