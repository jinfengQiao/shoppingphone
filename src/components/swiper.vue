<template>
    <div>
        <mu-carousel transition="fade" :hide-indicators="true" :hide-controls="true">
            <mu-carousel-item v-for="item in list" :key="item.id" >
                <img :src="item.phone_pic_url" alt="">
            </mu-carousel-item>
        </mu-carousel>
    </div>
</template>

<script>
    export default {
        data() {
            return{
                list: ''
            }
        },
        created() {
            // 获取swiper
            this.get_swiper()
        },
        methods: {
            get_swiper() {
                this.$post(localStorage.getItem('http') + 'banner/get_shop_banner')
                    .then((res)=> {
                        // console.log(res.data)

                        res.data.forEach((item,k)=> {
                            res.data[k].phone_pic_url= item.phone_pic_url
                        })

                        this.list= res.data
                    })
            }
        }
    }
</script>

<style lang="less" scoped>
    .mu-carousel{
        width: 100%;
        height: 175px;
        img{
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
    }
</style>