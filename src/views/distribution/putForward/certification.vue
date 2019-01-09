<template>
    <section class="putForward-certification-wrap" v-if="pageInfo.dataIsLoad">

        <div class="section-bg">

        </div>

        <div class="section-main">
            
            <ul>
                <li>
                    <label>
                        <div class="li-content border5">
                            <div class="_left">
                                真实姓名
                            </div>
                            <div class="_center">
                                <input type="text" maxlength="10" v-model.trim="bankCardName"/>
                            </div>
                        </div>
                    </label>
                </li>
                <li>
                    <label>
                        <div class="li-content border5">
                            <div class="_left">
                                银行卡号
                            </div>
                            <div class="_center">
                                <input type="tel" maxlength="23" v-model.trim="bankCardNumber"/>
                            </div>
                        </div>
                    </label>
                </li>
                <li @click="showIdCardTypePopup">
                    <label class="idcard">
                        <div class="li-content border5">
                            <div class="_left">
                                证件类型
                            </div>
                            <div class="_center">
                                <input type="tel" maxlength="30" readonly :value="idCardType"/>
                            </div>
                            <div class="_right">
                                <t-icon name="jiantx"></t-icon>
                            </div>
                        </div>
                    </label>
                </li>
                <li>
                    <label>
                        <div class="li-content border5">
                            <div class="_left">
                                证件号码
                            </div>
                            <div class="_center">
                                <input type="tel" maxlength="18" v-model.trim="idCardNumber"/>
                            </div>
                        </div>
                    </label>
                </li>
                <li>
                    <label>
                        <div class="li-content border5">
                            <div class="_left">
                                手机号码
                            </div>
                            <div class="_center">
                                <input type="tel" maxlength="11" v-model.trim="phoneNumber"/>
                            </div>
                        </div>
                    </label>
                </li>
            </ul>

            <p class="agreement">
                <label>
                    <input type="checkbox" v-model="isAgree"/><span></span>我同意相关<router-link to="/distribution/putForward/agreement">服务协议</router-link>
                </label>
            </p>

            <button class="confirm-btn" :disabled="confirmDisabled" @click="doSave">开始验证</button>
        </div>

        
        <mt-popup
            class="idCardType-popup"
            v-model="idCardTypePopupVisible"
            position="bottom">
            <div class="title">
                <div class="_left" @click="idCardTypePopupCancel">
                    <t-icon name="guanbi"></t-icon>
                </div>
                <div class="_center">选择证件类型</div>
                <div class="_right" @click="idCardTypePopupConfirm">
                    <t-icon name="duigou"></t-icon>
                </div>
            </div>
            <mt-picker :slots="idCardTypeSlots" @change="onIdCardTypePopupValuesChange"></mt-picker>
        </mt-popup>
        
    </section>
</template>
<script>
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'
import { isRealIdCard } from '@/tools/check'
import pageShareMixin from '@/mixins/pageShare.js'

export default {
    mixins: [pageShareMixin],
    data(){
        return {
            getPhoneCodeing: false,
        }
    },
    computed: {
        ...mapState({
            'pageInfo': 'pagePutForwardCertification',
            'popupUI': 'popupUI'
        }),
        bankCardName: {
            set(bankCardName){
                this.setWithdrawInfo({ bankCardName });
                sessionStorage.setItem('putForward-certification-bankCardName', bankCardName);
            },
            get(){
                let { pageInfo: { withdrawInfo } } = this;
                return withdrawInfo.bankCardName || '';
            }
        },
        bankCardNumber: {
            set(bankCardNumber){
                bankCardNumber = bankCardNumber.replace(/\s/g, '');
                this.setWithdrawInfo({ bankCardNumber });
                sessionStorage.setItem('putForward-certification-bankCardNumber', bankCardNumber);
            },
            get(){
                let { pageInfo: { withdrawInfo: { bankCardNumber } } } = this;
                bankCardNumber = bankCardNumber.replace(/\s/g, '').replace(/(.{4})/g, "$1 ");
                return bankCardNumber || '';
            }
        },
        idCardType: {
            set(idCardType){
                this.setWithdrawInfo({ idCardType });
                sessionStorage.setItem('putForward-certification-idCardType', idCardType);
            },
            get(){
                let { pageInfo: { withdrawInfo } } = this;
                return withdrawInfo.idCardType || '';
            }
        },
        idCardNumber: {
            set(idCardNumber){
                this.setWithdrawInfo({ idCardNumber });
                sessionStorage.setItem('putForward-certification-idCardNumber', idCardNumber);
            },
            get(){
                let { pageInfo: { withdrawInfo } } = this;
                return withdrawInfo.idCardNumber || '';
            }
        },
        phoneNumber: {
            set(phoneNumber){
                this.setWithdrawInfo({ phoneNumber });
                sessionStorage.setItem('putForward-certification-phoneNumber', phoneNumber);
            },
            get(){
                let { pageInfo: { withdrawInfo } } = this;
                return withdrawInfo.phoneNumber || '';
            }
        },
        isAgree: {
            set(val){
                this.setIsAgree(val);
                sessionStorage.setItem('putForward-certification-isAgree', val);
            },
            get(){
                let { pageInfo } = this;
                return pageInfo.isAgree || false;
            }
        },
        tempIdCardType: {
            set(val){
                this.setTempIdCardType(val);
            },
            get(){
                let { pageInfo } = this;
                return pageInfo.tempIdCardType || '';
            }
        },
        idCardTypePopupVisible: {
            set(val){
                this.setIdCardTypePopupVisible(val);
            },
            get(){
                let { pageInfo } = this;
                return pageInfo.idCardTypePopupVisible || false;
            }
        },
        idCardTypeSlots(){
            let { pageInfo } = this;
            return pageInfo.idCardTypeSlots || [];
        },
        confirmDisabled(){
            let { popupUI, bankCardName, bankCardNumber, idCardType, idCardNumber, phoneNumber, isAgree } = this;
            return popupUI.PopupUILoading || bankCardName.length < 1 || bankCardNumber.length < 1 || idCardType.length < 1 || idCardNumber.length < 1 || phoneNumber.length < 1 || !isAgree;
        }
    },
    created(){
        this.resetData();
        this.loadData();
    },
    methods: {
        ...mapMutations({
            'resetData': 'pagePutForwardCertification/resetData',
            'setWithdrawInfo': 'pagePutForwardCertification/setWithdrawInfo',
            'setIsAgree': 'pagePutForwardCertification/setIsAgree',
            'setIdCardTypePopupVisible': 'pagePutForwardCertification/setIdCardTypePopupVisible',
            'setTempIdCardType': 'pagePutForwardCertification/setTempIdCardType'
        }),
        ...mapActions({
            'loadData': 'pagePutForwardCertification/loadData',
            'saveWithdrawInfo': 'pagePutForwardCertification/saveWithdrawInfo'
        }),
        idCardTypePopupCancel(){
            this.setIdCardTypePopupVisible(false);
        },
        idCardTypePopupConfirm(){
            let { idCardType, tempIdCardType } = this;
            this.setIdCardTypePopupVisible(false);
            if(idCardType != tempIdCardType){
                this.setWithdrawInfo({ idCardType: tempIdCardType });
            }
        },
        onIdCardTypePopupValuesChange(picker, values){
            this.setTempIdCardType(values[0]);
        },
        showIdCardTypePopup(){
            this.setIdCardTypePopupVisible(true);
        },
        doCheck(){
            let { bankCardName, bankCardNumber, province, phoneNumber, idCardNumber } = this;

            bankCardNumber = bankCardNumber.replace(/\s/g, '');

            if(!bankCardName){
                return '请输入真实姓名';
            }else if(!bankCardNumber){
                return '请输入银行卡号';
            }else if(/\D/.test(bankCardNumber)){
                return '银行卡号有误';
            }else if(!idCardNumber){
                return '请输入证件号码';
            }else if(!isRealIdCard(idCardNumber)){
                return '证件号码有误';
            }else if(!phoneNumber){
                return '请输入手机号码';
            }else if(!/\d{11}/.test(phoneNumber)){
                return '手机号码有误';
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
                this.$router.push({
                    path: '/distribution/putForward/index'
                });
            }).catch(({ code } = {})=>{
                if(code == 1000011){
                    //保存成功了
                    this.$router.push({
                        path: '/distribution/putForward/index'
                    });
                }
            });
        }
    }
}
</script>
<style lang="less">
.putForward-certification-wrap{
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
    .section-bg{
        position: absolute;
        left:0;
        top:0;
        width:100%;
        height:100%;
        background:white;
    }
    .section-main{
        position: relative;
        z-index: 1;
        padding-top:0.22rem;
    }
    ul{
        width:3.065rem;
        margin:0 auto;
        margin-bottom:0.2rem;
        li{
            padding-top:0.15rem;
            position: relative;
            label{
                display:block;
                width:100%;
                height:100%;
                &.idcard{
                    ._right{
                        flex: 0 0 0.25rem;
                        width:0.25rem;
                        text-align: center;
                    }
                }
            }
            .li-content{
                position: relative;
                display: flex;
                height:0.4rem;
                line-height:0.4rem;
                align-items: center;
                &:before{
                    border:none;
                    bottom:0;
                    border-bottom:1px solid #E0E0E0;
                    transform-origin: left bottom;
                    height:0.03rem;
                }
                ._left{
                    flex:0 0 0.76rem;
                    width:0.76rem;
                }
                ._center{
                    flex: auto;
                    min-width: 0;
                    input{
                        border:none;
                        padding:0;
                        display:block;
                        width:100%;
                        color:#222222;
                        height:0.2rem;
                        line-height:0.2rem;
                        outline: none;
                    }
                }
            }
        }
    }
    .agreement{
        margin-bottom:0.4rem;
        text-align: center;
        font-size:0.13rem;
        color:#999999;
        position: relative;
        input{
            position: absolute;
            left:-9999rem;
            &:checked + span{
                background:url(../../../assets/images/distribution/putForward/checked.png) no-repeat left top;
                background-size:100%;
            }
        }
        span{
            margin-right:0.04rem;
            background:url(../../../assets/images/distribution/putForward/uncheck.png) no-repeat left top;
            background-size:100%;
            display:inline-block;
            width:0.12rem;
            height:0.12rem;
            position: relative;
            top:0.01rem;
        }
        a{
            color:#FFAA65;
            margin-left:0.03rem;
            text-decoration: underline;
        }
    }
    .confirm-btn{
        width:2.65rem;
        height:0.49rem;
        background:rgba(255,172,45,1);
        border-radius:0.27rem;
        margin: 0 auto;
        border:none;
        display:block;
        padding:0;
        color:white;
        font-size:0.15rem;
        font-family:PingFangSC-Medium;
        font-weight:500;
        margin-bottom:0.32rem;
        &:disabled{
            background:#ccc;
        }
    } 
    .idCardType-popup{
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
