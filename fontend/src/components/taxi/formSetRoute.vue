<template>
  <div>
      <div ref="modal" class="modal" tabindex="-1" role="dialog">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
            <div class="modal-header text-white bg-info">
                <h5 class="modal-title">เพิ่มเส้นทาง</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <form v-on:submit.prevent="submit">
                    <div class="form-group">
                        <label for="exampleInputEmail1">จุดส่ง</label>
                        <input type="text" v-model="data.nameRoute" class="form-control" placeholder="กรุณาระบุจุดส่ง">
                    </div>
                    <div class="form-group">
                        <label for="exampleInputPassword1">ราคา</label>
                        <input type="number" v-model="data.priceRoute" class="form-control" placeholder="กรุณาระบุราคา">
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
import axios from '@/service/axios'
export default {
    props: {
        route: {
            type: Object,
            default: {}
        }
    },
    data(){
        return {
            data: {
                update: false,
                id: '',
                nameRoute: '',
                priceRoute: ''
            }
        }
    },
    methods: {
        toggleModal(){
            $(this.$refs.modal).modal('toggle')
        },
        submit(){
            if(this.data.update){
                this.$store.dispatch('updateRoute',this.data)
                .then(() => {
                    this.$emit('finish')
                })
            }else{
                this.$store.dispatch('addRoute',this.data)
                .then(()=>{
                    this.$emit('finish')
                })
            }
            this.toggleModal()
        },
        clearData(){
            this.data = {
                update: false,
                id: '',
                nameRoute: '',
                priceRoute: ''
            }
        }
    },
    watch:{
        route(val){
            this.data.update = true
            this.data.id = val._id
            this.data.nameRoute = val.nameRoute
            this.data.priceRoute = val.priceRoute
        }
    },
    mounted(){
        $(this.$refs.modal).on('hidden.bs.modal',this.clearData)
    }
  
}
</script>

