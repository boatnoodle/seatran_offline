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
                    <div class="form-group">
                        <template v-for="(data,index) in datas.tour">
                         <div :key="index" class="form-row">
                            <div class="col-sm-5">
                                <label>ชื่อทัวร์</label>
                                <input type="text" v-model="data.nameTour" class="form-control" placeholder="กรุณาระบุชื่อทัวร์">
                            </div>
                             <div class="col-sm-5">
                                <label>ราคา</label>
                                <input type="number" v-model="data.priceTour" class="form-control" placeholder="กรุณาระบุราคา">
                            </div>
                            <div class="col-sm-2">
                                <button type="button" v-show="datas.tour.length > 1" @click="removeInput" class="btn btn-default btn-sm" style="position: absolute; bottom: 5px;">ลบ</button>
                            </div>
                        </div>
                        </template>
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
    data () {
      return {
        dialog: false,
        tour: {},
        datas: {},
        seletctAgent: ''
      }
    },
    methods: {
        toggleModal(){
            $(this.$refs.modal).modal('toggle')
        },
        addInput(){
            this.datas.tour.push({
                'nameTour': '',
                'priceTour' : ''
            })
        },
        removeInput(index){
            this.datas.tour.splice(index,1)
        },
        submit(){
            this.$store.dispatch('updateTour',this.datas)
            .then(result => {
                this.clearData()
                this.$emit('finish')
                this.toggleModal()
            })
            .catch(err => {
                console.log(err)
            })

        },
        clearData(){
            this.$store.dispatch('getTour') 
            this.seletctAgent = ''
        }
    },
    computed: {
        getTour(){
            const tour = this.$store.getters.getTour
            return this.tour = tour
        }
    },
    watch: {
        seletctAgent(val){
            if(val != '' && val != undefined){
                const obj = this.tour.find(v=> v._id == val)
                if((obj.tour).length > 0){
                    this.datas = {
                        id: obj._id,
                        tour: obj.tour
                    }
                }else{
                    this.datas = {
                        id: obj._id,
                        tour:[
                            {
                                nameTour: '',
                                priceTour: ''
                            }
                        ]
                    }
                }
            }else{
                this.datas = {}
            }
        }
    },
    created(){
       this.$store.dispatch('getTour') 
    },
    mounted(){
        $(this.$refs.modal).on('hidden.bs.modal',this.clearData)
    }
  
}
</script>

