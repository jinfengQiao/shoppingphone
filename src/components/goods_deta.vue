<template>
    <div>
<!--        <div class="goods_deta" style="margin-top: 70px;">-->
        <div class="goods_deta" >
            <img :src="spu.pic_url" alt="">
            <div class="goods_deta_title">
                <h2>{{ spu.name }}</h2>
                <div class="goods_deta_price">
                    <div class="goods_deta_price_p">
                        <p>￥</p>
<!--                        <p>3000.00</p>-->
                        <p v-if="price == null">{{obj_spu.max_price }} - {{ obj_spu.min_price }}</p>
                        <p v-if="price != null">{{ price }}</p>
                    </div>
                    <span>{{ spu.sell }}人付款</span>
                </div>
            </div>
        </div>

        <div class="recom_list">
            <h2>推荐商品</h2>
            <ul class="recom_list_content">
                <li v-for="item in goods_list" :key="item.id" @click="recom_click(item)">
                    <img :src="item.pic_url" alt="">
                    <p>{{ item.name }}</p>
                </li>
            </ul>
        </div>


        <div class="goods_deta_content">
            <h2>商品详情</h2>
            <div class="goods_deta_content_item" v-html="spu.content">
                {{ spu.content }}
            </div>
        </div>


        <div class="submit">
            <div class="submit_left" @click="cellKefu">
                <i class="iconfont icon-dianhua"></i>
                <p>联系客服</p>
            </div>
            <mu-button @click="submit">立即下单</mu-button>
        </div>


        <!--对话框-->
        <mu-dialog width="600" dialog-class="dio" max-width="91.5%" :overlay-close="false" :open.sync="openSimple">
            <div class="diolog_content">
                <div class="diolog_content_title">
                    <div class="diolog_content_item">
                        <img :src="obj_spu.pic_url" alt="">
                        <div class="diolog_content_name">
                            <h2>{{ obj_spu.name }}</h2>
                            <div class="diolog_content_price">
                                <p>￥</p>
                                <p v-if="price == null">{{obj_spu.max_price }} - {{ obj_spu.min_price }}</p>
                                <p v-if="price != null">{{ price }}</p>
                            </div>
                        </div>
                    </div>
                    <div class="close">
                        <i @click="closeSimpleDialog" class="iconfont icon-guanbi" ></i>
                    </div>
                </div>
                <ul class="diolog_content_list">
                    <li v-for="(item,k) in attribute" :key="item.attribute_id" @click.stop>
                        <h2>服务类型</h2>
                        <van-radio-group v-model="radio[k]" direction="horizontal" @change="van_radio(radio[k],item)">
                          <van-radio v-for="items in item.value" :key="items.attribute_value_id" :disabled="items.show" :name="items" shape="square">{{ items.attribute_value_name }}</van-radio>
                        </van-radio-group>
                    </li>
                </ul>
                <div class="diolog_content_num">
                    <h2>购买数量</h2>
<!--                    <van-stepper v-model="value" theme="round" button-size="22" disable-input />-->
                    <van-stepper v-model="value" />
                </div>

                <div class="goods_button">
                    <van-button @click="submit_click" >确认</van-button>
                </div>
            </div>
        </mu-dialog>


    </div>
</template>

<script>
    export default {
        data() {
            return{
                goods_list: [],
                openSimple: false,
                value: 1,
                radio: [],
                spu: {},
                obj_spu: {},
                price: null,
                attribute: [],
                value_list: [],
                attribute_list: [],
                power_set: [],
                sku_list: [],
                title: '',
                integrityurl:'',
                // logo:'https://m.tjqpjt.com/logo.png',
                desc:'提供企业发展全周期服务。主要包括：工商服务、财税服务、知识产权、企业咨询。',
                pic_url: ''
            }
        },
        created() {
            this.get_data(this.$route.query.id);
            this.get_goods();

        },
        watch: {
          $route: {
            handler() {
              this.get_data(this.$route.query.id);
            },
            deep: true
          }
        },
        methods: {
            // 推荐商品
            recom_click(e) {
              this.$router.push({
                path: "/order/goods_deta",
                query: {
                  id: e.id
                }
              })
            },
            // 提交确认
            submit_click() {

              if(this.price) {

                console.log(this.obj_spu)
                console.log(this.price)
                console.log(this.value)

                let obj_spu_deta= {}

                obj_spu_deta['obj_spus']= this.obj_spu
                obj_spu_deta['price']= this.price
                obj_spu_deta['num']= this.value
                obj_spu_deta['sku_id']= this.sku_id

                sessionStorage.setItem('obj',JSON.stringify(obj_spu_deta))

                this.$router.push({
                  path: '/orderDetails'
                })
              }else{
                this.$toast.error('请选择需要购买的商品');
              }


            },
            // 单选框
            van_radio(e,i) {
              console.log(e,i)
                this.$forceUpdate();
                i.check= true


                let radio_arr= []
                this.radio.forEach(item=> {
                  radio_arr.push(item.attribute_value_id)
                })

                let radio = radio_arr,
                    arr = [];
                for (let i = 0; i<radio.length; i++){
                  if(radio[i] != undefined){
                    arr.push(radio[i]);
                  }
                }

                let str = arr.join("-");
                // console.log(str);

                let arrs= []

                this.power_set.forEach((item)=> {
                  if(item.indexOf(String(str)) >-1 ) {
                    // console.log(item.split('-'))
                    arrs.push(item.split('-'))
                  }
                })


                // console.log(arrs)

                let arr_one= []

                arrs.forEach((item)=> {
                  item.forEach((items)=> {
                    arr_one.push(parseInt(items))
                  })
                })

                let set_arr_one= this.Set(arr_one)

                radio_arr.forEach((item)=> {
                  set_arr_one.forEach((items,k)=> {
                    if(item == items) {
                      set_arr_one.splice(k,1)
                    }
                  })
                })

                // console.log(set_arr_one)



                var arr_list= []

                this.attribute.forEach((item)=> {
                  if(!item.check) {
                    item.value.forEach((items)=> {
                      arr_list.push(items.attribute_value_id)
                    })
                  }
                })

                // 补集
                // console.log(arr_list.filter(function(v){ return !(set_arr_one.indexOf(v) > -1) }).concat(set_arr_one.filter(function(v){ return !(arr_list.indexOf(v) > -1)})))
                // 差集
                let dis =arr_list.filter(function(v){ return set_arr_one.indexOf(v) == -1 })

                let attr= this.attribute

                attr.forEach((item,j)=> {
                  item.value.forEach((z,m)=> {
                    dis.forEach((y)=> {
                      if(y == z.attribute_value_id) {
                        console.log(this.attribute[j].value[m])
                        attr[j].value[m].show= true
                      }
                    })
                  })
                })

                this.attribute= attr

                this.sku_list.forEach((item)=> {
                  if(radio_arr.length == item.attribute_value_ids.length) {
                    if(JSON.stringify(item.attribute_value_ids) == JSON.stringify(radio_arr) ) {
                      this.obj_spu.pic_url= item.pic_url
                      this.price= item.price
                      this.sku_id= item.id
                    }
                  }
                })
            },
            // 获取详情
            get_data(e) {
              this.$post(localStorage.getItem('http') + 'goods/get_detail',{
                id: e
              })
                .then(res=> {
                  console.log(res.data)

                  this.$wxShare(res.data.spu.name,this.desc,location.href,res.data.spu.pic_url)
                  res.data.attribute.forEach((i,k)=> {


                    res.data.attribute[k]['check']= false

                    this.value_list.push(i.value)
                    var n= null
                    if(i.value.length == 1) {
                      i.value.forEach(()=> {
                        // this.radio[k]= y.attribute_value_id
                        n = i.attribute_id
                      })
                    }

                    if(i.attribute_id != n) {
                      this.attribute_list.push(i)
                    }

                    // 禁用
                    i.value.forEach((e)=> {
                      e['show']= false
                    })

                  })



                  this.attribute= res.data.attribute
                  // sku
                  this.sku_list= res.data.sku
                  // 全部sku
                  this.power_set= res.data.power_set

                  // 商品详情
                  this.spu= res.data.spu
                  this.obj_spu= res.data.spu
                })
            },
            // 立即下单 打开对话框
            submit() {
              if(!sessionStorage.getItem('token')){
                this.$dialog.confirm({
                  title:'登录状态',
                  message:'未登录，请登录',
                })
                    .then(()=>{
                      this.$router.push('/login')
                    })
                    .catch(()=>{
                      console.log('未登录')
                    });
              }else{
                this.openSimple= true
              }
            },
            // 点击联系客服
            cellKefu(){
              if(!sessionStorage.getItem('token')){
                this.$dialog.confirm({
                  title:'登录状态',
                  message:'未登录，请登录',
                })
                    .then(()=>{
                      this.$router.push('/login')
                    })
                    .catch(()=>{
                      console.log('未登录')
                    });
              }else{
                this.$toast.success('联系客服');
              }
            },
            // 关闭对话框
            closeSimpleDialog() {
                this.openSimple= false
            },
            // 获取推荐商品
            get_goods() {
              this.$post(localStorage.getItem('http') + 'goods/get_list',{
                recommend: 1,
                page: 1,
                limit: 3
              })
                .then(res=> {
                  console.log(res.data.list)
                  this.goods_list= res.data.list


                })
            },
    }
    }
</script>

<style lang="less" scoped>
    // 金额
    .goods_deta{
        img{
            width: 100%;
            //height: 37.5vh;
            max-width: 500px;
            object-fit: cover;
        }
        .goods_deta_title{
            padding: 12px 16px;
            background: white;
            margin-bottom: 12px;
            h2{
                font-size: 15px;
                margin-bottom: 6px;
            }
            .goods_deta_price{
                display: flex;
                justify-content: space-between;
                .goods_deta_price_p{
                    display: flex;
                    align-items: center;
                    p{
                        color: #EA610E;
                    }
                }
                .goods_deta_price_p p:nth-child(1){
                    font-size: 12px;
                }
                .goods_deta_price_p p:nth-child(2){
                    font-size: 18px;
                }
                span{
                    color: #999999;
                    padding-top: 9px;
                }
            }
        }
    }
    // 推荐商品
    .recom_list{
        padding: 12px 16px;
        background: white;
        margin-bottom: 12px;
        h2{
            font-size: 16px;
            margin-bottom: 12px;
        }
        .recom_list_content{
            display: flex;
            li{
                width: 33.3%;
                display: flex;
                flex-direction: column;
                align-items: center;
                margin-right: 21px;
                img{
                    width: 100%;
                    /*height: 75.5px;*/
                    display: block;
                    margin-bottom: 8px;
                    object-fit: cover;
                }
                p{
                    font-size: 12px;
                }
            }
        }
        .recom_list_content li:nth-child(3){
            margin-right: 0;
        }
    }


    // 商品详情
    .goods_deta_content{
        background: white;
        margin-bottom: 75px;
        h2{
            padding: 12px 16px 16px;
            border-bottom: 1px solid #DDDDDD;
        }
        .goods_deta_content_item{
            padding: 16px;
            /deep/ img{
              width: 100%;
              object-fit: cover;
            }
        }
    }


    // 下单
    .submit{
        width: 100%;
        display: flex;
        justify-content: flex-end;
        align-items: center;
        padding: 16px;
        background: white;
        position: fixed;
        bottom: 0;
        .submit_left{
            display: flex;
            align-items: center;
            i{
                font-size: 16px;
                padding-bottom: 2px;
            }
            p{
                font-size: 16px;
                color: #888888;
                margin-left: 8px;
            }
        }
        .mu-button{
            width: 120px;
            height: 43px;
            margin-left: 16px;
            background: #FBA70A;
            box-shadow: 0px 3px 5px rgba(223,92,107,0.5);
            border-radius: 5px;
            /deep/ .mu-button-wrapper{
                color: white;
            }
        }
    }

    // 弹出框
    .diolog_content{
        .diolog_content_title{
            display: flex;
            justify-content: space-between;
            .close{
                .iconfont{
                    background: #F2F2F2;
                    padding: 5px 5px 5px 6px;
                    border-radius: 50%;
                    line-height: 13px;
                    font-size: 12px;
                    color: #999999;
                }
            }
            .diolog_content_item{
                padding-top: 6px;
                margin-bottom: 16px;
                display: flex;
                img{
                    width: 78px;
                    height: 78px;
                }
                .diolog_content_name{
                    margin-left: 12px;
                    h2{
                        max-width: 182px;
                        font-size: 14px;
                        margin-bottom: 6px;
                    }
                    .diolog_content_price{
                        display: flex;
                        align-items: center;
                        p{
                            color: #EA610E;
                        }
                    }
                    .diolog_content_price p:nth-child(1){
                        font-size: 12px;
                    }
                    .diolog_content_price p:nth-child(2){
                        font-size: 18px;
                    }
                }
            }
        }
        .diolog_content_list{
            border-bottom: 1px solid #CCCCCC;
            margin-bottom: 16px;
            li{
                display: flex;
                align-items: center;
                margin-bottom: 16px;
                h2{
                    width: 87px;
                    font-size: 14px;
                }
                .van-radio-group{
                    font-size: 12px;
                    width:calc(100% - 78px);
                    .van-radio{
                        padding: 4px 8px;
                        /*border: 1px solid #E6E6E6;*/
                        /deep/ .van-radio__icon{
                            font-size: 14px;
                        }
                    }
                }
            }
        }
        .diolog_content_num{
            display: flex;
            justify-content: space-between;
            margin-bottom: 36px;
            h2{
                font-size: 14px;
            }
            .van-stepper{

            }
        }
        .goods_button{
            display: flex;
            justify-content: center;
            .van-button{
                width: 80%;
                height: 40px;
                background: #1672F9;
                border-radius: 20px;
                box-shadow: none;
                /deep/ .van-button__text{
                    color: white;
                    font-size: 17px;
                }
            }
        }

    }


</style>