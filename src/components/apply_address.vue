<template>
    <div>

        <div class="apply_address_info">
            <img :src="order_obj.pic_url" alt="">
            <h2>
                {{ order_obj.name }}
            </h2>
        </div>

        <div class="apply_address_form">
            <van-form @submit="onSubmit">

                <van-field
                    v-model="form.price"
                    name="price"
                    :placeholder="data1"
                    :v-mode="data1"
                    :rules="[
                            { required: true, message: '请填写退款金额' },
                            { validator, message: data2}
                        ]"
                >
                    <div slot="label" class="title_van">
                        <p>退款金额</p>
                        <p>￥{{ price11 }}</p>
                    </div>
                </van-field>

                <van-field
                    name="reason"
                    v-model="form.reason"
                    rows="2"
                    :autosize="{ maxHeight: 200, minHeight: 130 }"
                    label="退款原因"
                    type="textarea"
                    placeholder="请填写您的退款原因"
                    :rules="[
                            { required: true, message: '请填写退款原因' },
                        ]"
                />


                <div class="button_apply">
                    <van-button round block type="info" native-type="submit">
                        提交
                    </van-button>
                </div>

            </van-form>
        </div>

      <noSharing></noSharing>
    </div>
</template>

<script>
    import noSharing from "@/components/noSharing";

    export default {
        data() {
            return{
                form: {
                    price: null,
                    reason: null
                },
                // html: "<div class='title_van'><p>退款金额</p><p>{{ order_obj.price }}</p></div>",
                order_obj: {
                  pic_url: null,
                  name: null,
                  price: null
                },
                price11:'',
                data1:'',
                data2:'',
            }
        },
      created() {
        this.order_obj = JSON.parse(this.$route.query.order)
        // console.log(this.order_obj)
        this.price11 = (this.order_obj.price / 100).toFixed(2)
        // this.html= '<div class=\'title_van\'><p>退款金额</p><p>{{ this.order_obj.price }}</p></div>'
        this.data1 = '不可修改，最多￥'+this.price11
        this.data2 = '退款金额不可超过￥'+this.price11+'元'
      },
        methods: {
            // 申请退款提交接口
            reg_refund(y) {
              this.$post(localStorage.getItem('http') + 'order/reg_refund',y)
                  .then(res=> {
                    // console.log(res)
                    if(res.code == 1) {
                        this.$router.push({
                          path: '/refund_page'
                        })
                        this.$toast.success(res.msg);
                    }else {
                        this.$toast.error(res.msg);
                    }
                  })
            },
            validator(val) {
                return Number(val) <= 1999
            },
            onSubmit(val) {
                // console.log(val)

                let obj= {}

                obj['order_goods_id']= this.order_obj.id
                obj['token']= localStorage.getItem('token')
                obj['price']= val.price
                obj['reason']= val.reason

                // console.log(obj)

                this.reg_refund(obj)

            }
        },
        components: {
          noSharing
        }
    }
</script>

<style lang="less" scoped>
    .apply_address_info{
        padding: 12px 16px;
        display: flex;
        background: white;
        margin: 12px 0;
        img{
            width: 60px;
            height: 60px;
        }
        h2{
            font-size: 14px;
            margin-left: 8px;
        }
    }

    .apply_address_form{
        .van-form{
            /deep/ .van-cell{
                display: flex;
                flex-direction: column;
                .van-cell__title{
                    margin-right: 0;
                    margin-bottom: 12px;
                    font-size: 16px;
                }
            }
            /deep/.title_van{
                width: 170px;
                display: flex;
                p{
                    font-size: 16px;
                }
            }
            /deep/.title_van p:nth-child(2){
                color: #EA610E;
                margin-left: 12px;
            }
        }
    }

    .button_apply{
        width: 100%;
        position: fixed;
        bottom: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 16px 0;
        background: white;
        .van-button{
            width: 146px;
            height: 40px;
            background:linear-gradient(136deg,rgba(106,174,255,1) 0%,rgba(0,94,255,1) 100%);
            box-shadow:0px 2px 3px rgba(9,101,255,0.3);
            .van-button__text{
                color: white;
            }
        }
    }

</style>