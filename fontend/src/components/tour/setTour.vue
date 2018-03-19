<template>
  <div>
      <h3><i class="fa fa-list-ol"></i> ตั้งค่ารายการทัวร์</h3><hr>
      <button class="btn btn-info btn-sm" @click="formSetTour"><i class="fa fa-plus"></i> ตั้งค่าทัวร์</button>
      <div class="row" style="margin-top: 20px;">
          <div class="col-sm-12">
            <table class="table table-hover table-bordered table-sm text-center">
                    <template v-for="data in getTour">
                        <thead>
                            <tr>
                                <th  class="bg-info text-white text-left" colspan="2">{{ data.nameAgent }}</th>
                            </tr>
                            <tr>
                                <td>ชื่อทัวร์</td>
                                <td>ราคา</td>
                            </tr>
                         </thead>
                        <tbody>
                            <template v-if="data.tour.length > 0">
                                <tr v-for="data in data.tour">
                                    <td>{{ data.nameTour }}</td>
                                    <td>{{ data.priceTour }}</td>
                                </tr>
                            </template>
                            <tr v-else>
                                <td>ไม่มีรายการทัวร์</td>        
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
import formSetTour from '@/components/tour/formSetTour'
export default {
    components:{
        formSetTour
    }
    ,
    methods: {
        formSetTour(){
            this.$refs.formSetTour.toggleModal()
        },
        actionGetTour(){
            this.$store.dispatch('getTour')
        }
    },
    computed: {
        getTour(){
            return this.$store.getters.getTour
        }
    },
    created(){
        this.actionGetTour()
    }
}
</script>
