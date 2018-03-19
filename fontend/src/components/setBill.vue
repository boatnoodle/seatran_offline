<template>
  <div>
      <h3><i class="fa fa-files-o"></i> ตั้งค่าบิล</h3><hr>
      <div class="row" style="margin-top: 20px;">
          <div class="col-sm-12">
              <form v-on:submit.prevent="submit">
                <div class="exReceipt">
                    <input type="text" v-model="data.billHead" class="form-control text-center" placeholder="กรุณาระบุหัวบิล">
                    <p>xxxxxxxxxxxxxxxxx</p>
                    <div class="content">
                    <div>
                        <span style="font-weight: bold;">xxxxxxxxxxxx : </span>
                        <span style="float: right">xxxxxxxxxxxx</span>
                    </div>
                    <div>
                        <span style="font-weight: bold;">xxxxxxxxxxxx : </span>
                        <span style="float: right">xxxxxxxxxxxx</span>
                    </div>
                    <div>
                        <span style="font-weight: bold;">xxxxxxxxxxxx : </span>
                        <span style="float: right">xxxxxxxxxxxx</span>
                    </div>
                    <div>
                        <span style="font-weight: bold;">xxxxxxxxxxxx : </span>
                        <span style="float: right">xxxxxxxxxxxx</span>
                    </div>
                    <div>
                        <span style="font-weight: bold;">xxxxxxxxxxxx : </span>
                        <span style="float: right">xxxxxxxxxxxx</span>
                    </div>
                    <hr style="border: 1px dotted;">
                    <div>
                        <span style="font-weight: bold;">xxxxxxxxxxxx : </span>
                        <span style="float: right">xxxxxxxxxxxx</span>
                    </div>
                    </div>
                    <div style="margin-top: 40px;">
                        <textarea class="form-control" v-model="data.billFoot" style="text-align: center"  cols="30" rows="5" placeholder="กรุณาระบุท้ายบิล"></textarea>
                    </div>
                </div>
                <div class="text-center" style="margin-top: 20px;">
                    <button type="submit" class="btn btn-info">บันทึก</button>
                </div>
            </form>
          </div>
      </div>
  </div>
</template>
<script>
import axios from 'axios'
export default {
    data(){
        return {
            data: {
                billHead : '',
                billFoot: ''
            }
        }
    },
    methods: {
         submit(){
             const data = {
                 billHead: this.data.billHead,
                 billFoot: this.data.billFoot.replace(/\n/g, "<br />")
             }
            this.$store.dispatch('updateBillHead',data)
            .then(response => {
                this.actionGetBillHead
            })
            .catch(error => {
                console.log(error);
            });
        }
    },
    computed: {
        getBillHead(){
            const obj = this.$store.getters.getBillHead
            this.data.billHead = obj.billHead
            this.data.billFoot = obj.billFoot.replace(/<br\s*[\/]?>/gi, "\n");
            return obj
        },
        actionGetBillHead(){
            this.$store.dispatch('getBillHead')
            .then(() => {
                this.getBillHead
            })
        }
    },
     created(){
        this.actionGetBillHead
    }
}
</script>
<style scoped>
    .exReceipt{
        width: 350px;
        border: 1px solid;
        margin: 0 auto;
        padding: 50px;
        text-align: center;
    }
    .exReceipt .content{
        text-align: left;
    }
</style>

