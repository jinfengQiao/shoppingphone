<template>
    <div>
        <div class="deta_header">
            <div class="deta_header_title">
                <i @click="back" class="iconfont icon-fanhui"></i>
                <h2>退款详情</h2>
            </div>
            <div class="deta_header_state">
                <div class="deta_header_state_left">
                    <h2>{{ refund_title }}</h2>
                    <p>{{ refund_obj.addtime }}</p>
                </div>
                <img src="" alt="">
            </div>
        </div>


        <!--退款总金额-->

        <div class="refund_price">
            <div class="refund_price_num">
                <h2>退款总金额</h2>
                <p>￥{{ refund_obj.price }}</p>
            </div>
            <div class="refund_price_content">
                <div class="refund_price_content_title">
<!--                    <p>退回支付宝账户（ 137****2508 ）</p>-->
<!--                    <p>￥1999</p>-->
                </div>
                <van-steps :active="active" inactive-color="#EA610E" active-color="#EA610E">
                    <van-step>
                        <div class="step_title">
                            <p>买家申请</p>
<!--                            <p>2019-12-7 09:58</p>-->
                        </div>
                    </van-step>
                    <van-step>
                        <div class="step_title">
                            <p>卖家处理</p>
<!--                            <p>2019-12-7 09:58</p>-->
                        </div>
                    </van-step>
                    <van-step>
                        <div class="step_title">
                            <p>{{ refund_title }}</p>
<!--                            <p>2019-12-7 09:58</p>-->
                        </div>
                    </van-step>
                </van-steps>
            </div>
        </div>

        <!--企业信息-->

        <div class="refund_name">
            <img :src="refund_obj.goods.pic_url" alt="">
            <h2>{{ refund_obj.goods.fullname }}</h2>
        </div>


        <!--退款信息-->
        <div class="refund_info">
            <p>退款原因：{{ refund_obj.reason }}</p>
            <p>退款金额：￥{{ refund_obj.price }}</p>
            <p>申请件数：1</p>
            <p>申请时间： {{ refund_obj.addtime }}</p>
            <p>退款编号：{{ refund_obj.num }}</p>
        </div>

        <!--失败原因-->
        <div class="refund_reason" v-if="refund_obj.status == 3">
            <h2>退款失败原因</h2>
            <p>{{ refund_obj.back_reason }}</p>
        </div>

      <noSharing></noSharing>

    </div>
</template>

<script>
    import noSharing from "@/components/noSharing";

    export default {
        data() {
            return{
                active: 0,
                refund_title: null,
                refund_obj: {
                  goods: {
                    pic_url: null
                  }
                }
            }
        },
        created() {
          this.refund_detail()
        },
        methods: {
          // 获取退款详情
          refund_detail() {
            this.$post(localStorage.getItem('http') + 'order/refund_detail',{
              token: sessionStorage.getItem('token'),
              order_goods_id: this.$route.query.id
            })
                .then(res=> {
                  console.log(res.data)
                  if(res.data.status == 1) {
                    this.refund_title= '退款中'
                  }else if(res.data.status == 2) {
                    this.refund_title= '退款成功'
                  }else if(res.data.status == 3) {
                    this.refund_title= '退款失败'
                  }
                  if(res.data.status > 2) {
                    this.active= 2
                  }else{
                    this.active= res.data.status
                  }

                  this.refund_obj= res.data

                })
          },
          back() {
            this.$router.go(-1)
          },
        },
        components: {
          noSharing
        }
    }
</script>

<style lang="less" scoped>
    // 退款总金额
    .refund_price{
        margin: 12px 0;
        padding: 12px 16px;
        background: white;
        .refund_price_num{
            display: flex;
            justify-content: space-between;
            padding-bottom: 12px;
            border-bottom: 1px solid #DDDDDD;
            h2{
                font-size: 16px;
            }
            p{
                font-size: 15px;
                color: #EA610E;
            }
        }
        .refund_price_content{
            padding-top: 12px;
            .refund_price_content_title{
                display: flex;
                justify-content: space-between;
                margin-bottom: 16px;
                p{
                    font-size: 14px;
                }
            }
            .van-steps{
                padding: 10px 36px 0;
                .step_title{
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                }
                .step_title p:nth-child(1){
                    color: #666666;
                    font-size: 13px;
                }
                .step_title p:nth-child(2){
                    color: #999999;
                    font-size: 12px;
                }
                /deep/ .van-steps__items{
                    padding-top: 22px;
                    padding-bottom: 0;
                }
                /deep/ .van-step__circle-container{
                    top: -16px;
                }
                /deep/ .van-step__line{
                    top: -16px;
                    height: 2px;
                    background-color: #EA610E;
                }
                /deep/ .van-step__circle{
                    width: 8px;
                    height: 8px;
                }
                /deep/ .van-step--horizontal:first-child .van-step__title{
                    margin-left: -37px;
                }
                /deep/ .van-step--horizontal:last-child .van-step__title{
                    margin-right: -37px;
                }
            }
        }
    }

    // 企业信息
    .refund_name{
        display: flex;
        padding: 12px 16px;
        background: white;
        margin-bottom: 12px;
        img{
            width: 60px;
            height: 60px;
        }
        h2{
            font-size: 14px;
            margin-left: 8px;
        }
    }

    // 退款信息
    .refund_info{
        padding: 12px 16px;
        background: white;
        margin-bottom: 12px;
        p{
            font-size: 13px;
            color: #666666;
            margin-bottom: 8px;
        }
    }
    .refund_info p:nth-last-child(1){
        margin-bottom: 0;
    }

    // 失败原因
    .refund_reason{
        padding: 12px 16px;
        background: white;
        margin-bottom: 38.5px;
        h2{
            font-size: 16px;
            margin-bottom: 12px;
        }
        p{
            font-size: 13px;
            color: #666666;
        }
    }



</style>