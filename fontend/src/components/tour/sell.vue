<template>
    <div>
        <!-- <div class="boxSell"> -->
            <!-- <router-link to="/" tag="div" class="close"><i class="fa fa-times"></i></router-link> -->
            <!-- <div class="container"> -->
                <h3 class="text-center">ระบบออกตั๋ว TOUR {{ data._id }}</h3>
                <div class="row">
                    <div class="col-sm-8">
                        <div class="card">
                            <div class="card-header text-white bg-danger">
                                หน้าจอขาย
                            </div>
                            <div class="card-body">
                                <form v-on:submit.prevent="submit">
                                    <div class="form-group">
                                        <label>เลือกประเภท</label>
                                        <select v-model="selectTypeName" class="form-control">
                                            <option value="cash">Cash</option>
                                            <option value="defineName">ระบุชื่อ-นามสกุล</option>
                                        </select>
                                    </div>
                                    <div v-show="selectTypeName == 'defineName'" class="form-group">
                                        <label>ชื่อ-นามสกุล</label>
                                        <input type="text" ref="name" v-model="data.name" class="form-control" placeholder="ชื่อ-นามสกุล">
                                    </div>
                                    <div class="form-group">
                                        <label>บริษัท</label>
                                        <select v-model="selectAgent" class="form-control">
                                            <option value="">กรุณาเลือกบริษัท</option>
                                            <option v-for="(data,index) in getTour" :key="index" :value="data._id">{{ data.nameAgent }}</option>
                                        </select>
                                    </div>
                                    <div class="form-group">
                                        <label>รายการทัวร์</label>
                                        <select v-model="selectTour" class="form-control">
                                            <option value="">กรุณาเลือกรายการทัวร์</option>
                                            <option v-for="(data,index) in tourList" :key="index" :value="data._id">{{ data.nameTour }}</option>
                                        </select>
                                    </div>
                                    <div class="form-group">
                                        <div class="form-row">
                                            <div class="col-sm-6">
                                                <label>ราคา</label>
                                                <input type="text" v-model="data.price" class="form-control" placeholder="ราคา">
                                            </div>
                                            <div class="col-sm-6">
                                                <label>จำนวนคน</label>
                                                <input type="text" v-model="data.amount" class="form-control" placeholder="ระบุจำนวนคน">
                                            </div>
                                        </div>
                                    </div>
                                     <div class="form-group">
                                        <label>ราคารวมทั้งสิ้น</label>
                                        <input type="text" v-model="total" readonly class="form-control" placeholder="ราคารวม">
                                    </div>
                                    <div class="form-group">
                                        <label>Voucher</label>
                                        <input type="text" v-model="data.voucher" class="form-control" placeholder="กรุณาระบุหมายเลข Voucher">
                                    </div>
                                    <div class="form-group">
                                        <label>หมายเหตุ</label>
                                        <textarea cols="30" v-model="data.remark" rows="5" class="form-control" placeholder="ระบุหมายเหตุ"></textarea>
                                    </div>
                                    <div class="text-center">
                                        <button type="submit" class="btn btn-primary">บันทึก</button>
                                        <button type="reset" class="btn btn-danger">ยกเลิก</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                        <h3 style="margin-top: 20px;" class="text-center">รายการขายล่าสุด</h3>
                        <table class="table table-sm table-hover text-center">
                            <thead class="text-white bg-info">
                                <tr>
                                <th scope="col">#</th>
                                <th scope="col">ชื่อ</th>
                                <th scope="col">จำนวนคน</th>
                                <th scope="col">ราคารวม</th>
                                <th>หมายเหตุ</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(data,index) in getTourTicketLasted" :key="index">
                                    <th>{{ index+1 }}</th>
                                    <th>{{ data.name }}</th>
                                    <th>{{ data.amount }}</th>
                                    <th>{{ data.total }}</th>
                                    <th>{{ data.remark || '-' }}</th>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div class="col-sm-4">
                        <div class="row">
                            <div class="col-sm-12">
                                <div class="card">
                                    <div class="card-header text-white bg-info">
                                        ราคารวมทั้งสิ้น
                                    </div>
                                    <div class="card-body">
                                        <div class="boxShowTotal bg-dark">{{ total }}</div>
                                    </div>
                                </div>
                            </div>
                             <div class="col-sm-12" style="margin-top: 20px;">
                                <div class="card">
                                    <div class="card-header text-white bg-success">
                                        ตัวอย่างใบเสร็จ
                                    </div>
                                    <div class="card-body">
                                       <div class="exReceipt">
                                           <div id="section-to-print2">
                                            <h4 style="border: 1px solid; padding: 30px;">TOUR VOUCHER</h4>
                                            <h3>{{ billHead }}</h3>
                                                <p id="realTime"></p>
                                            <p></p>
                                            <p style="text-align: right; font-weight: bold;">No. {{ data._id }}</p>
                                                <div class="content">
                                                <div>
                                                    <span style="font-weight: bold;">Name : </span>
                                                    <div style="text-align: left">{{ data.name || '-'  }}</div>
                                                </div>
                                                <div>
                                                    <span style="font-weight: bold;">Agent : </span>
                                                    <span style="float: right">{{ nameAgent || '-' }}</span>
                                                </div>
                                                <div>
                                                    <span style="font-weight: bold;">Tour : </span>
                                                    <span style="float: right">{{ nameTour || '-' }}</span>
                                                </div>
                                                <div>
                                                    <span style="font-weight: bold;">Price : </span>
                                                    <span style="float: right">{{ data.price || '-' }}</span>
                                                </div>
                                                <div>
                                                    <span style="font-weight: bold;">No of Person (s) : </span>
                                                    <span style="float: right">{{ data.amount || '-' }}</span>
                                                </div>
                                                <div>
                                                    <span style="font-weight: bold;">Voucher : </span>
                                                    <span style="float: right">{{ data.voucher || '-' }}</span>
                                                </div>
                                                <div>
                                                    <span style="font-weight: bold;">Remark. : </span>
                                                    <span style="float: right">{{ data.remark || '-' }}</span>
                                                </div>
                                                <hr style="border: 1px dotted;">
                                                <div>
                                                    <span style="font-weight: bold;">Total : </span>
                                                    <span style="float: right">{{ total }}</span>
                                                </div>
                                                </div>
                                                <div style="margin-top: 40px;">
                                                    <h6 id="billFoot"></h6>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            <!-- </div> -->
        <!-- </div> -->
    </div>
</template>
<script>
import printJS from 'print-js'
import moment from 'moment'
import Jquery from 'jquery'
import axios from 'axios'
export default {
   data(){
        return {
            data: {
                _id: '',
                name: 'cash',
                agent: '',
                tour: '',
                price: '',
                amount: '',
                total: '',
                voucher: '',
                remark: ''
            },
            selectTypeName: 'cash',
            selectAgent: '',
            nameAgent: '',
            selectTour: '',
            nameTour: '',
            realTime: '',
            tour: [],
            tourList: [],
            billHead: '',
            billFoot: '',
            statusPrint: '',
            amountPrint: ''
        }
    },
    methods: {
        genIdTicket(lastId){
            // lastId = "001" fortest
            var prefix = moment().format('Y') + moment().format('MM')
            if(lastId){
                var lastId = lastId.substr(-4)
                var newId = '000' + (parseInt(lastId) + 1)
                var id = newId.substr(-4)
            }else{
                var id = '0001'
            }
            return this.data._id =  "TR" + prefix + id
           
        },
        submit(){
            this.$store.dispatch('addTourTicket',this.data)
            .then(() => {
                moment.locale('en');
                Jquery('#realTime').text(moment(new Date()).format('MM/DD/YYYY, h:mm:ss a'))
                if(this.statusPrint){
                    for(let i = 0; i< this.amountPrint; i++){
                        // console.log('time')
                        window.print()
                    }
                }
                this.genIdTicket(this.data._id)
                this.selectTypeName = 'cash'
                this.data.name = 'cash',
                this.data.agent = '',
                this.data.tour = '',
                this.data.price = '',
                this.data.amount = '',
                this.data.total = '',
                this.data.voucher = '',
                this.data.remark = ''
                this.selectAgent = '',
                this.nameAgent = '',
                this.selectTour = '',
                this.nameTour = '',
                this.$store.dispatch('getTourTicketLasted')
            })
        }
    },
    computed: {
        getTour(){
            return this.tour =  this.$store.getters.getTour
        },
        getTourTicketLasted(){
            return this.$store.getters.getTourTicketLasted
        },
        total(){
            var total = 0
            if(this.data.price != '' &&  this.data.amount != ''){
                var total = this.data.price * this.data.amount
            }   this.data.total = total
            return total
        },
        getLastTourTicket(){
            return this.$store.getters.getLastTourTicket
        },
        getBillHead(){
            this.$store.dispatch('getBillHead')
            .then(() => {
                const obj = this.$store.getters.getBillHead
                this.billHead = obj.billHead
                this.billFoot = obj.billFoot
                $("#billFoot").html(obj.billFoot)
            })
        },
        getPrintSetting(){
            this.$store.dispatch('getPrintSetting')
            .then(() => {
                const obj = this.$store.getters.getPrintSetting
                this.statusPrint = obj.statusPrint
                this.amountPrint = obj.amountPrint
            })
            
        }
    },
    watch: {
        selectAgent(val){
            if(val != '' && val != undefined){
                const obj = this.tour.find(v => v._id == val)
                this.data.agent = obj._id
                this.tourList = obj.tour
                this.nameAgent = obj.nameAgent
            }else{
                this.data.agent = ''
                this.tourList = []
                this.nameAgent = ''
                this.selectTour = ''
            }
        },
        selectTour(val){
            if(val != '' && val != undefined){
                const obj = this.tourList.find(v=> v._id == val)
                this.data.tour = obj._id
                this.data.price = obj.priceTour
                this.nameTour = obj.nameTour
            }else{
                this.nameTour = ''
                this.data.price = ''
            }
        },
        selectTypeName(val){
            if(val == 'defineName'){
                this.data.name = ''
                this.$nextTick(() => this.$refs.name.focus())
                
            }else{
                this.data.name = 'cash'
            }
        }
    },
    created(){
        this.getPrintSetting // get print setting (statusPrint , amountPrint)
        this.getBillHead
        this.$store.dispatch('getTourTicketLasted')
        this.$store.dispatch('getTour')
        this.$store.dispatch('getLastTourTicket').then(() => {
            var lastId = this.getLastTourTicket
            if(lastId){
                this.genIdTicket(lastId._id)
            }else{
                this.genIdTicket()
            }
        })
    }
}
</script>
<style scoped>
    .boxSell{
        background: white;
        width: 100%;
        min-height: 100vh;
        position: absolute;
        top: 0;
        left: 0;
    }
    .close{
        position: absolute;
        right: 10px;
        top: 10px;
    }
    .boxShowTotal{
        text-align: right;
        padding: 10px;
        font-size: 4em;
        color: white;
    }
     .exReceipt{
        width: 100%;
        border: 1px solid;
        margin: 0 auto;
        padding: 50px;
        text-align: center;
    }
    .exReceipt .content{
        text-align: left;
    }
</style>
