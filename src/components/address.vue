<template>
    <div>

        <div class="add_address" @click="address_router">
            <div class="add_address_left">
                <img src="../assets/deta/deta1.png" alt="">
                <p>新增收货地址</p>
            </div>
            <i class="iconfont icon-fanhui"></i>
        </div>

        <div class="address_content" v-for="item in address_list" :key="item.id" >
            <div class="address_content_name" @click="address_click(item)">
                <div class="address_content_name_phone">
                    <p>{{ item.name }}</p>
                    <p>{{ item.real_phone }}</p>
                </div>
                <p class="address_content_address">{{ item.province.name + item.city.name + item.area.name }}{{ item.address }}</p>
            </div>
            <div class="address_content_edit">
                <p :class="[item.is_def== 1? 'address_content_edit_p p': 'address_content_edit_p']">默认地址</p>
                <div class="address_content_edit_icon" @click="edit_click(item)">
                    <i></i>
                    <p>编辑</p>
                </div>
            </div>
        </div>
      <noSharing></noSharing>
    </div>
</template>

<script>
    import noSharing from "@/components/noSharing";

    export default {
        data() {
            return{
                address_list: []
            }
        },
        created() {
            this.get_list()
        },
        methods: {
            // 选中收货地址跳转等待支付页面
            address_click(i) {
              this.$router.push({
                path: '/orderDetails',
                query: {
                  address_id: i.id
                }
              })
              console.log(this.address_id)
            },
            // 获取收货地址列表
            get_list() {
              this.$post(localStorage.getItem('http') + 'user_address/get_list',{
                token: sessionStorage.getItem('token')
              })
                  .then(res=> {
                      console.log(res.data.list)
                      this.address_list= res.data.list
                  })
            },
            // 跳转添加收货地址
            address_router() {
                this.$router.push({
                    path: 'add_address'
                })
            },
            // 跳转编辑地址
            edit_click(i) {
                this.$router.push({
                    path: 'edit_address',
                    query: {
                      id: i.id
                    }
                })
            }
        },
        components: {
          noSharing
        }
    }
</script>

<style lang="less" scoped>
    .add_address{
        margin: 12px 0;
        background: white;
        padding: 10px 16px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .add_address_left{
            display: flex;
            align-items: center;
            img{
                width: 24px;
                height: 24px;
            }
            p{
                font-size: 14px;
                margin-left: 8px;
            }
        }
        .iconfont{
            font-size: 12px;
            transform: rotate(180deg);
        }
    }
    .address_content{
        padding: 16px;
        background: white;
        margin-bottom: 12px;
        .address_content_name{
            border-bottom: 1px solid #DDDDDD;
            .address_content_name_phone{
                display: flex;
                justify-content: space-between;
                margin-bottom: 6px;
                p{
                    font-size: 14px;
                }
            }
            .address_content_name_phone p:nth-last-child(1){

            }
            .address_content_name_phone p:nth-last-child(2){
                color: #999999;
            }
            .address_content_address{
                font-size: 12px;
                color: #666666;
                margin-bottom: 12px;
            }
        }
        .address_content_edit{
            display: flex;
            justify-content: space-between;
            padding-top: 11px;
            .address_content_edit_p{
                color: #999999;
                padding: 2px 5px 1.5px 5px;
                background: rgba(153,153,153,.2);
                border-radius: 2px;
            }
            .p{
              color: #1672F9;
              background: rgba(22,114,249,.2);
            }
            .address_content_edit_icon{
                display: flex;
                i{

                }
                p{

                }
            }
        }
    }
</style>