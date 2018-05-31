<template>
    <div id="section-to-print">
        <h3 id="titlePrint" class="text-center">รายงานทัวร์ประจำช่วง</h3>
        <form v-on:submit.prevent="submit" class="no-print">
            <div class="form-group row">
                <div class="text-right col-sm-2">จากวันที่</div>
                <input type="date" v-model="data.dateFrom" class="form-control col-sm-3" required>
                <div class="text-right col-sm-2">ถึงวันที่</div>
                <input type="date" v-model="data.dateTo" class="form-control col-sm-3" required>
                <button type="submit" class="btn btn-info btn-sm">ค้นหา</button>
            </div>
        </form>
        <h6 class="titleDatePrint text-center">รายงานประจำวันที่: {{data.dateFrom || '-'}} ถึง {{data.dateTo || '-'}}</h6>
        <div class="row no-print" style="margin-bottom: 15px;">
            <div class="col-sm-12 text-right">
                <button id="notPrint" type="button" @click="printReport" class="btn btn-default"><i class="fa fa-print"></i> พิมพ์</button>
            </div>
        </div>
        <div class="row no-print">
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
                            <th rowspan="2">รหัส</th>
                            <th rowspan="2">ชื่อ</th>
                            <th rowspan="2">ตัวแทนขาย</th>
                            <th colspan="2">จำนวน</th>
                            <th colspan="2">Full Rate</th>
                            <th colspan="2">Net Rate</th>
                            <th colspan="2">รวม</th>
                        </tr>
                        <tr>
                          <th>ADL</th>
                          <th>CHD</th>
                          <th>ADL</th>
                          <th>CHD</th>
                          <th>ADL</th>
                          <th>CHD</th>
                          <th>Full</th>
                          <th>Net</th>
                        </tr>
                    </thead>
                    <tbody>
                        <template v-for="titleAgent in getTitleAgent">
                            <tr class="text-left" :key="titleAgent">
                                <th colspan="11"><b>{{ titleAgent }}</b></th>
                            </tr>
                            <template v-for="(data,index) in tourTicket">
                                <tr v-if="titleAgent == data.agent.nameAgent" :key="titleAgent + index + index">
                                    <td>{{ data._id }}</td>
                                    <td>{{ data.tour.nameTour }}</td>
                                    <td>{{ data.agent.nameAgent }}</td>
                                    <td>{{ formatComma(data.amountAdult )}}</td>
                                    <td>{{ formatComma(data.amountChild )}}</td>
                                    <td>{{ formatComma(data.tour.priceAdult )}}</td>
                                    <td>{{ formatComma(data.tour.priceChild )}}</td>
                                    <td>{{ formatComma(data.tour.netPriceAdult )}}</td>
                                    <td>{{ formatComma(data.tour.netPriceChild )}}</td>
                                    <td>{{ formatComma((data.tour.priceAdult * data.amountAdult) + (data.tour.priceChild * data.amountChild) || '-' )}}</td>
                                    <td>{{ formatComma((data.tour.netPriceAdult * data.amountAdult) + (data.tour.netPriceChild * data.amountChild) || '-' )}}</td>
                                </tr>
                            </template>
                            <tr :key="'subTotal'+titleAgent">
                                <td colspan="3">Sub Total</td>
                                <td>{{ formatComma( subTotals[titleAgent].amountAdult || 0) }}</td>
                                <td>{{ formatComma( subTotals[titleAgent].amountChild || 0) }}</td>
                                <td>{{ formatComma( subTotals[titleAgent].fullRateAdult || 0) }}</td>
                                <td>{{ formatComma( subTotals[titleAgent].fullRateChild || 0) }}</td>
                                <td>{{ formatComma( subTotals[titleAgent].netPriceAdult || 0) }}</td>
                                <td>{{ formatComma( subTotals[titleAgent].netPriceChild || 0) }}</td>
                                <td>{{ formatComma( subTotals[titleAgent].fullRate || 0) }}</td>
                                <td>{{ formatComma( subTotals[titleAgent].netRate || 0) }}</td>
                            </tr>
                        </template>
                    </tbody>
                    <tfoot>
                        <tr>
                            <th colspan="3" style="font-size: 20px;">Total</th>
                            <th>{{ formatComma(objTotal.totalAmountAdult || 0 ) }}</th>
                            <th>{{ formatComma(objTotal.totalAmountChild || 0 ) }}</th>
                            <th>{{ formatComma(objTotal.totalPriceAdult || 0 ) }}</th>
                            <th>{{ formatComma(objTotal.totalPriceChild || 0 ) }}</th>
                            <th>{{ formatComma(objTotal.totalNetPriceAdult || 0 ) }}</th>
                            <th>{{ formatComma(objTotal.totalNetPriceChild || 0 ) }}</th>
                            <th>{{ formatComma(objTotal.total || 0  ) }}</th>
                            <th>{{ formatComma(objTotal.totalNet || 0 ) }}</th>
                        </tr>
                    </tfoot>
                </table>
                <div style="float: right; font-weight: bold; text-align: right">
                    <p>รวม Full Rate : {{ formatComma(objTotal.total || 0) }} บาท || รวม Net Rate : {{ formatComma(objTotal.totalNet || 0) }} บาท</p>
                    <p>ส่วนแบ่งกำไร Full Rate ({{ percentTour * 100 }}%) : {{ formatComma(objTotal.feeFullRate || 0) }} บาท || ส่วนแบ่งกำไร Net Rate ({{ percentTour * 100 }}%) : {{ formatComma(objTotal.feeNetRate || 0) }} บาท</p>
                    <p>คงเหลือหลังหักส่วนแบ่ง Full Rate : {{ formatComma(objTotal.grandTotalFullRate || 0) }} บาท || คงเหลือหลังหักส่วนแบ่ง Net Rate : {{ formatComma(objTotal.grandTotalNetRate || 0) }} บาท</p>
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
            subTotals: [],
            dateToday: moment().locale('th').format("Do MMM YYYY"),
            searchKey: '',
            objTotal: {},
            percentTour: ''
        }
    },
    methods: {
        submit(){
            this.$store.dispatch('getTourTicketByDate',this.data)
            .then(() => {
                this.subTotals = []
                this.getTourTicketByDate();
                this.getSubTotal()
            })
        },
        dateFormat(date){
            return moment(date).format('D/MM/YYYY')
        },
        printReport(){
            window.print();
        },
        getTourTicketByDate() {
            this.dataTable = this.$store.getters.getTourTicketByDate;
            return this.dataTable;
        },
        formatComma(x) {
            return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        },
        getSubTotal(target,obj){
            this.dataTable.forEach(data => {
                if(this.subTotals[data.agent.nameAgent] == undefined){
                    this.subTotals[data.agent.nameAgent] = {
                        amountAdult: 0,
                        amountChild: 0,
                        fullRateAdult: 0,
                        fullRateChild: 0,
                        netPriceAdult: 0,
                        netPriceChild: 0,
                        fullRate: 0,
                        netRate: 0
                    }
                }
               
                this.subTotals[data.agent.nameAgent].amountAdult += data.amountAdult
                this.subTotals[data.agent.nameAgent].amountChild += data.amountChild
                this.subTotals[data.agent.nameAgent].fullRateAdult += data.tour.priceAdult
                this.subTotals[data.agent.nameAgent].fullRateChild += data.tour.priceChild
                this.subTotals[data.agent.nameAgent].netPriceAdult += data.tour.netPriceAdult
                this.subTotals[data.agent.nameAgent].netPriceChild += data.tour.netPriceChild
                this.subTotals[data.agent.nameAgent].fullRate += (data.tour.priceAdult * data.amountAdult) + (data.tour.priceChild * data.amountChild)
                this.subTotals[data.agent.nameAgent].netRate += (data.tour.netPriceAdult * data.amountAdult) + (data.tour.netPriceChild * data.amountChild)
            });
            
        }
    },
    computed: {
        tourTicket() {
            return this.dataTable.filter(v => {
                return (
                v._id.match(this.searchKey) ||
                v.name.match(this.searchKey) ||
                v.nameAgent.match(this.searchKey) ||
                v.tour.nameTour.match(this.searchKey)
                );
            });
        },
        getPercentTour(){
            this.$store.dispatch('getPercent')
            .then(() => {
                const obj = this.$store.getters.getPercent
                this.percentTour = obj.percentTour / 100
            })
        },
        getTitleAgent(){
            const titleGroup = [...new Set(this.dataTable.map(item => item.agent.nameAgent))];
            return titleGroup
        }
    },
    watch: {
         tourTicket(val) {
            if (val.length > 0) {
                var totalAmountAdult = val.reduce((a, b) => parseInt(a) + parseInt(b.amountAdult),0);
                var totalAmountChild = val.reduce((a, b) => parseInt(a) + parseInt(b.amountChild),0);
                var totalPriceAdult = val.reduce((a, b) => parseInt(a) + parseInt(b.tour.priceAdult),0);
                var totalPriceChild = val.reduce((a, b) => parseInt(a) + parseInt(b.tour.priceChild),0);
                var totalNetPriceAdult = val.reduce((a, b) => parseInt(a) + parseInt(b.tour.netPriceAdult),0);
                var totalNetPriceChild = val.reduce((a, b) => parseInt(a) + parseInt(b.tour.netPriceChild),0);
                var total = val.reduce((a, b) => parseInt(a) + parseInt((b.tour.priceAdult * b.amountAdult) + (b.tour.priceChild * b.amountChild)),0);
                var totalNet = val.reduce((a, b) => parseInt(a) + parseInt((b.tour.netPriceAdult * b.amountAdult) + (b.tour.netPriceChild * b.amountChild)),0);
                
                this.objTotal = {
                totalAmountAdult: totalAmountAdult,
                totalAmountChild: totalAmountChild,
                totalPriceAdult: totalPriceAdult,
                totalPriceChild: totalPriceChild,
                totalNetPriceAdult: totalNetPriceAdult,
                totalNetPriceChild: totalNetPriceChild,
                total: total,
                totalNet: totalNet,
                feeFullRate: total * this.percentTour,
                feeNetRate: totalNet * this.percentTour,
                grandTotalFullRate: total - (total * this.percentTour),
                grandTotalNetRate: totalNet - (totalNet * this.percentTour)
                };
            } else {
                this.objTotal = {
                totalAmountAdult: 0,
                totalAmountChild: 0,
                totalPriceAdult: 0,
                totalPriceChild: 0,
                totalNetPriceAdult: 0,
                totalNetPriceChild: 0,
                total: 0,
                totalNet: 0,
                feeFullRate: 0,
                feeNetRate: 0,
                grandTotalFullRate: 0,
                grandTotalNetRate: 0
                };
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
