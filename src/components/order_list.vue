<template>
    <div class="bg">
      <div class="posi_b">
          <div class="search_b" >
            <input type="text" placeholder="请输入您想搜索的名称" v-model="search_t" @change="search_btn">
            <img src="../assets/my_order/search_icon.png" alt="">
          </div>
          <ul class="sort">
            <li @click="click_blue(1)" :class="[ indexs==1 ? 'blue' : '' ]">
              <p>综合</p>
            </li>
            <li @click="click_blue(2)" :class="[ indexs==2 ? 'blue' : '' ]">
              <p>销量</p>
            </li>
            <li @click="click_blue(3)" :class="[ indexs==3 ? 'blue' : '' ]">
<!--              <p>价格</p>-->
              <van-popover
                  v-model="showPopover"
                  trigger="click"
                  :actions="actions"
                  @select="onSelect"
                  border-radius="2px"
              >
                <template #reference>
                  <p>{{price_t}}</p>
                  <i class="iconfont icon-xiangxia-copy1"></i>
                </template>
              </van-popover>
            </li>
          </ul>
        </div>
      <div class="goods_list_b" :class="{goods_list_b_top:is_headerBarShow}">
        <ul class="goods_list">
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
      <div class="nullBox" v-show="show13">
        <img src="../assets/buSchool/nullBoxImg2.png" alt="">
      </div>


    </div>
</template>

<script>
    export default {
        data() {
            return{
                indexs: 1,
                flag: true,
                list_form: {
                  category_pid: null,
                  quality: null,
                  order:1
                },
                show13:false,
                goods_list: [],
                title: '商品列表',
                integrityurl:'',
                // logo:'https://m.tjqpjt.com/logo.png',
                desc:'提供企业发展全周期服务。主要包括：工商服务、财税服务、知识产权、企业咨询。',
                imgUrl: 'https://m.tjqpjt.com/logo.png',
                search_t:'',
                showPopover: false,
                actions: [{ text: '升序' }, { text: '降序' }],
                price_t:'价格',
                option:{
                  text:'',
                },
                page:1,
                limit:8,
                is_headerBarShow:true,

            }
        },
        created() {
          // console.log(this.$route)
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
          if(this.$route.query.pid) {
            // console.log(this.$route.query.id)
            this.list_form.category_pid= this.$route.query.pid
            this.get_list(this.list_form)
          }
          this.$wxShare(this.title, this.desc, location.href, this.imgUrl);

          var openid_bar = localStorage.getItem('invite_openid');
          if(!openid_bar){
            this.is_headerBarShow = false
          }else{
            this.is_headerBarShow = true
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
            get_list( y) {
              this.$post(localStorage.getItem('http') + 'goods/get_list',y)
                .then(res=> {
                  // console.log(res)
                  this.goods_list = res.data.list
                  // if(res.data.list.length != 0){
                  //   var arr = [];
                  //   arr = this.goods_list;
                  //   res.data.list.forEach(function(v){
                  //     arr.push(v);
                  //   })
                  //   this.goods_list = arr;
                  //   this.show13 = false
                  // }else{
                  //   //没有了
                  //   // this.$toast.error('没有更多了!');
                  //   window.removeEventListener("scroll",this.onScroll);
                  //   this.show13 = true
                  // }
                })
            },
            click_blue(e) {
              this.list_form.order = e;
              if(e == 1) {
                // 综合
                this.indexs = e
                this.price_t = '价格'
                this.get_list(this.list_form);
              }else if(e == 2){
                // 销量
                this.indexs = e
                this.price_t = '价格'
                this.get_list(this.list_form);
              }
              else{
                this.onSelect();
              }


            },
            search_btn(){
              this.$post(localStorage.getItem('http') + 'goods/get_list',{
                page: this.page,
                limit: this.limit,
                keyword: this.search_t,
                category_pid:0,
                category_id: 0,
                quality: 0,
                recommend: 0
              })
              .then(res=> {
                // console.log(res)
                this.goods_list = res.data.list
              })
            },
            onSelect(action){
              if(action != undefined){
                this.price_t = action.text + '价格'
                this.indexs = 3
                if(this.price_t == '升序价格'){
                  this.list_form.order = 3;
                  this.get_list(this.list_form);
                }
                if(this.price_t == '降序价格'){
                  this.list_form.order = 4;
                  this.get_list(this.list_form);
                }
              }
            },

        },

    }
</script>

<style lang="less" scoped>
.bg{
  position: relative;
  width: 100%;
  background-color: #ffffff;
  .posi_b {
    width: 100%;
    position: absolute;
    left: 0;
    top: 0;
    background-color: #ffffff;
    padding: 20px 0 0;
    box-sizing: border-box;
    height: 100px;
    .search_b{
      position: relative;
      width: 100%;
      padding: 0 16px;
      box-sizing: border-box;
      input{
        width: 100%;
        height: 32px;
        background: #F4F3F8;
        opacity: 1;
        border-radius: 5px;
        outline: none;
        border: 0;
        padding: 0 36px;
        box-sizing: border-box;
      }
      img{
        position: absolute;
        left: 26px;
        top: 50%;
        margin-top: -8px;
        width: 16px;
        height: 16px;
      }
    }
    .sort{
      //position: fixed;
      //top: 56px;
      //left: 0;
      width: 100%;
      height: 48px;
      display: flex;
      justify-content: center;
      background: white;
      border-bottom: 1px solid #DDDDDD;
      padding: 0 25px;
      li{
        flex: 1;
        display: flex;
        justify-content: center;
        //align-items: flex-end;
        align-items: center;
        p{
          font-size: 12px;
          color: #999999;
          display: inline;
        }
        .iconfont{
          font-size: 12px;
          line-height: 18px;
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
  }
}
.nullBox {
  width: 100%;
  text-align: center;
  img {
    width: 50%;
    height: 50%;
    object-fit: cover;
  }
}
.goods_list_b{
  width: 100%;
  padding: 100px 0 0 0;
  box-sizing: border-box;
  overflow: auto;
  min-height: calc(100vh);
  max-height: calc(100vh);
  .goods_list{
    padding: 16px 16px 0;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    li{
      width: 47%;
      box-shadow:0px 0px 10px rgba(0,0,0,0.16);
      margin-bottom: 16px;
      img{
        width: 100%;
        height: 178px;
        object-fit: cover;
      }
      .goods_list_li{
        padding: 10px 8px;
        h2{
          font-size: 14px;
          margin-bottom: 8px;
        }
        .goods_list_li_price_num{
          display: flex;
          justify-content: space-between;
          align-items: center;
          .goods_list_li_price{
            display: flex;
            align-items: center;
            p{
              color: #EA610E;
            }
          }
          .goods_list_li_price p:nth-child(1){
            font-size: 12px;
          }
          .goods_list_li_price p:nth-child(2){
            font-size: 18px;
          }
          span{
            font-size: 12px;
            color: #999999;
          }
        }
      }
    }
  }
}
.goods_list_b_top{
  min-height: calc(100vh - 50px)!important;
  max-height: calc(100vh - 50px)!important;
}
</style>