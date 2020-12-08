<template>
    <div style="border-top: 1px solid #DDDDDD;">
        <div class="all_service" style="margin-top:70px;margin-bottom: 62px;">
            <div class="all_service_item" v-for="item in list" :key="item.id">
                <h2>{{ item.name }}</h2>
                <ul class="all_service_ul">
                    <li v-for="items in item.child" :key="items.id" @click="all_service_child(items)" >
                        <img :src="items.phone_icon" alt="">
                        <p>{{ items.name }}</p>
                    </li>
                </ul>
            </div>
        </div>
    <footer_nav></footer_nav>
    </div>
</template>

<script>

    import footer_nav from "@/components/footer_bar";

    export default {
        data() {
            return{
                list: []
            }
        },
      created() {
          this.get_list()
      },
      methods: {
          get_list() {
            this.$post(localStorage.getItem('http') + 'goods_category/get_nav')
              .then(res=> {
                  console.log(res.data)
                  this.list= res.data
              })
          },
          all_service_child(e) {
            this.$router.push({
              path: '/order_list',
              query: {
                id: e.id
              }
            })
          }
      },
      components: {
        footer_nav
      }
    }
</script>

<style lang="less" scoped>
    .all_service{
        background: #F9F9F9;
        .all_service_item{
            margin-bottom: 12px;
            background: #ffffff;
            padding: 20px 0px 0;
            h2{
                font-size: 18px;
                margin-bottom: 16px;
                margin-left: 16px;
            }
            .all_service_ul{
                /*display: flex;*/
                overflow: hidden;
                li{
                    float: left;
                    cursor: pointer;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    width: 48px;
                    height: 68.5px;
                    margin-bottom: 20px;
                    margin-right: 29.5px;
                    margin-left: 16px;
                    img{
                        width: 27px;
                        height: 24.5px;
                        margin-bottom: 8px;
                    }
                    p{
                        font-size: 12px;
                    }
                }
            }
        }
    }
</style>