<template>
    <div id="section-to-print">
        <h3 id="titlePrint" class="text-center">รายงานสรุปทัวร์ประจำวัน</h3>
        <form v-on:submit.prevent="submit" class=" col-sm-6 offset-sm-3 no-print">
            <div class="form-group row">
                <div class="text-right col-sm-2">ค้นหา</div>
                <input type="date" v-model="data.dateFrom" class="form-control col-sm-8" >
                <button type="submit" class="btn btn-info btn-sm col-sm-2">ค้นหา</button>
            </div>
        </form>
         <div class="row no-print" style="margin-bottom: 15px;">
            <div class="col-sm-12 text-right">
                <button id="notPrint" type="button" @click="printReport" class="btn btn-default"><i class="fa fa-print"></i> พิมพ์</button>
            </div>
        </div>
        <div class="row">
            <div class="col-sm-12">
                <table class="table table-sm table-bordered table-hover text-center">
                    <thead>
                        <tr>
                            <th rowspan="2" class="text-left" width="40%">ชื่อทัวร์</th>
                            <th colspan="2">จำนวนรวม</th>
                            <th colspan="2">ราคารวม Full Rate</th>
                            <th colspan="2">ราคารวม Net Rate</th>
                        </tr>
                        <tr>
                            <th>ADL</th>
                            <th>CHL</th>
                            <th>ADL</th>
                            <th>CHL</th>
                            <th>ADL</th>
                            <th>CHL</th>
                        </tr>
                    </thead>
                    <tbody>
                        <template v-for="(data,index) in getTourTicketSummery">
                            <tr :key="index">
                                <td class="text-left">{{ data.detailAgent[0].nameAgent }}</td>
                                <td>{{ data.totalAmountAdult }}</td> 
                                <td>{{ data.totalAmountChild }}</td> 
                                <td>{{ data.totalPriceAdult }}</td> 
                                <td>{{ data.totalPriceChild }}</td> 
                                <td>{{ data.totalNetPriceAdult }}</td> 
                                <td>{{ data.totalNetPriceChild }}</td> 
                            </tr>
                        </template>
                    </tbody>
                     <tfoot>
                        <tr>
                            <th>Total</th>
                            <th>{{ totals.totalAmountAdult || 0 }}</th>
                            <th>{{ totals.totalAmountChild || 0 }}</th>
                            <th>{{ totals.totalPriceAdult || 0}}</th>
                            <th>{{ totals.totalPriceChild || 0}}</th>
                            <th>{{ totals.totalNetPriceAdult || 0}}</th>
                            <th>{{ totals.totalNetPriceChild || 0}}</th>
                        </tr>
                    </tfoot>
                </table>
            </div>
        </div>
        <!-- <div class="row">
            <div class="col-sm-12">
                <div style="float: right; font-weight: bold; text-align: right">
                    <p>รวม : {{ total.total || 0 }} บาท</p>
                    <p>({{ percentTour * 100 }}%) : {{ (total.total * percentTour) || 0 }} บาท</p>
                    <p>รวมทั้งสิ้น : {{ (total.total + (total.total * percentTour)) || 0 }} บาท</p>
                </div>
                <div style="float: left; font-weight: bold; text-align: center;">
                    <p>..............................................</p>
                    <p>( ผู้จัดทำ )</p>
                    <p style="margin-top: 15px;">..............................................</p>
                    <p>( ผู้ตรวจสอบ )</p>
                </div>
            </div>
        </div> -->
    </div>
</template>
<script>
import moment from 'moment';

export default {
    data(){
        return {
            data:{
                dateFrom: ''
            },
            dataTable: [],
            totals: {
                'totalAmountAdult': 0,
                'totalAmountChild': 0,
                'totalPriceAdult': 0,
                'totalPriceChild': 0,
                'totalNetPriceAdult': 0,
                'totalNetPriceChild': 0
            },
            percentTour: ''
        }
    },
    methods: {
        submit(){
            this.$store.dispatch('getTourTicketSummery',this.data)
            .then(() => {
                this.getTourTicketSummery
                this.getTotal()
            })
        },
        printReport(){
            window.print();
        },
        getTotal(){
            this.totals.totalAmountAdult = this.dataTable.reduce((a,b) => a + b.totalAmountAdult,0)
            this.totals.totalAmountChild = this.dataTable.reduce((a,b) => a + b.totalAmountChild,0)
            this.totals.totalPriceAdult = this.dataTable.reduce((a,b) => a + b.totalPriceAdult,0)
            this.totals.totalPriceChild = this.dataTable.reduce((a,b) => a + b.totalPriceChild,0)
            this.totals.totalNetPriceAdult = this.dataTable.reduce((a,b) => a + b.totalNetPriceAdult,0)
            this.totals.totalNetPriceChild = this.dataTable.reduce((a,b) => a + b.totalNetPriceChild,0)
        }
    },
    computed: {
        getTourTicketSummery(){
            this.dataTable = this.$store.getters.getTourTicketSummery
            return this.dataTable
        },
        getPercentTour(){
            this.$store.dispatch('getPercent')
            .then(() => {
                const obj = this.$store.getters.getPercent
                this.percentTour = obj.percentTour / 100
            })
        }
    },
    created(){
        this.getPercentTour
    }
}
</script>
<style scoped>
.table td, .table th{
    vertical-align: middle;
}
</style>
