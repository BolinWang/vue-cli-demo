<template>
    <section class="put-forward-detail-wrap">
        <ul class="form-detail">
            <li>
                <label>
                    <span>持卡人</span>
                    <input type="text" maxlength="10" v-model="bankCardName"/>
                </label>
            </li>
            <li>
                <label>
                    <span>卡号</span>
                    <input type="text" maxlength="19" v-model="bankCardNumber"/>
                </label>
            </li>
            <li>
                <div class="li-flex">
                    <div class="_left" @click="showPopupProvinceVisible">
                        <label>
                            <span>省市</span>
                            <input type="text" readonly v-model="province"/>
                            <t-icon name="jiantx"></t-icon>
                        </label>
                    </div>
                    <div class="_right" @click="showPopupCityVisible">
                        <label>
                            <span>城市</span>
                            <input type="text" readonly v-model="city"/>
                            <t-icon name="jiantx"></t-icon>
                        </label>
                    </div>
                </div>
            </li>
            <li>
                <label>
                    <span>分支行</span>
                    <input type="text" maxlength="100" v-model="bankName"/>
                </label>
            </li>
            <li>
                <label>
                    <span>手机号</span>
                    <input type="text" maxlength="11" v-model="phoneNumber"/>
                </label>
            </li>
            <li>
                <label>
                    <span>身份证号</span>
                    <input type="text" maxlength="18" v-model="idCardNumber"/>
                </label>
            </li>
        </ul>

        <button class="save-btn" @click="doSave" :disabled="popupUI.PopupUILoading">保存</button>

        <p class="tip">
            注意事项： <br/>
            1.银行卡信息用来提现收款<br/>
            2.请确保姓名、卡号、分支行、省市及身份证号码真实准确并且匹配<br/>
            3.验证通过后身份证号码不可修改<br/>
            4.补全信息后您还需要签订兼职劳动合同<br/>
            5.海外店主请添加官方管家：qxzl02 提供提现所需信息
        </p>

        <mt-popup
            class="putForward-detail-mt-popup"
            v-model="popupProvinceVisible"
            position="bottom">
            <div class="title">
                <div class="_left" @click="provinceCancel">
                    <t-icon name="guanbi"></t-icon>
                </div>
                <div class="_center">选择省市</div>
                <div class="_right" @click="provinceConfirm">
                    <t-icon name="duigou"></t-icon>
                </div>
            </div>
            <mt-picker :slots="provinceSlots" valueKey="aname" @change="onProvinceValueChange"></mt-picker>
        </mt-popup>

        <mt-popup
            class="putForward-detail-mt-popup"
            v-model="popupCityVisible"
            position="bottom">
            <div class="title">
                <div class="_left" @click="cityCancel">
                    <t-icon name="guanbi"></t-icon>
                </div>
                <div class="_center">选择城市</div>
                <div class="_right" @click="cityConfirm">
                    <t-icon name="duigou"></t-icon>
                </div>
            </div>
            <mt-picker :slots="citySlots" valueKey="aname" @change="onCityValueChange"></mt-picker>
        </mt-popup>
    </section>
</template>
<script>
import { mapState, mapGetters, mapActions, mapMutations } from 'vuex'
import { isRealIdCard } from '@/tools/check'
import pageShareMixin from '@/mixins/pageShare.js'

export default {
    mixins: [pageShareMixin],
    computed: {
        ...mapState({
            'pageInfo': 'pagePutForwardDetail',
            'popupUI': 'popupUI'
        }),
        provinceSlots(){
            let { pageInfo } = this;
            return pageInfo.provinceSlots || [];
        },
        citySlots(){
            let { pageInfo } = this;
            return pageInfo.citySlots || [];
        },
        popupProvinceVisible: {
            set(val){
                this.setPopupProvinceVisible(val);
            },
            get(){
                let { pageInfo } = this;
                return pageInfo.popupProvinceVisible || false;
            }
        },
        popupCityVisible: {
            set(val){
                this.setPopupCityVisible(val);
            },
            get(){
                let { pageInfo } = this;
                return pageInfo.popupCityVisible || false;
            }
        },
        withdrawInfo(){
            let { pageInfo: { withdrawInfo } } = this;
            return withdrawInfo || {};
        },
        bankCardName: {
            set(bankCardName){
                this.updateWithdrawInfo({ bankCardName });
            },
            get(){
                let { pageInfo: { withdrawInfo } } = this;
                return withdrawInfo.bankCardName;
            }
        },
        bankCardNumber: {
            set(bankCardNumber){
                this.updateWithdrawInfo({ bankCardNumber });
            },
            get(){
                let { pageInfo: { withdrawInfo } } = this;
                return withdrawInfo.bankCardNumber;
            }
        },
        bankName: {
            set(bankName){
                this.updateWithdrawInfo({ bankName });
            },
            get(){
                let { pageInfo: { withdrawInfo } } = this;
                return withdrawInfo.bankName;
            }
        },
        city: {
            set(city){
                this.updateWithdrawInfo({ city });
            },
            get(){
                let { pageInfo: { withdrawInfo } } = this;
                return withdrawInfo.city;
            }
        },
        province: {
            set(province){
                this.updateWithdrawInfo({ province });
            },
            get(){
                let { pageInfo: { withdrawInfo } } = this;
                return withdrawInfo.province;
            }
        },
        phoneNumber: {
            set(phoneNumber){
                this.updateWithdrawInfo({ phoneNumber });
            },
            get(){
                let { pageInfo: { withdrawInfo } } = this;
                return withdrawInfo.phoneNumber;
            }
        },
        idCardNumber: {
            set(idCardNumber){
                this.updateWithdrawInfo({ idCardNumber });
            },
            get(){
                let { pageInfo: { withdrawInfo } } = this;
                return withdrawInfo.idCardNumber;
            }
        },
        tempProvince(){
            let { pageInfo } = this;
            return pageInfo.tempProvince;
        },
        tempCity(){
            let { pageInfo } = this;
            return pageInfo.tempCity;
        }
    },
    created(){
        this.resetData();
        this.loadData();
    },
    methods: {
        ...mapMutations({
            'resetData': 'pagePutForwardDetail/resetData',
            'updateWithdrawInfo': 'pagePutForwardDetail/updateWithdrawInfo',
            'setTempCity': 'pagePutForwardDetail/setTempCity',
            'setTempProvince': 'pagePutForwardDetail/setTempProvince',
            'setPopupProvinceVisible': 'pagePutForwardDetail/setPopupProvinceVisible',
            'setPopupCityVisible': 'pagePutForwardDetail/setPopupCityVisible',
            'updateCitys': 'pagePutForwardDetail/updateCitys'
        }),
        ...mapActions({
            'loadData': 'pagePutForwardDetail/loadData',
            'saveWithdrawInfo': 'pagePutForwardDetail/saveWithdrawInfo'
        }),
        doCheck(){
            let { bankCardName, bankCardNumber, bankName, city, province, phoneNumber, idCardNumber } = this;
            if(!bankCardName){
                return '请输入持卡人姓名';
            }else if(!bankCardNumber){
                return '请输入卡号';
            }else if(/\D/.test(bankCardNumber)){
                return '卡号有误';
            }else if(!province){
                return '请选择省市';
            }else if(!city){
                return '请选择城市';
            }else if(!bankName){
                return '请输入分支行';
            }else if(!phoneNumber){
                return '请输入手机号';
            }else if(!/\d{11}/.test(phoneNumber)){
                return '手机号有误';
            }else if(!idCardNumber){
                return '请输入身份证号';
            }else if(!isRealIdCard(idCardNumber)){
                return '身份证号有误';
            }
        },
        doSave(){
            let desc = this.doCheck();
            if(desc){
                this.actionVuexMessageShow(desc);
                return;
            }
            this.saveWithdrawInfo().then(()=>{
                //保存成功了
                this.$router.back();
            });
        },
        provinceCancel(){
            this.setPopupProvinceVisible(false);
        },
        provinceConfirm(){
            let { province, tempProvince } = this;
            this.setPopupProvinceVisible(false);
            if(province != tempProvince){
                this.updateWithdrawInfo({ province: tempProvince });
                this.updateCitys();
            }
        },
        onProvinceValueChange(picker, values){
            this.setTempProvince(values[0].aname);
        },
        cityCancel(){
            this.setPopupCityVisible(false);
        },
        cityConfirm(){
            let { city, tempCity } = this;
            this.setPopupCityVisible(false);
            if(city != tempCity){
                this.updateWithdrawInfo({ city: tempCity });
            }
        },
        onCityValueChange(picker, values){
            this.setTempCity(values[0].aname);
        },
        showPopupProvinceVisible(){
            this.setPopupProvinceVisible(true);
        },
        showPopupCityVisible(){
            this.setPopupCityVisible(true);
        }
    }
}
</script>
<style lang="less">
.put-forward-detail-wrap{
    .mint-popup{
        transform: translate3d(-50%,0,1px);
    }
    .picker-item{
        color: #e0e0e0;
    }
    .picker-item.picker-selected{
        color:#000;
    }
    .picker-items{
        width:100%;
    }
}
</style>
<style lang="less" scoped>
section{
    font-family:PingFangSC-Regular;
    background:white;
    .form-detail{
        width:3.065rem;
        margin: 0 auto;
        margin-bottom:0.45rem;
        padding-top:0.25rem;
        li{
            height:0.55rem;
            line-height:0.55rem;
            border-bottom:1px solid rgba(224,224,224,1);
            .li-flex{
                display:flex;
                ._left, ._right{
                    flex:1;
                    width:50%;
                    input{
                        width:0.75rem;
                        margin-left:0;
                        text-align: center;
                    }
                }
            }
            span{
                color:#999999;
                font-size:0.14rem;
            }
            input{
                padding:0;
                outline: none;
                height:0.2rem;
                line-height:0.2rem;
                margin-left:0.14rem;
                font-size:0.14rem;
                color:rgba(34,34,34,1);
                width:2rem;
                border:none;
            }
        }
    }
    button.save-btn{
        display: block;
        width:2.65rem;
        height:0.49rem;
        background:rgba(255,172,45,1);
        border-radius:0.27rem;
        border:none;
        padding:0;
        font-size:0.16rem;
        font-family:PingFangSC-Medium;
        font-weight:500;
        color:rgba(255,255,255,1);
        line-height:0.225rem;
        letter-spacing:0.01rem;
        margin:0 auto;
        margin-bottom:0.3rem;
        &:disabled{
            background:#ccc;
        }
    }
    p.tip{
        width:3.15rem;
        font-size:0.14rem;
        color:rgba(153,153,153,1);
        line-height:0.24rem;
        margin: 0 auto;
    }
    .putForward-detail-mt-popup{
        width:100%;
        .title{
            display: flex;
            height:0.75rem;
            line-height:0.75rem;
            text-align:center;
            ._left, ._right{
                flex: 0 0 0.65rem;
                width:0.65rem;
                i{
                    font-size:0.22rem;
                    line-height:0.22rem;
                    color:rgba(34,34,34,1);
                    font-weight: bold;
                }
            }
            ._right{
                i{
                    color:#00BBBB;
                }
            }
            ._center{
                flex: auto;
                min-width: 0;
                font-size:0.16rem;
                font-family:PingFangSC-Regular;
                font-weight:400;
                color:rgba(34,34,34,1);
            }
            
        }
    }
}
</style>

