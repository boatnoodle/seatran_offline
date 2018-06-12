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
                                            <div class="col-sm-4">
                                                <label>จำนวนผู้ใหญ่</label>
                                                <input type="number" v-model="data.amountAdult" class="form-control" placeholder="ระบุจำนวนผู้ใหญ่">
                                            </div>
                                            <div class="col-sm-4">
                                                <label>Full Rate <span style="color: red;">x {{ data.amountAdult }} = {{ data.tour.priceAdult * data.amountAdult }}</span></label>
                                                <input type="number" v-model="data.tour.priceAdult" class="form-control" placeholder="ระบุราคา Full Rate">
                                            </div>
                                            <div class="col-sm-4">
                                                <label>Net Rate <span style="color: red;">x {{ data.amountAdult }} = {{ data.tour.netPriceAdult * data.amountAdult }}</span></label>
                                                <input type="number" v-model="data.tour.netPriceAdult" class="form-control" placeholder="ระบุราคา Net Rate">
                                            </div>
                                        </div>
                                        <div class="form-row">
                                            <div class="col-sm-4">
                                                <label>จำนวนเด็ก</label>
                                                <input type="number" v-model="data.amountChild" class="form-control" placeholder="ระบุจำนวนเด็ก">
                                            </div>
                                            <div class="col-sm-4">
                                                <label>Full Rate <span style="color: red;">x {{ data.amountChild }} = {{ data.tour.priceChild * data.amountChild }}</span></label>
                                                <input type="number" v-model="data.tour.priceChild" class="form-control" placeholder="ระบุราคา Full Rate">
                                            </div>
                                            <div class="col-sm-4">
                                                <label>Net Rate <span style="color: red;">x {{ data.amountChild }} = {{ data.tour.netPriceChild * data.amountChild }}</span></label>
                                                <input type="number" v-model="data.tour.netPriceChild" class="form-control" placeholder="ระบุราคา Net Rate">
                                            </div>
                                        </div>
                                        <div class="form-row">
                                            <div class="col-sm-4">
                                                <label>จำนวนรวม</label>
                                                <input readonly type="number" :value="parseInt(data.amountAdult || 0) + parseInt(data.amountChild || 0)" class="form-control" placeholder="ราคา">
                                            </div>
                                            <div class="col-sm-4">
                                                <label>Full Rate Total</label>
                                                <input readonly type="number" :value="(parseInt(data.tour.priceChild || 0) * data.amountChild) + (parseInt(data.tour.priceAdult || 0) * data.amountAdult)" class="form-control" placeholder="ระบุจำนวนคน">
                                            </div>
                                            <div class="col-sm-4">
                                                <label>Net Rate Total</label>
                                                <input readonly type="number" :value="(parseInt(data.tour.netPriceChild || 0) * data.amountChild) + (parseInt(data.tour.netPriceAdult || 0) * data.amountAdult)" class="form-control" placeholder="ระบุจำนวนคน">
                                            </div>
                                        </div>
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
                        <table id="tableTourRecent" class="table table-sm table-hover text-center">
                            <thead class="text-white bg-info">
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">ชื่อทัวร์</th>
                                    <th scope="col">ชื่อผู้โดยสาร</th>
                                    <th scope="col">จำนวนผู้ใหญ่</th>
                                    <th scope="col">จำนวนเด็ก</th>
                                    <th>จำนวนรวม</th>
                                    <th>ยกเลิก</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(data,index) in getTourTicketLasted" :key="index">
                                    <th>{{ data._id }}</th>
                                    <th>{{ data.tour.nameTour }}</th>
                                    <th>{{ data.name }}</th>
                                    <th>{{ data.amountAdult || 0 }}</th>
                                    <th>{{ data.amountChild || 0 }}</th>
                                    <th>{{ data.amountAdult +  data.amountChild }}</th>
                                    <th>
                                        <div v-if="data.statusTicket == 99" style="color: red; font-weight: bold">ยกเลิก</div>
                                        <button v-else @click="modalCancel(data._id)" class="btn btn-danger btn-sm">ยกเลิก</button>
                                    </th>
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
                                    <h4 style="margin: 10px;">Full Rate Total</h4>
                                    <div class="card-body">
                                        <div class="boxShowTotal bg-dark">{{ (parseInt(data.tour.priceChild || 0) * data.amountChild) + (parseInt(data.tour.priceAdult || 0) * data.amountAdult) }}</div>
                                    </div>
                                    <h4 style="margin-left: 10px;">Net Rate Total</h4>
                                    <div class="card-body">
                                        <div class="boxShowTotal bg-dark">{{ (parseInt(data.tour.netPriceChild || 0) * data.amountChild) + (parseInt(data.tour.netPriceAdult || 0) * data.amountAdult) }}</div>
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
                                           <div id="section-to-print">
                                            <h4 style="border: 1px solid; padding: 30px;">TOUR VOUCHER</h4>
                                            <img :src="logo" width="100%" alt="" style="margin: 15px 0;">
                                            <h5 id="detailTitleBill" style="line-height: 0.8; text-align: left;"></h5>
                                            <p id="realTime"></p>
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
                                                        <span style="float: right">{{ data.tour.nameTour || '-' }}</span>
                                                    </div>
                                                     <div>
                                                        <span style="font-weight: bold;">Adults : </span>
                                                        <span>{{ data.amountAdult || '-' }}</span>
                                                        <span style="float: right;">{{ data.tour.priceAdult || '-' }}</span>
                                                        <span style="font-weight: bold; float: right;">Price : </span>
                                                    </div>
                                                    <div>
                                                        <span style="font-weight: bold;">Children : </span>
                                                        <span>{{ data.amountChild || '-' }}</span>
                                                        <span style="float: right">{{ data.tour.priceChild || '-' }}</span>
                                                        <span style="font-weight: bold; float: right;">Price : </span>
                                                    </div>
                                                    <div>
                                                        <span style="font-weight: bold;">Total : </span>
                                                        <span>{{ parseInt(data.amountAdult || 0) +  parseInt(data.amountChild || 0)|| '-' }}</span>
                                                        <!-- <span style="float: right">{{ (parseInt(data.tour.priceChild || 0) * data.amountChild) + (parseInt(data.tour.priceAdult || 0) * data.amountAdult) || '-' }}</span>
                                                        <span style="font-weight: bold; float: right;">Total : </span> -->
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
                                                        <span style="float: right">{{ (parseInt(data.tour.priceChild || 0) * data.amountChild) + (parseInt(data.tour.priceAdult || 0) * data.amountAdult) || '-' }}</span>
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
                                <form v-on:submit.prevent="cencelTicket">
                                    <div class="form-group">
                                        <label>หมายเหตุ</label>
                                        <input type="text" v-model="cancelTourTicket.remark" class="form-control" placeholder="กรุณาระบุหมายเหตุการยกเลิก" required>
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
                <div id="section-to-printBill" style="visibility: hidden; position: fixed;"></div>
            <!-- </div> -->
        <!-- </div> -->
    </div>
</template>
<script>
function PrintElem(content) {
  var mywindow = window.open("", "PRINT", "height=80,width=80");

  mywindow.document.write("<html><head><title>test</title>");
  mywindow.document.write("</head><body>");
  mywindow.document.write(content);
  mywindow.document.write("</body></html>");

  mywindow.document.close(); // necessary for IE >= 10
  mywindow.focus(); // necessary for IE >= 10*/

  mywindow.print();
  mywindow.close();

  return true;
}
import printJS from "print-js";
import moment from "moment";
import Jquery from "jquery";
import axios from "axios";
export default {
  data() {
    return {
      data: {
        _id: "",
        name: "cash",
        agent: "",
        tour: {
          nameTour: "",
          priceAdult: "",
          priceChild: "",
          netPriceAdult: "",
          netPriceChild: ""
        },
        amountChild: "",
        amountAdult: "",
        voucher: "",
        remark: ""
      },
      selectTypeName: "cash",
      selectAgent: "",
      nameAgent: "",
      selectTour: "",
      realTime: "",
      tour: [],
      tourList: [],
      billHead: "",
      logo: "",
      billFoot: "",
      statusPrintTour: "",
      amountPrintTour: "",
      cancelTourTicket: {
        _id: '',
        remark: ''
      }
    };
  },
  methods: {
    genIdTicket(lastId) {
      // lastId = "001" fortest
      var prefix = moment().format("Y") + moment().format("MM");
      if (lastId) {
        var lastId = lastId.substr(-4);
        var newId = "000" + (parseInt(lastId) + 1);
        var id = newId.substr(-4);
      } else {
        var id = "0001";
      }
      return (this.data._id = "TR" + prefix + id);
    },
    async submit() {
    //   var contentForSeatran = `
    //     <h4 style="border: 1px solid; padding: 30px; text-align: center">TOUR VOUCHER</h4>
    //                                         <h3 style="text-align: center">${
    //                                           this.billHead
    //                                         }</h3>
    //                                             <p id="realTime"></p>
    //                                         <p></p>
    //                                         <p style="text-align: right; font-weight: bold;">No. ${
    //                                           this.data._id
    //                                         }</p>
    //                                             <div class="content">
    //                                                 <div>
    //                                                     <span style="font-weight: bold;">Name : </span>
    //                                                     <div style="text-align: left">${this
    //                                                       .data.name ||
    //                                                       "-"}</div>
    //                                                 </div>
    //                                                 <div>
    //                                                     <span style="font-weight: bold;">Agent : </span>
    //                                                     <span style="float: right">${this
    //                                                       .nameAgent ||
    //                                                       "-"}</span>
    //                                                 </div>
    //                                                 <div>
    //                                                     <span style="font-weight: bold;">Tour : </span>
    //                                                     <span style="float: right">${this
    //                                                       .data.tour.nameTour ||
    //                                                       "-"}</span>
    //                                                 </div>
    //                                                 <div>
    //                                                     <span style="font-weight: bold;">Adults : </span>
    //                                                     <span>${this.data
    //                                                       .amountAdult ||
    //                                                       "-"}</span>
    //                                                     <span style="float: right">${this
    //                                                       .data.tour
    //                                                       .netPriceAdult ||
    //                                                       "-"}</span>
    //                                                     <span style="font-weight: bold; float: right;">Net Price : </span>
    //                                                 </div>
    //                                                 <div>
    //                                                     <span style="font-weight: bold;">Children : </span>
    //                                                     <span>${this.data
    //                                                       .amountChild ||
    //                                                       "-"}</span>
    //                                                     <span style="float: right">${this
    //                                                       .data.tour
    //                                                       .netPriceChild ||
    //                                                       "-"}</span>
    //                                                     <span style="font-weight: bold; float: right;">Net Price : </span>
    //                                                 </div>
    //                                                 <div>
    //                                                     <span style="font-weight: bold;">Total : </span>
    //                                                     <span>${parseInt(
    //                                                       this.data
    //                                                         .amountAdult || 0
    //                                                     ) +
    //                                                       parseInt(
    //                                                         this.data
    //                                                           .amountChild || 0
    //                                                       ) || "-"}</span>
    //                                                     <span style="float: right">${parseInt(
    //                                                       this.data.tour
    //                                                         .netPriceChild || 0
    //                                                     ) *
    //                                                       this.data
    //                                                         .amountChild +
    //                                                       parseInt(
    //                                                         this.data.tour
    //                                                           .netPriceAdult ||
    //                                                           0
    //                                                       ) *
    //                                                         this.data
    //                                                           .amountAdult ||
    //                                                       "-"}</span>
    //                                                     <span style="font-weight: bold; float: right;">Total Net : </span>
    //                                                 </div>
    //                                                 <div>
    //                                                     <span style="font-weight: bold;">Voucher : </span>
    //                                                     <span style="float: right">${this
    //                                                       .data.voucher ||
    //                                                       "-"}</span>
    //                                                 </div>
    //                                                 <div>
    //                                                     <span style="font-weight: bold;">Remark. : </span>
    //                                                     <span style="float: right">${this
    //                                                       .data.remark ||
    //                                                       "-"}</span>
    //                                                 </div>
    //                                                 <hr style="border: 1px dotted;">
    //                                                 <div>
    //                                                     <span style="font-weight: bold;">Total : </span>
    //                                                     <span style="float: right">${parseInt(
    //                                                       this.data.tour
    //                                                         .netPriceChild || 0
    //                                                     ) *
    //                                                       this.data
    //                                                         .amountChild +
    //                                                       parseInt(
    //                                                         this.data.tour
    //                                                           .netPriceAdult ||
    //                                                           0
    //                                                       ) *
    //                                                         this.data
    //                                                           .amountAdult ||
    //                                                       "-"}</span>
    //                                                 </div>
    //                                             </div>
    //                                             <div style="margin-top: 40px;">
    //                                                 <h6 id="billFoot"></h6>
    //                                             </div>`;
    //   var contentForCustomer = `
    //     <h4 style="border: 1px solid; padding: 30px; text-align: center">TOUR VOUCHER</h4>
    //                                         <h3 style="text-align: center">${
    //                                           this.billHead
    //                                         }</h3>
    //                                             <p id="realTime"></p>
    //                                         <p></p>
    //                                         <p style="text-align: right; font-weight: bold;">No. ${
    //                                           this.data._id
    //                                         }</p>
    //                                             <div class="content">
    //                                                 <div>
    //                                                     <span style="font-weight: bold;">Name : </span>
    //                                                     <div style="text-align: left">${this
    //                                                       .data.name ||
    //                                                       "-"}</div>
    //                                                 </div>
    //                                                 <div>
    //                                                     <span style="font-weight: bold;">Agent : </span>
    //                                                     <span style="float: right">${this
    //                                                       .nameAgent ||
    //                                                       "-"}</span>
    //                                                 </div>
    //                                                 <div>
    //                                                     <span style="font-weight: bold;">Tour : </span>
    //                                                     <span style="float: right">${this
    //                                                       .data.tour.nameTour ||
    //                                                       "-"}</span>
    //                                                 </div>
    //                                                 <div>
    //                                                     <span style="font-weight: bold;">Adults : </span>
    //                                                     <span>${this.data
    //                                                       .amountAdult ||
    //                                                       "-"}</span>
    //                                                     <span style="float: right">${this
    //                                                       .data.tour
    //                                                       .priceAdult ||
    //                                                       "-"}</span>
    //                                                     <span style="font-weight: bold; float: right;">Price Adult : </span>
    //                                                 </div>
    //                                                 <div>
    //                                                     <span style="font-weight: bold;">Children : </span>
    //                                                     <span>${this.data
    //                                                       .amountChild ||
    //                                                       "-"}</span>
    //                                                     <span style="float: right">${this
    //                                                       .data.tour
    //                                                       .priceChild ||
    //                                                       "-"}</span>
    //                                                     <span style="font-weight: bold; float: right;">Price Child: </span>
    //                                                 </div>
    //                                                 <div>
    //                                                     <span style="font-weight: bold;">Total : </span>
    //                                                     <span>${parseInt(
    //                                                       this.data
    //                                                         .amountAdult || 0
    //                                                     ) +
    //                                                       parseInt(
    //                                                         this.data
    //                                                           .amountChild || 0
    //                                                       ) || "-"}</span>
    //                                                     <span style="float: right">${parseInt(
    //                                                       this.data.tour
    //                                                         .priceChild || 0
    //                                                     ) *
    //                                                       this.data
    //                                                         .amountChild +
    //                                                       parseInt(
    //                                                         this.data.tour
    //                                                           .priceAdult || 0
    //                                                       ) *
    //                                                         this.data
    //                                                           .amountAdult ||
    //                                                       "-"}</span>
    //                                                     <span style="font-weight: bold; float: right;">Total Net : </span>
    //                                                 </div>
    //                                                 <div>
    //                                                     <span style="font-weight: bold;">Voucher : </span>
    //                                                     <span style="float: right">${this
    //                                                       .data.voucher ||
    //                                                       "-"}</span>
    //                                                 </div>
    //                                                 <div>
    //                                                     <span style="font-weight: bold;">Remark. : </span>
    //                                                     <span style="float: right">${this
    //                                                       .data.remark ||
    //                                                       "-"}</span>
    //                                                 </div>
    //                                                 <hr style="border: 1px dotted;">
    //                                                 <div>
    //                                                     <span style="font-weight: bold;">Total : </span>
    //                                                     <span style="float: right">${parseInt(
    //                                                       this.data.tour
    //                                                         .netPriceChild || 0
    //                                                     ) *
    //                                                       this.data
    //                                                         .amountChild +
    //                                                       parseInt(
    //                                                         this.data.tour
    //                                                           .netPriceAdult ||
    //                                                           0
    //                                                       ) *
    //                                                         this.data
    //                                                           .amountAdult ||
    //                                                       "-"}</span>
    //                                                 </div>
    //                                             </div>
    //                                             <div style="margin-top: 40px;">
    //                                                 <h6 id="billFoot"></h6>
    //                                             </div>`;
      if (this.statusPrintTour) {
          Jquery("#realTime").text(
            moment(new Date()).format("MM/DD/YYYY, h:mm:ss a")
          );
        for (let i = 0; i < this.amountPrintTour; i++) {
        //   document.getElementsByTagName("BODY")[0].onbeforeprint = function() {
        //     $("#section-to-printBill").html(contentForSeatran);
        //   };
        //   window.print();
        //   document.getElementsByTagName("BODY")[0].onbeforeprint = function() {
        //     $("#section-to-printBill").html(contentForCustomer);
        //   };
          window.print();
        }
      }
      this.$store.dispatch("addTourTicket", this.data).then(() => {
        moment.locale("en");
        this.genIdTicket(this.data._id);
        this.selectTypeName = "cash";
        this.data.name = "cash",
        this.data.agent = "",
        this.data.tour = {
          nameTour: "",
          priceAdult: "",
          priceChild: "",
          netPriceAdult: "",
          netPriceChild: ""
        },
        this.data.amountChild = "",
        this.data.amountAdult = "",
        this.data.voucher = "",
        this.data.remark = "";
        this.selectAgent = "",
        this.nameAgent = "",
        this.selectTour = "",
        $("#detailTitleBill,#realTime").html('');
        this.$store.dispatch("getTourTicketLasted");
      });
    },
    modalCancel(_id){
        this.cancelTourTicket._id = _id
        $(this.$refs.modalCancel).modal('toggle')
    },
    cencelTicket(){
        this.$store.dispatch('cancelTourTicket',this.cancelTourTicket)
        .then(() => {
            this.cancelTourTicket._id = ''
            this.cancelTourTicket.remark = ''
            this.$store.dispatch('getTourTicketLasted')
            $(this.$refs.modalCancel).modal('hide')
        })
    }
  },
  computed: {
    getTour() {
      return (this.tour = this.$store.getters.getTour);
    },
    getTourTicketLasted() {
      return this.$store.getters.getTourTicketLasted;
    },
    total() {
      var total = 0;
      if (this.data.price != "" && this.data.amount != "") {
        var total = this.data.price * this.data.amount;
      }
      this.data.total = total;
      return total;
    },
    getLastTourTicket() {
      return this.$store.getters.getLastTourTicket;
    },
    getBillHead() {
      this.$store.dispatch("getBillHead").then(() => {
        const obj = this.$store.getters.getBillHead;
        this.billFoot = obj.billFoot;
        $("#billFoot").html(obj.billFoot);
      });
    },
    getPrintSetting() {
      this.$store.dispatch("getPrintSetting").then(() => {
        const obj = this.$store.getters.getPrintSetting;
        this.statusPrintTour = obj.statusPrintTour;
        this.amountPrintTour = obj.amountPrintTour;
      });
    }
  },
  watch: {
    selectAgent(val) {
      if (val != "" && val != undefined) {
        const obj = this.tour.find(v => v._id == val);
        this.data.agent = obj._id;
        this.tourList = obj.tour;
        this.nameAgent = obj.nameAgent;
        if(obj.detailTitleBill != null){
            this.billHead = obj.detailTitleBill.replace(/\n/g, "<br />")
            $("#detailTitleBill").html(this.billHead)
        }else{
            $("#detailTitleBill").html('')
        }
        this.logo = obj.logo;
      } else {
        this.data.agent = "";
        this.tourList = [];
        this.nameAgent = "";
        this.billHead = "";
        this.logo = "";
        this.selectTour = "";
      }
    },
    selectTour(val) {
      if (val != "" && val != undefined) {
        const obj = this.tourList.find(v => v._id == val);
        this.data.tour.nameTour = obj.nameTour;
        this.data.tour.amountAdult = obj.amountAdult;
        this.data.tour.amountChild = obj.amountChild;
        this.data.tour.priceAdult = obj.priceAdult;
        this.data.tour.priceChild = obj.priceChild;
        this.data.tour.netPriceAdult = obj.netPriceAdult;
        this.data.tour.netPriceChild = obj.netPriceChild;
      } else {
        this.data.tour.nameTour = "";
        this.data.tour.amountAdult = "";
        this.data.tour.amountChild = "";
        this.data.tour.priceAdult = "";
        this.data.tour.priceChild = "";
        this.data.tour.netPriceAdult = "";
        this.data.tour.netPriceChild = "";
      }
    },
    selectTypeName(val) {
      if (val == "defineName") {
        this.data.name = "";
        this.$nextTick(() => this.$refs.name.focus());
      } else {
        this.data.name = "cash";
      }
    }
  },
  created() {
    this.getPrintSetting; // get print setting (statusPrint , amountPrint)
    this.getBillHead;
    this.$store.dispatch("getTourTicketLasted");
    this.$store.dispatch("getTour");
    this.$store.dispatch("getLastTourTicket").then(() => {
      var lastId = this.getLastTourTicket;
      if (lastId) {
        this.genIdTicket(lastId._id);
      } else {
        this.genIdTicket();
      }
    });
  },
  mounted() {
    $("#tableTourRecent").DataTable({
      bDestroy: true,
      lengthMenu: [[5, 10, 25, 50, -1], [5, 10, 25, 50, "All"]],
      order: [[0, "DESC"]]
    });
  }
};
</script>
<style scoped>
.boxSell {
  background: white;
  width: 100%;
  min-height: 100vh;
  position: absolute;
  top: 0;
  left: 0;
}
.close {
  position: absolute;
  right: 10px;
  top: 10px;
}
.boxShowTotal {
  text-align: right;
  padding: 10px;
  font-size: 4em;
  color: white;
}
.exReceipt {
  width: 100%;
  border: 1px solid;
  margin: 0 auto;
  padding: 50px;
  text-align: center;
}
.exReceipt .content {
  text-align: left;
}
</style>
