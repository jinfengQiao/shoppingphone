<template>
    <div>
        <van-form @submit="onSubmit(form)">
            <van-field
                v-model="form.name"
                name="name"
                placeholder="收货人姓名"
                :rules="[{ required: true, message: '请填写收货人姓名' }]"
            />
            <van-field
                v-model="form.phone"
                name="phone"
                placeholder="收货人联系方式"
                :rules="[
                        { required: true, message: '请填写收货人联系方式' },
                        { pattern: /^1[34578]\d{9}$/, message: '请输入正确收货人联系方式' }
                    ]"
            />
            <van-field
                class="address_select"
                readonly
                clickable
                name="area"
                :value="form.value"
                label="所在地区"
                placeholder="点击选择省市区"
                @click="showArea = true"
                :rules="[{ required: true, message: '请选择所在地区' }]"
            />
              <van-popup v-model="showArea" position="bottom">
                <van-area
                    title="请选择地区"
                    :area-list="areaList"
                    @confirm="onConfirm"
                    @cancel="showArea = false"
                />
              </van-popup>


            <van-field
                v-model="form.address"
                name="address"
                placeholder="详细地址"
                :rules="[{ required: true, message: '请填写详细地址' }]"
            />



            <van-field class="address" name="is_def" label="设为默认地址">
                <template #input>
                    <van-switch v-model="form.is_def" inactive-color="#DDDDDD" size="20" />
                </template>
            </van-field>


            <div class="add_button">
                <van-button round block type="info" native-type="submit">
                    提交
                </van-button>
            </div>


        </van-form>
    </div>
</template>

<script>
    export default {
        data() {
            return{
                form: {
                  name: null,
                  phone: null,
                  address: null,
                  is_def: false,
                  province_id: null,
                  city_id: null,
                  area_id: null,
                },
                showArea: false,
                areaList: [],
            }
        },
        created() {
          // 获取地区
          this.get_region()
        },
        methods: {
            // 新增收货人
            user_address_edit(y) {
              this.$post(localStorage.getItem('http') + 'user_address/edit',y)
                .then(res=> {
                  if(res.code == 1) {
                    this.$router.go(-1)
                    this.$toast.success(res.msg);
                  }else{
                    this.$toast.error(res.msg);
                  }
                })
            },
            // 获取地区
            get_region() {
              this.$post(localStorage.getItem('http') + 'region/get_region_list')
                .then(res=> {
                  // console.log(res)
                  this.areaList= res.data
                })
            },
            onSubmit(values) {
                // console.log(values)
                let obj= {}

                obj['name']= values.name
                obj['phone']= values.phone
                obj['address']= values.address
                obj['province_id']= values.province_id
                obj['city_id']= values.city_id
                obj['area_id']= values.area_id
                obj['token']= sessionStorage.getItem('token')
                if(values.is_def) {
                  obj['is_def']= 1
                }else{
                  obj['is_def']= 0
                }


                this.user_address_edit(obj)

            },
            onConfirm(values) {
              console.log(values[0])
              this.form.province_id= values[0].code
              this.form.city_id= values[1].code
              this.form.area_id= values[2].code

              this.form.value = values.map((item) => item.name).join('/');
              this.showArea = false;
            },
        }
    }
</script>

<style lang="less" scoped>
    .van-form{
        margin-top: 12px;
        .van-cell{
            padding: 12px 16px;
        }
    }
    .van-form /deep/ .van-field__control{
        display: flex;
        justify-content: flex-end;
    }

    .address /deep/ .van-cell__title{
        span{
            color: #1672F9;
        }
    }
    .address_select /deep/ .van-cell__title{
        span{
            color: #666666;
        }
    }


    .add_button{
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
            background: linear-gradient(136deg,rgba(106,174,255,1) 0%,rgba(0,94,255,1) 100%);
            box-shadow: 0px 2px 3px rgba(9,101,255,0.3);
            .van-button__text{
                color: white;
            }
        }
    }
</style>