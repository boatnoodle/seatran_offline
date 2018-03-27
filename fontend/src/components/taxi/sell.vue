<template>
    <div>
        <h3 class="text-center">ระบบออกตั๋ว TAXI {{ data._id }}</h3>
        <div class="row">
            <div class="col-sm-8">
                <div class="card">
                    <div class="card-header text-white bg-primary">
                        หน้าจอขาย
                    </div>
                    <div class="card-body">
                        <form v-on:submit.prevent="submit">
                            <div class="form-group">
                                <label>เลือกประเภท</label>
                                <select v-model="selectTypeNamePassenger" class="form-control">
                                    <option value="cash">Cash</option>
                                    <option value="defineName">ระบุชื่อผู้โดยสาร</option>
                                </select>
                            </div>
                            <div v-show="selectTypeNamePassenger == 'defineName'" class="form-group">
                                <label>ชื่อผู้โดยสาร</label>
                                <input type="text" ref="namePassenger" v-model="data.namePassenger" class="form-control" placeholder="กรุณากรอกชื่อผู้โดยสาร">
                            </div>
                            <div class="form-group">
                                <label>จุดส่ง</label>
                                <select class="form-control" v-model="selectRoute">
                                    <option value="">กรุณาเลือกจุดส่ง</option>
                                    <option v-for="(data,index) in getAllRouteTaxi"  :key="index" :value="data._id">{{ data.nameRoute }}</option>
                                </select>
                            </div>
                            <div class="form-group">
                                <label>ประเภทรถ</label>
                                <select class="form-control" v-model="data.typeCar">
                                    <option value="">กรุณาเลือกประเภทรถ</option>
                                    <option value="Limousine">รถยนต์</option>
                                    <option value="Mini bus">รถตู้</option>
                                </select>
                            </div>
                            <div v-show="data.typeCar == 'Mini bus'" class="form-group">
                                <label>ประเภท</label>
                                <select class="form-control" v-model="selectJoinVan">
                                    <option value="false">เหมา</option>
                                    <option value="true">Join</option>
                                </select>
                            </div>
                            <div class="form-group">
                                <div class="form-row">
                                    <div class="col-sm-6">
                                        <label>ราคา</label>
                                        <input type="text" v-model="data.price" class="form-control" placeholder="ราคา">
                                    </div>
                                    <div class="col-sm-6">
                                        <label>จำนวนผู้โดยสาร</label>
                                        <input type="text" v-model="data.amount" class="form-control" placeholder="กรุณาระบุจำนวนผู้โดยสาร">
                                    </div>
                                </div>
                            </div>
                                <div class="form-group">
                                <label>ราคารวมทั้งสิ้น</label>
                                <input type="text" v-model="total" class="form-control" placeholder="ราคารวม" readonly>
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
                            <th scope="col">รหัสตั๋ว</th>
                            <th scope="col">ชื่อผู้โดยสาร</th>
                            <th scope="col">จุดส่ง</th>
                            <th scope="col">ราคารวม</th>
                            <th>ยกเลิก</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(data,index) in getTicketTaxiLasted" :key="index">
                            <th>{{ data._id }}</th>
                            <th>{{ data.namePassenger }}</th>
                            <th>{{ data.destination.nameRoute }}</th>
                            <th>{{ data.total }}</th>
                            <th><button @click="modalCancel" class="btn btn-danger btn-sm">ยกเลิก</button></th>
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
                                        <h4 style="border: 1px solid; padding: 30px;">TRANSFER VOUCHER</h4>
                                        <p id="realTime"></p>
                                        <p style="text-align: right; font-weight: bold;">No. {{ data._id }}</p>
                                        <div class="content">
                                        <div>
                                            <span style="font-weight: bold;">Name : </span>
                                            <div style="text-align: left">{{ data.namePassenger || '-' }}</div>
                                        </div>
                                        <div>
                                            <span style="font-weight: bold;">Destination : </span>
                                            <div style="text-align: left">{{ nameRoute || '-' }}</div>
                                        </div>
                                        <div>
                                            <span style="font-weight: bold;">Price : </span>
                                            <span style="float: right">{{ data.price || '-' }}</span>
                                        </div>
                                        <div>
                                            <span style="font-weight: bold;">No. of Passenger : </span>
                                            <span style="float: right">{{ data.amount || '-' }}</span>
                                        </div>
                                            <div>
                                            <span style="font-weight: bold;">Type car : </span>
                                            <span style="float: right">{{ data.typeCar || '-' }}</span>
                                        </div>
                                        <div>
                                            <span style="font-weight: bold;">Remark : </span>
                                            <span style="float: right">{{ data.remark || '-' }}</span>
                                        </div>
                                        <hr style="border: 1px dotted;">
                                        <div>
                                            <span style="font-weight: bold;">Total : </span>
                                            <span style="float: right">{{ data.total || '-' }}</span>
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
        <!-- Modal cancel -->
        <div ref="modalCancel" class="modal" tabindex="-1" role="dialog">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header text-white bg-info">
                        <h5 class="modal-title">ยกเลิกตั๋ว</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <form v-on:submit.prevent="submit">
                            <div class="form-group">
                                <label>หมายเหตุ</label>
                                <input type="text" v-model="data.username" class="form-control" placeholder="กรุณาระบุหมายเหตุการยกเลิก" required>
                            </div>
                            <div class="text-center">
                                <button type="submit" class="btn btn-info btn-sm">บันทึก</button>
                                <button type="button" class="btn btn-default btn-sm"  data-dismiss="modal" aria-label="Close">ยกเลิก</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import moment from 'moment'
import Jquery from 'jquery'
import printJS from 'print-js'
import axios from 'axios'

export default {
    data(){
        return {
            data: {
                _id: '',
                namePassenger: 'cash',
                destination: '',
                price: '',
                amount: '',
                total: '',
                typeCar: '',
                remark: ''
            },
            selectTypeNamePassenger: 'cash',
            selectRoute: '',
            selectJoinVan: 'false',
            nameRoute: '',
            realTime: '',
            routeTaxi: [],
            priceTaxk: '',
            priceVan: '',
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
            return this.data._id = "TX" + prefix + id 
           
        },
        submit(){
            this.$store.dispatch('addTaxiTicketRealTime',this.data)
            .then(() => {
                moment.locale('en');
                Jquery('#realTime').text(moment(new Date()).format('MM/DD/YYYY, h:mm:ss a'))
                if(this.statusPrint){
                    for(let i = 0; i< this.amountPrint; i++){
                        // console.log('time')
                        window.print()
                    }
                }
                this.selectTypeNamePassenger = 'cash'
                this.data.namePassenger =  'cash',
                this.data.destination =  '',
                this.data.price =  '',
                this.data.amount =  '',
                this.data.total =  '',
                this.data.typeCar =  '',
                this.data.remark =  '',
                this.selectRoute = '',
                this.nameRoute= ''
                this.$store.dispatch('getLastTaxiTicket').then(() => {
                    const lastedId = this.getLastTaxiTicket._id
                    this.genIdTicket(lastedId)
                })
                this.$store.dispatch('getTaxiTicketLasted')
            })
        },
        modalCancel(){
            $(this.$refs.modalCancel).modal('toggle')
        }
    },
    computed: {
        getAllRouteTaxi(){
            return this.routeTaxi =  this.$store.getters.getAllRouteTaxi
        },
        getTicketTaxiLasted(){
            return this.$store.getters.getTaxiTicketLasted
        },
        total(){
            var total = 0
            if(this.data.price != '' &&  this.data.amount != '' && this.data.typeCar == 'Mini bus' && this.selectJoinVan == 'true'){
                var total = this.data.price * this.data.amount
            }else if(this.data.price != '' && this.data.amount != ''){
                var total = this.data.price
            }   
            this.data.total = total
            return total
        },
        getLastTaxiTicket(){
            return this.$store.getters.getLastTaxiTicket
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
        selectRoute(val){
            if(val != '' && val != undefined){
                const obj = this.routeTaxi.find(v => v._id == val)
                this.data.typeCar = ''
                this.data.price = ''
                this.nameRoute = obj.nameRoute
                this.data.destination = obj._id
                this.priceTaxi = obj.priceTaxi
                this.priceVan = obj.priceVan
            }
        },
        'data.typeCar'(val){
            if(val != '' &&  val != undefined){
                if(val == 'Limousine'){
                    this.data.price = this.priceTaxi
                }else{
                    this.data.price = this.priceVan         
                }
            }
        },
        selectTypeNamePassenger(val){
            if(val == 'defineName'){
                this.data.namePassenger = ''
                this.$nextTick(() => this.$refs.namePassenger.focus())
            }else{
                this.data.namePassenger = 'cash'
            }
        }
    },
    created(){
        this.getPrintSetting // get print setting (statusPrint , amountPrint)
        this.getTicketTaxiLasted
        this.getBillHead
        this.$store.dispatch('getTaxiTicketLasted')
        this.$store.dispatch('getAllRouteTaxi')
        this.$store.dispatch('getLastTaxiTicket').then(() => {
            var lastId = this.getLastTaxiTicket
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
