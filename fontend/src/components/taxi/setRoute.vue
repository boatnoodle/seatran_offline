<template>
  <div>
      <h3>ตั้งค่าเส้นทาง</h3><hr>
      <button class="btn btn-info btn-sm" @click="formSetRoute">เพิ่มเส้นทาง</button>
      <div class="row" style="margin-top: 20px;">
          <div class="col-sm-12">
            <table class="table table-hover table-bordered table-sm text-center">
                    <thead class="bg-info text-white">
                        <tr>
                            <th>จุดส่ง</th>
                            <th>ราคารถยนต์</th>
                            <th>ราคารถตู้</th>
                            <th>จัดการ</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(data,index) in getAllRouteTaxi" :key="index">
                            <td>{{ data.nameRoute }}</td>
                            <td>{{ data.priceTaxi || '-' }}</td>
                            <td>{{ data.priceVan || '-' }}</td>
                            <td width="10%">
                                <button @click="updateRoute(data)" class="btn btn-info btn-sm">แก้ไข</button>
                                <button @click="removeRoute(data._id)" class="btn btn-default btn-sm">ลบ</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
          </div>
      </div>
    <form-set-route ref="formSetRoute" :route="route" @finish="actionGetRouteTaxi()"></form-set-route>
  </div>
</template>
<script>
import formSetRoute from '@/components/taxi/formSetRoute'

export default {
    data(){
        return {
            datas: '',
            route: {}
        }
    },
    components:{
        formSetRoute
    }
    ,
    methods: {
        formSetRoute(){
            this.$refs.formSetRoute.toggleModal()
        },
        removeRoute(id){
            if(confirm('ยืนยันการลบ ?')){
                this.$store.dispatch('removeRoute',id)
                .then(()=> {
                    this.actionGetRouteTaxi()
                })
                .catch((err) => {
                    console.log(err)
                })
            }
        },
        updateRoute(data){
            this.route = data
            this.formSetRoute()
        },
        actionGetRouteTaxi(){
            this.$store.dispatch('getAllRouteTaxi')
        },
    },
    computed: {
        getAllRouteTaxi(){
            return this.$store.getters.getAllRouteTaxi
              
        }
    },
    created(){
        this.actionGetRouteTaxi()
    }
}
</script>
