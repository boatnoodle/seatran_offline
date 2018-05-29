<template>
    <div>
        <h3 id="titlePrint" class="text-center">รางานทัวร์ประจำวัน</h3>
        <!-- <p class="text-center">{{ dateToday }}</p> -->
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
        <div class="row no-print">
            <div class="col-sm-12">
                <div class="form-group">
                    <input type="text" v-model="searchKey" placeholder="ค้นหาผ่าน รหัส,จุดส่ง,ประเภทรถ" class="form-control" >
                </div>
            </div>
        </div>
        <div id="section-to-print" class="row">
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
                        <tr v-for="(data,index) in tourTicket" :key="index">
                            <td>{{ data._id }}</td>
                            <td>{{ data.tour.nameTour }}</td>
                            <td>{{ data.agent.nameAgent }}</td>
                            <td>{{ data.amountAdult }}</td>
                            <td>{{ data.amountChild }}</td>
                            <td>{{ data.tour.priceAdult }}</td>
                            <td>{{ data.tour.priceChild }}</td>
                            <td>{{ data.tour.netPriceAdult }}</td>
                            <td>{{ data.tour.netPriceChild }}</td>
                            <td>{{ (data.tour.priceAdult * data.amountAdult) + (data.tour.priceChild * data.amountChild) }}</td>
                            <td>{{ (data.tour.netPriceAdult * data.amountChild) + (data.tour.netPriceChild * data.amountChild)|| '-' }}</td>
                        </tr>
                    </tbody>
                    <tfoot>
                        <tr>
                            <th colspan="4">รวม</th>
                            <th>{{ total.totalPrice || 0 }}</th>
                            <th>{{ total.totalAmount || 0 }}</th>
                            <th>{{ total.total || 0}}</th>
                            <th colspan="4"></th>
                        </tr>
                    </tfoot>
                </table>
                <div style="float: right; font-weight: bold; text-align: right">
                    <p>รวม : {{ total.total || 0 }} บาท</p>
                    <p>({{ percentTour * 100 }}%) : {{ total.fee || 0 }} บาท</p>
                    <p>รวมทั้งสิ้น : {{ total.grandTotal || 0 }} บาท</p>
                </div>
            </div>
            <div class="col-sm-12">
                <div style="float: right; font-weight: bold; text-align: center; margin-top: 50px;">
                    <p>..............................................</p>
                    <p>( ผู้จัดทำ )</p>
                    <p style="margin-top: 50px;">..............................................</p>
                    <p>( ผู้ตรวจสอบ )</p>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import moment from "moment";

export default {
  data() {
    return {
      data: {
        dateFrom: ""
      },
      dataReady: [],
      dateToday: moment()
        .locale("th")
        .format("Do MMM YYYY"),
      searchKey: "",
      total: {},
      percentTour: ""
    };
  },
  methods: {
    submit() {
      this.$store.dispatch("getTourTicketByDate", this.data).then(() => {
        this.tourTicket;
      });
    },
    printReport() {
      window.print();
    }
  },
  computed: {
    // manipulate() {
    //   //ข้อผิดพลาด ของการดึงดาต้าเบสยังไม่ดีพอ
    //   this.dataReady = [];
    //   const dataRaw = this.$store.getters.getTourTicketByDate;

    //   dataRaw.forEach(val => {
    //     const obj = val.agent.tour.find(v => v._id == val.tour);
    //     const data = {
    //       _id: val._id,
    //       name: val.name,
    //       nameAgent: val.agent.nameAgent,
    //       tour: obj,
    //       amount: val.amount,
    //       total: val.total,
    //       voucher: val.voucher,
    //       remark: val.remark,
    //       created: val.created
    //     };
    //     this.dataReady.push(data);
    //   });
    // },
    tourTicket() {
      const datas = this.$store.getters.getTourTicketByDate;
      console.log(datas);
      return datas.filter(v => {
        return (
          v._id.match(this.searchKey) ||
          v.name.match(this.searchKey) ||
          v.nameAgent.match(this.searchKey) ||
          v.tour.nameTour.match(this.searchKey)
        );
      });
    },
    getPercentTour() {
      this.$store.dispatch("getPercent").then(() => {
        const obj = this.$store.getters.getPercent;
        this.percentTour = obj.percentTour / 100;
      });
    }
  },
  watch: {
    tourTicket(val) {
      if (val.length > 0) {
        var totalPrice = val.reduce(
          (a, b) => parseInt(a) + parseInt(b.tour.priceTour),
          0
        );
        var totalAmount = val.reduce(
          (a, b) => parseInt(a) + parseInt(b.amount),
          0
        );
        var total = val.reduce((a, b) => parseInt(a) + parseInt(b.total), 0);
        this.total = {
          totalPrice: totalPrice,
          totalAmount: totalAmount,
          total: total,
          fee: total * this.percentTour,
          grandTotal: total + total * this.percentTour
        };
      } else {
        this.total = {
          totalPrice: 0,
          totalAmount: 0,
          total: 0,
          fee: 0,
          grandTotal: 0
        };
      }
    }
  },
  created() {
    this.getPercentTour;
  }
};
</script>
<style scoped>
</style>
