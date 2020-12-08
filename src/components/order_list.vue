<template>
    <div>
        <ul class="sort">
            <li @click="click_blue(1)" :class="[ indexs==1 ? 'blue' : '' ]">
                <p>综合</p>
                <i class="iconfont icon-xiangxia-copy1"></i>
            </li>
            <li @click="click_blue(2)" :class="[ indexs==2 ? 'blue' : '' ]">
                <p>销量</p>
                <i class="iconfont icon-xiangxia-copy1"></i>
            </li>
        </ul>

        <ul class="goods_list" style="padding-top: 20px; ">
            <li v-for="item in goods_list" :key="item.id" @click="goods_list_deta(item)" >
                <img :src="item.pic_url" alt="">
                <div class="goods_list_li">
                    <h2>{{ item.name }}</h2>
                    <div class="goods_list_li_price_num">
                        <div class="goods_list_li_price">
<!--                            <p>￥</p>-->
<!--                            <p>1965</p>-->
                          <p>{{ item.price }}</p>
                        </div>
                        <span>{{ item.sell }}人付款</span>
                    </div>
                </div>
            </li>
        </ul>


    </div>
</template>

<script>
    export default {
        data() {
            return{
                indexs: null,
                flag: true,
                list_form: {
                  category_pid: null,
                  quality: null
                },
                goods_list: []
            }
        },
        created() {
          console.log(this.$route)
          if(this.$route.query.quality) {
            // console.log(this.$route.query.quality)
            this.list_form.quality= this.$route.query.quality
            this.get_list(this.list_form)
          }
          if(this.$route.query.id) {
            // console.log(this.$route.query.id)
            this.list_form.category_id= this.$route.query.id
            this.get_list(this.list_form)
          }

        },
        methods: {
            // 跳转商品详情
            goods_list_deta(item) {
              this.$router.push({
                path: '/order/goods_deta',
                query: {
                  id: item.id
                }
              })
            },
            // 获取列表
            get_list(y) {
              this.$post(localStorage.getItem('http') + 'goods/get_list',y)
                .then(res=> {
                  console.log(res.data.list)

                  this.goods_list= res.data.list

                })
            },
            click_blue(e) {


              if(e == 1) {
                // 综合
                if(e == 1 && this.flag) {
                  console.log(e)
                  this.indexs= e
                  this.flag= !this.flag
                }else{
                  this.indexs= null
                  this.flag= !this.flag
                }
              }else{
                // 销量
                if(e == 2 && this.flag) {
                  console.log(e)
                  this.indexs= e
                    this.flag= !this.flag
                }else{
                    this.indexs= null
                    this.flag= !this.flag
                }
              }

            }
        }
    }
</script>

<style lang="less" scoped>
    .sort{
        display: flex;
        justify-content: center;
        padding: 8px 0;
        background: white;
        border-bottom: 1px solid #DDDDDD;
        li{
            display: flex;
            justify-content: center;
            align-items: flex-end;
            p{
                font-size: 12px;
                color: #999999;
            }
            .iconfont{
                font-size: 12px;
                line-height: 16px;
                color: #999999;
            }
        }
        .blue{
            p{
                color: #1672F9;
            }
            .iconfont{
                color: #1672F9;
            }
        }
    }
    .sort li:nth-child(2){
        margin-left: 35%;
    }
</style>