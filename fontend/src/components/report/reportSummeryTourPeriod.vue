<template>
    <div>
        <h3 class="text-center">รายงานสรุปทัวร์ประจำช่วง</h3>
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
                <table class="table table-sm table-bordered table-hover text-center">
                    <thead>
                        <tr>
                            <th class="text-left" width="40%">ชื่อทัวร์</th>
                            <th>ราคา</th>
                            <th>จำนวน</th>
                            <th>ราคารวม</th>
                        </tr>
                    </thead>
                    <tbody v-for="(data,index) in dataReady" :key="index">
                        <tr>
                            <th class="text-left" colspan="5">{{ data.nameAgent }}</th>
                        </tr>
                        <template v-for="data in data.tour">
                            <tr :key="data._id">
                                <td class="text-left">{{ data.nameList }}</td> 
                                <td>{{ data.priceList }}</td> 
                                <td>{{ data.totalAmountList }}</td> 
                                <td>{{ data.totalPriceList }}</td> 
                            </tr>
                        </template>
                        <tr>
                            <th>Sub Total</th>
                            <th>{{ data.totalPriceList || 0 }}</th>
                            <th>{{ data.totalAmount || 0 }}</th>
                            <th>{{ data.totalPrice || 0}}</th>
                        </tr>
                    </tbody>
                     <tfoot>
                        <tr>
                            <th>Grand Total</th>
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
                dateTo: ''
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
        manipulate(){ // เหี้ยมาก ยอมรับ โปรเจคหน้าขอแก้ตัว ผิดพลาด ตรงการ ดึงยังดึงไม่ดี ทำให้ต้อง ปรับแต่งก่อนนำใช้ เยอะมาก อาจำทให้ตอนดึงช้าขึ้น ToT
            this.dataReady = []
            this.total = {
                'totalAmount': 0,
                'totalPrice': 0,
                'total': 0
            }
            
            this.dataTable.forEach(element => {
                let data = {
                    'nameAgent': element.detailAgentTour[0].nameAgent,
                    'tour': [],
                    'totalAmount': 0,
                    'totalPrice': 0
                }
                element.tour.forEach(val => {
                     element.detailAgentTour[0].tour.forEach(x => {
                        if(val._id == x._id){
                            let tourList = {
                                _id: val._id,
                                nameList: x.nameTour,
                                priceList: x.priceTour,
                                totalAmountList: val.totalAmount,
                                totalPriceTour: val.totalPrice
                            }
                            console.log(tourList.priceList)
                            data.totalPriceList += parseInt(tourList.priceList)
                            data.totalAmount += tourList.totalAmountList
                            data.totalPrice += tourList.totalPriceTour
                            data.tour.push(tourList)
                            console.log(data.totalPriceList)
                        }
                    })
                })
                this.total.totalPriceList += data.totalPriceList
                this.total.totalAmount += parseInt(data.totalAmount)
                this.total.totalPrice += parseInt(data.priceTour)
                this.total.total += parseInt(data.totalPrice)
                this.dataReady.push(data)
            });
            // console.log(this.dataReady)
        }
    }
}
</script>
<style scoped>
.table td, .table th{
    vertical-align: middle;
}
</style>
