<template>
    <div id="section-to-print" >
        <h3 id="titlePrint" class="text-center">รายงานการขนส่งประจำช่วง</h3>
        <form v-on:submit.prevent="submit" class="col-sm-12 no-print">
            <div class="form-group row">
                <div class="text-right col-sm-2">จากวันที่</div>
                <input type="date" v-model="data.dateFrom" class="form-control col-sm-3" required>
                 <div class="text-right col-sm-2">ถึงวันที่</div>
                <input type="date" v-model="data.dateTo" class="form-control col-sm-3" required>
                <button type="submit" class="btn btn-info btn-sm">ค้นหา</button>
                <button type="button" @click="printReport" style="margin-left: 10px;" class="btn btn-default"><i class="fa fa-print"></i> พิมพ์</button>
            </div>
        </form>
        <h6 class="titleDatePrint text-center">รายงานประจำวันที่: {{data.dateFrom || '-'}} ถึง {{data.dateTo || '-'}}</h6>
        <div class="row no-print">
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
                            <th>ผู้ใหญ่</th>
                            <th>เด็ก</th>
                            <th>รวมจำนวนผู้โดยสาร</th>
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
                            <td>{{ formatComma(data.price || 0) }}</td>
                            <td>{{ formatComma(data.amount || 0) }}</td>
                            <td>{{ formatComma(data.amountKid || 0) }}</td>
                            <td>{{ formatComma(parseInt(data.amount + (data.amountKid || 0)) || 0) }}</td>
                            <td>{{ formatComma(data.total || 0) }}</td>
                            <td>{{ data.remark || '-' }}</td>
                        </tr>
                    </tbody>
                    <tfoot id="section-to-hide">
                        <tr>
                            <th colspan="4">รวม</th>
                            <th>{{ formatComma(total.totalPrice || 0) }}</th>
                            <th>{{ formatComma(total.totalAdl || 0) }}</th>
                            <th>{{ formatComma(total.totalKid || 0) }}</th>
                            <th>{{ formatComma(total.totalAmount || 0) }}</th>
                            <th>{{ formatComma(total.total || 0)}}</th>
                            <th></th>
                        </tr>
                    </tfoot>
                </table>
                <div style="float: right; font-weight: bold; text-align: right">
                    <p>รวม : {{ total.total || 0 }} บาท</p>
                    <p>ส่วนแบ่งกำไร ({{ percentTaxi * 100 }}%) : {{ total.fee || 0 }} บาท</p>
                    <p>คงเหลือหลังหักส่วนแบ่ง : {{ total.grandTotal || 0 }} บาท</p>
                </div>
                <div style="float: left; font-weight: bold; text-align: center;">
                    <p>..............................................</p>
                    <p>( ผู้จัดทำ )</p>
                    <p style="margin-top: 15px;">..............................................</p>
                    <p>( ผู้ตรวจสอบ )</p>
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
            total: {},
            percentTaxi: ''
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
            return moment(date).format('D/MM/YYYY HH:mm')
        },
        printReport(){
            window.print();
        },
        formatComma(x){
            return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        }
    },
    computed: {
        getTaxiTicketByDate(){
            this.dataTable = this.$store.getters.getTaxiTicketByDate
            this.taxiTicket
             return this.dataTable
        },
        taxiTicket(){
            return this.dataTable.filter(v => {
                  return v._id.match(this.searchKey) || v.destination.nameRoute.match(this.searchKey) || v.typeCar.match(this.searchKey)
             })
        },
        getPercentTaxi(){
            this.$store.dispatch('getPercent')
            .then(() => {
                const obj = this.$store.getters.getPercent
                this.percentTaxi = obj.percentTaxi / 100
            })
        }
    },
    watch: {
        taxiTicket(val){
           if(val.length > 0){
                var totalPrice = val.reduce((a,b)=> parseInt(a) + parseInt(b.price),0)
                var totalAdl = val.reduce((a,b) => parseInt(a || 0) + parseInt(b.amount || 0),0);
                var totalKid = val.reduce((a,b) => parseInt(a) + parseInt(b.amountKid || 0),0);
                var totalAmount = val.reduce((a, b) => parseInt(a || 0) + parseInt(b.amount || 0) + parseInt(b.amountKid || 0),0);
                var total = val.reduce((a,b) => parseInt(a) + parseInt(b.total),0)
                this.total = {
                    totalPrice: totalPrice,
                    totalAdl: totalAdl,
                    totalKid: totalKid,
                    totalAmount: totalAmount,
                    total: total,
                    fee: total * this.percentTaxi,
                    grandTotal: total - (total * this.percentTaxi)
                }
            }else{
                this.total = {
                    totalPrice: 0,
                    totalAdl: 0,
                    totalKid: 0,
                    totalAmount: 0,
                    total: 0,
                    fee: 0,
                    grandTotal: 0
                }
            }
        }
    },
    created(){
        this.getPercentTaxi
    }
}
</script>
<style scoped>
@media print {
    #section-to-print{
        font-size: 18px;
    }
    #section-to-print table tr th{
        white-space: nowrap;
    }
    #section-to-print table{
        font-size: 18px;
        line-height: 0.8;
    }
   
}
</style>
