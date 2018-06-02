<template>
  <div>
      <h3><i class="fa fa-briefcase"></i> ตั้งค่าตัวแทนขาย</h3><hr>
      <button class="btn btn-info btn-sm" @click="formSetAgent"><i class="fa fa-plus"></i> เพิ่มตัวแทนขาย</button>
      <div class="row" style="margin-top: 20px;">
          <div class="col-sm-12">
            <table class="table table-hover table-bordered table-sm text-center">
                    <thead class="bg-info text-white">
                        <tr>
                            <th>ชื่อตัวแทนขาย</th>
                            <th>หัวบิล</th>
                            <th>Logo</th>
                            <th>จัดการ</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(data,index) in getAgent" :key="index">
                            <td>{{ data.nameAgent || '-' }}</td>
                            <td>{{ addNewLine(data.detailTitleBill) || '-' }}</td>
                            <td>
                                <img :src="getLogo(data.logo)" alt="logoAgent" width="70">
                            </td>
                            <td width="15%">
                                <button @click="updateAgent(data)" class="btn btn-info btn-sm"><i class="fa fa-pencil"></i> แก้ไข</button>
                                <button @click="removeAgent(data._id)" class="btn btn-default btn-sm"><i class="fa fa-trash-o"></i> ลบ</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
          </div>
      </div>
    <form-set-Agent ref="formSetAgent" :Agent="Agent" @finish="actionGetAgent"></form-set-Agent>
  </div>
</template>
<script>
import formSetAgent from '@/components/tour/formSetAgent'
export default {
     data(){
        return {
            datas: '',
            Agent: {}
        }
    },
    components:{
        formSetAgent
    }
    ,
    methods: {
        formSetAgent(){
            this.$refs.formSetAgent.toggleModal()
        },
        removeAgent(id){
            if(confirm('ยืนยันการลบ ?')){
                this.$store.dispatch('removeAgent',id)
                .then(()=> {
                    this.actionGetAgent()
                })
                .catch((err) => {
                    console.log(err)
                })
            }
        },
        updateAgent(data){
            this.Agent = data
            this.formSetAgent()
        },
        actionGetAgent(){
            this.$store.dispatch('getAgent')
        },
        getLogo(logoAddress){
            if(logoAddress){
                return logoAddress
            }else{
                return 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/2000px-No_image_available.svg.png'
            }
        },
        addNewLine(x){
            if(x != null){
                return x.replace(/<br\s*[\/]?>/gi, "\n")
            }
        }
    },
    computed: {
        getAgent(){
            return this.$store.getters.getAgent
        }
    },
    created(){
        this.actionGetAgent()
    }
}
</script>
