<template>
  <div>
      <h3><i class="fa fa-list-ol"></i> ตั้งค่ารายการทัวร์</h3><hr>
      <button class="btn btn-info btn-sm" @click="formSetTour"><i class="fa fa-plus"></i> ตั้งค่าทัวร์</button>
      <div class="row" style="margin-top: 20px;">
          <div class="col-sm-12">
            <table class="table table-hover table-bordered table-sm text-center">
                    <template v-for="(data,index) in getTour">
                        <thead :key="index">
                            <tr>
                                <th  class="bg-info text-white text-left" colspan="5">{{ data.nameAgent }}</th>
                            </tr>
                            <tr>
                                <td style="vertical-align: middle" rowspan="2">ชื่อทัวร์</td>
                                <td colspan="2">Price</td>
                                <td colspan="2">Net Price</td>
                            </tr>
                            <tr>
                                <td>Adult</td>
                                <td>Children</td>
                                <td>Adult</td>
                                <td>Children</td>
                            </tr>
                         </thead>
                        <tbody :key="data._id">
                            <template v-if="data.tour.length > 0">
                                <tr v-for="(data,index2) in data.tour" :key="index2">
                                    <td>{{ data.nameTour }}</td>
                                    <td>{{ data.priceAdult }}</td>
                                    <td>{{ data.priceChild }}</td>
                                    <td>{{ data.netPriceAdult }}</td>
                                    <td>{{ data.netPriceChild }}</td>
                                </tr>
                            </template>
                            <tr v-else>
                                <td>ไม่มีรายการทัวร์</td>        
                                <td> - </td>      
                                <td> - </td>      
                                <td> - </td>      
                                <td> - </td>      
                            </tr>
                        </tbody>
                    </template>
            </table>
          </div>
      </div>
    <form-set-tour ref="formSetTour" @finish="actionGetTour"></form-set-tour>
  </div>
</template>
<script>
import formSetTour from "@/components/tour/formSetTour";
export default {
  components: {
    formSetTour
  },
  methods: {
    formSetTour() {
      this.$refs.formSetTour.toggleModal();
    },
    actionGetTour() {
      this.$store.dispatch("getTour");
    }
  },
  computed: {
    getTour() {
      return this.$store.getters.getTour;
    }
  },
  created() {
    this.actionGetTour();
  }
};
</script>
