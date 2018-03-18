<template>
    <div>
        <h3 class="text-center">รายงานสรุปทัวร์ประจำวัน</h3>
        <form v-on:submit.prevent="submit" class=" col-sm-6 offset-sm-3">
            <div class="form-group row">
                <div class="text-right col-sm-2">ค้นหา</div>
                <input type="date" v-model="data.dateFrom" class="form-control col-sm-8" >
                <button type="submit" class="btn btn-info btn-sm col-sm-2">ค้นหา</button>
            </div>
        </form>
        <div class="row">
            <div class="col-sm-12">
                <table class="table table-sm table-bordered table-hover text-center">
                    <thead>
                        <tr>
                            <th class="text-left" width="40%">ชื่อทัวร์</th>
                            <th>จำนวน</th>
                            <th>ราคา</th>
                            <th>ราคารวม</th>
                        </tr>
                    </thead>
                    <tbody v-for="(data,index) in dataReady" :key="index">
                        <tr>
                            <th class="text-left" colspan="5">{{ data.nameAgent }}</th>
                        </tr>
                        <tr>
                           <td class="text-left">{{ data.nameTour }}</td> 
                           <td>{{ data.totalAmount }}</td> 
                           <td>{{ data.priceTour }}</td> 
                           <td>{{ data.totalPrice }}</td> 
                        </tr>
                    </tbody>
                     <tfoot>
                        <tr>
                            <th>รวม</th>
                            <th>{{ total.totalAmount || 0 }}</th>
                            <th>{{ total.totalPrice || 0 }}</th>
                            <th>{{ total.total || 0}}</th>
                        </tr>
                    </tfoot>
                </table>
            </div>
        </div>
        <div class="row">
            <div class="col-sm-12">
                
                <div style="float: right; font-weight: bold; text-align: right">
                    <p>รวม : {{ total.total || 0 }} บาท</p>
                    <p>(30%) : {{ (total.total *0.3) || 0 }} บาท</p>
                    <p>รวมทั้งสิ้น : {{ (total.total + (total.total *0.3)) || 0 }} บาท</p>
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
            dataTable: [],
            dataReady: [],
            total: {
                'totalAmount': 0,
                'totalPrice': 0,
                'total': 0
            }
        }
    },
    methods: {
        submit(){
            this.$store.dispatch('getTourTicketSummery',this.data)
            .then(() => {
                this.getTourTicketSummery
                this.manipulate
            })
        },
        setTotal(total,total2){
            this.total += (total + total2)
            return total
        }
    },
    computed: {
        getTourTicketSummery(){
            this.dataTable = this.$store.getters.getTourTicketSummery
             return this.dataTable
        },
        manipulate(){
            this.dataReady = []
            this.total = {
                'totalAmount': 0,
                'totalPrice': 0,
                'total': 0
            }
            this.dataTable.forEach(element => {
                let data = {
                    'nameAgent': element.detailAgentTour[0].nameAgent,
                    'totalAmount': element.tour[0].totalAmount,
                    'totalPrice': element.tour[0].totalPrice,
                }
                element.detailAgentTour[0].tour.forEach(val => {
                    if(val._id == element.tour[0]._id){
                        data.nameTour = val.nameTour
                        data.priceTour = val.priceTour
                    }
                })
                this.total.totalAmount += parseInt(data.totalAmount)
                this.total.totalPrice += parseInt(data.priceTour)
                this.total.total += parseInt(data.totalPrice)
                this.dataReady.push(data)
            });
        }
    }
}
</script>
<style scoped>
.table td, .table th{
    vertical-align: middle;
}
</style>
