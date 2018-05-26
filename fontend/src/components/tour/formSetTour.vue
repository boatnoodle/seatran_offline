<template>
  <div>
      <div ref="modal" class="modal" tabindex="-1" role="dialog">
        <div class="modal-dialog modal-lg" role="document">
            <div class="modal-content">
            <div class="modal-header text-white bg-info">
                <h5 class="modal-title">ตั้งค่ารายการทัวร์</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <form v-on:submit.prevent="submit">
                    <div class="form-group">
                        <div class="form-row">
                            <div class="col-sm-10">
                                <label>กรุณาเลือกตัวแทนขาย</label>
                                <select v-model="seletctAgent" class="form-control">
                                    <option value="">กรุณาเลือกตัวแทนขาย</option>
                                    <template v-for="(data,index) in getTour">
                                        <option :key="index" :value="data._id">{{ data.nameAgent }}</option>
                                    </template>
                                </select>
                            </div>
                            <div class="col-sm-2">
                                <button v-show="datas.id" @click="addInput" type="button" class="btn btn-info btn-sm" style="position: absolute; bottom: 5px;">เพิ่ม</button>
                            </div>
                        </div>
                    </div>
                    <div class="form-group"  v-for="(data,index) in datas.tour" :key="index">
                        <div class="form-row">
                            <div class="col-sm-10">
                                <label>ชื่อทัวร์</label>
                                <input type="text" v-model="data.nameTour" class="form-control" placeholder="กรุณาระบุชื่อทัวร์">
                            </div>
                             <div class="col-sm-2">
                                <button type="button" v-show="datas.tour.length > 1" @click="removeInput" class="btn btn-dark btn-sm" style="position: absolute; bottom: 5px;">ลบ</button>
                            </div>
                        </div>
                        <div class="form-row">
                            <div class="col-sm-5">
                                <label>Full Rate Adult</label>
                                <input type="number" v-model="data.priceAdult" class="form-control" placeholder="กรุณาระบุราคาผู้ใหญ่">
                            </div>
                            <div class="col-sm-5">
                                <label>Full Rate Children</label>
                                <input type="number" v-model="data.priceChild" class="form-control" placeholder="กรุณาระบุราคาเด็ก">
                            </div>
                            <div class="col-sm-5">
                                <label>Net Rate Adult</label>
                                <input type="number" v-model="data.netPriceAdult" class="form-control" placeholder="กรุณาระบุราคา net ผู้ใหญ่">
                            </div>
                            <div class="col-sm-5">
                                <label>Net Rate Children</label>
                                <input type="number" v-model="data.netPriceChild" class="form-control" placeholder="กรุณาระบุราคา net เด็ก">
                            </div>
                        </div>
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
export default {
  data() {
    return {
      dialog: false,
      tour: {},
      datas: {},
      seletctAgent: ""
    };
  },
  methods: {
    toggleModal() {
      $(this.$refs.modal).modal("toggle");
    },
    addInput() {
      this.datas.tour.push({
        nameTour: "",
        priceTour: ""
      });
    },
    removeInput(index) {
      this.datas.tour.splice(index, 1);
    },
    submit() {
      this.$store
        .dispatch("updateTour", this.datas)
        .then(result => {
          this.clearData();
          this.$emit("finish");
          this.toggleModal();
        })
        .catch(err => {
          console.log(err);
        });
    },
    clearData() {
      this.$store.dispatch("getTour");
      this.seletctAgent = "";
    }
  },
  computed: {
    getTour() {
      const tour = this.$store.getters.getTour;
      return (this.tour = tour);
    }
  },
  watch: {
    seletctAgent(val) {
      if (val != "" && val != undefined) {
        const obj = this.tour.find(v => v._id == val);
        if (obj.tour.length > 0) {
          this.datas = {
            id: obj._id,
            tour: obj.tour
          };
        } else {
          this.datas = {
            id: obj._id,
            tour: [
              {
                nameTour: "",
                priceTour: ""
              }
            ]
          };
        }
      } else {
        this.datas = {};
      }
    }
  },
  created() {
    this.$store.dispatch("getTour");
  },
  mounted() {
    $(this.$refs.modal).on("hidden.bs.modal", this.clearData);
  }
};
</script>

