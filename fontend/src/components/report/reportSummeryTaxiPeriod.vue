<template>
    <div id="section-to-print" >
        <h3 id="titlePrint"  class="text-center">รายงานสรุปการขนส่งประจำช่วง</h3>
         <form v-on:submit.prevent="submit" class="col-sm-12 no-print">
            <div class="form-group row">
                <div class="text-right col-sm-2">จากวันที่</div>
                <input type="date" v-model="data.dateFrom" class="form-control col-sm-3" required>
                 <div class="text-right col-sm-2">ถึงวันที่</div>
                <input type="date" v-model="data.dateTo" class="form-control col-sm-3" required>
                <button type="submit" class="btn btn-info btn-sm">ค้นหา</button>
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
                            <th width="40%" rowspan="2">จุดส่ง</th>
                            <th colspan="2">อัตราค่าโดยสาร</th>
                            <th colspan="2">จำนวนผู้โดยสาร</th>
                            <th colspan="2">ราคา</th>
                            <th rowspan="2">ราคารวม</th>
                        </tr>
                        <tr>
                            <th>รถยนต์</th>
                            <th>รถตู้</th>
                            <th>รถยนต์</th>
                            <th>รถตู้</th>
                            <th>รถยนต์</th>
                            <th>รถตู้</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(data,index) in dataReady" :key="index">
                           <td>{{ data.nameRoute }}</td> 
                           <td>{{ data.priceTaxi }}</td> 
                           <td>{{ data.priceVan }}</td> 
                           <td>{{ data.amountTaxi }}</td> 
                           <td>{{ data.amountVan }}</td> 
                           <td>{{ data.totalTaxi }}</td> 
                           <td>{{ data.totalVan }}</td> 
                           <td>{{ data.total }}</td> 
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <div class="row">
            <div class="col-sm-12">
                <div style="float: right; font-weight: bold; text-align: right">
                    <p>รวม : {{ total || 0 }} บาท</p>
                    <p>({{ percentTaxi * 100 }}%) : {{ (total* percentTaxi) || 0 }} บาท</p>
                    <p>รวมทั้งสิ้น : {{ (total - (total* percentTaxi)) || 0 }} บาท</p>
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
            dataReady: [],
            total: 0,
            percentTaxi: ''
        }
    },
    methods: {
        submit(){
            this.$store.dispatch('getTaxiTicketSummery',this.data)
            .then(() => {
                this.getTaxiTicketSummery
                this.manipulate
            })
        },
        printReport(){
            window.print();
        }
    },
    computed: {
        getTaxiTicketSummery(){
            this.dataTable = this.$store.getters.getTaxiTicketSummery
             return this.dataTable
        },
        manipulate(){
            this.dataReady = []
            this.total = 0
            this.dataTable.forEach(element => {
                let data = {
                    nameRoute: element.destination[0].nameRoute,
                    priceTaxi: element.destination[0].priceTaxi,
                    priceVan: element.destination[0].priceVan,
                    amountTaxi: 0,
                    amountVan: 0,
                    totalTaxi: 0,
                    totalVan: 0,
                    total: 0
                }
                element.totalByTypeCar.forEach(val => {
                    if(val.typeCar === 'Limousine'){2
                        data.amountTaxi += val.totalAmount
                        data.totalTaxi += val.totalPrice
                    }else{
                        data.amountVan += val.totalAmount
                        data.totalVan += val.totalPrice
                    }
                })
                data.total = data.totalTaxi + data.totalVan
                this.total += data.total
                this.dataReady.push(data)
            });
        },
        getTotal(){
            if(this.dataTable.length > 0){
                return this.dataTable[0].totalByTypeCar.reduce((a,b) => {
                    return parseInt(a) + parseInt(b.totalPrice)
                })
            }
        },
        getPercentTaxi(){
            this.$store.dispatch('getPercent')
            .then(() => {
                const obj = this.$store.getters.getPercent
                this.percentTaxi = obj.percentTaxi / 100
            })
        }
    },
    created(){
        this.getPercentTaxi
    }
}
</script>
<style scoped>
.table td, .table th{
    vertical-align: middle;
}
</style>
