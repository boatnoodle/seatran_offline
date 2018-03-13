<template>
  <div>
      <h3>ตั้งค่าบิล</h3><hr>
      <div class="row" style="margin-top: 20px;">
          <div class="col-sm-12">
              <form v-on:submit.prevent="submit">
                <div class="exReceipt">
                    <input type="text" v-model="billHead" class="form-control text-center" placeholder="กรุณาระบุหัวบิล">
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
                    <h3>RASSADA HARBOUR</h3>
                    <h3>THANK YOU</h3>
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
            billHead: ''
        }
    },
    methods: {
        async submit(){
            await axios.put('http://localhost:3000/api/billHead', {
                billHead: this.billHead,
            })
            .then(response => {
                alert('แก้ไขหัวบิลเรียบร้อยแล้ว')
                this.getBillHead
            })
            .catch(error => {
                console.log(error);
            });
        }
    },
    computed: {
        async getBillHead(){
            await axios.get('http://localhost:3000/api/billHead')
            .then((response) => {
                this.billHead = response.data[0].billHead
            })
            .catch(error => {
                console.log(error);
            });
        }
    },
     created(){
         this.getBillHead
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

