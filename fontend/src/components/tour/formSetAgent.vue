<template>
  <div>
      <div ref="modal" class="modal" tabindex="-1" role="dialog">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
            <div class="modal-header text-white bg-info">
                <h5 class="modal-title">เพิ่มตัวแทนขาย</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <form v-on:submit.prevent="submit">
                    <div class="form-group">
                        <label>ชื่อตัวแทนขาย</label>
                        <input type="text" v-model="data.nameAgent" class="form-control" placeholder="กรุณาระบุชื่อตัวแทนขาย">
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
        Agent: {
            type: Object,
            default: {}
        }
    },
    data(){
        return {
            data: {
                update: false,
                id: '',
                nameAgent: ''
            }
        }
    },
    methods: {
        toggleModal(){
            $(this.$refs.modal).modal('toggle')
        },
        submit(){
            if(this.data.update){
                this.$store.dispatch('updateAgent',this.data)
                .then(() => {
                    this.$emit('finish')
                })
            }else{
                this.$store.dispatch('addAgent',this.data)
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
                nameAgent: ''
            }
        }
    },
    watch:{
        Agent(val){
            this.data.update = true
            this.data.id = val._id
            this.data.nameAgent = val.nameAgent
        }
    },
    mounted(){
        $(this.$refs.modal).on('hidden.bs.modal',this.clearData)
    }
  
}
</script>

