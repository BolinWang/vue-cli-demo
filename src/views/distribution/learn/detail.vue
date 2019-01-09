<template>
    <section ref="index-wrap" class="evaluation-index-wrap" v-if="pageInfo.dataIsLoad">

        <div class="bg question">
            <div class="content">
                
                <p>
                    <font>
                        <strong>{{ questionIndex + 1 }}</strong>/{{ questionLen }}
                    </font>
                    {{ question.questionsDesc }}
                </p>

                <template v-if="question.questionsImage">
                    <div class="img">
                        <img :src="question.questionsImage | ali(258)"/>
                    </div>
                </template>

                <ul>
                    <li v-if="question.optionA">
                        <label>
                            <div class="_left">
                                <input type="radio" v-model="userAnswer" value="A"/>
                                <span></span>
                            </div>
                            <div class="_right">
                                {{ question.optionA }}  
                            </div>
                        </label>
                    </li>
                    <li v-if="question.optionB">
                        <label>
                            <div class="_left">
                                <input type="radio" v-model="userAnswer" value="B"/>
                                <span></span>
                            </div>
                            <div class="_right">
                                {{ question.optionB }}
                            </div>
                        </label>
                    </li>
                    <li v-if="question.optionC">
                        <label>
                            <div class="_left">
                                <input type="radio" v-model="userAnswer" value="C"/>
                                <span></span>
                            </div>
                            <div class="_right">
                                {{ question.optionC }}
                            </div>
                        </label>
                    </li>
                    <li v-if="question.optionD">
                        <label>
                            <div class="_left">
                                <input type="radio" v-model="userAnswer" value="D"/>
                                <span></span>
                            </div>
                            <div class="_right">
                                {{ question.optionD }}
                            </div>
                        </label>
                    </li>
                </ul>

            </div>

            <div class="btn-group">
                <button class="pre page-btn" v-show="questionIndex > 0" @click="preQuestion">
                    <t-icon name="arrow-left"></t-icon>上一题
                </button>

                <template v-if="questionIndex < questionLen - 1">
                    <button class="next page-btn" :disabled="!userAnswer" @click="nextQuestion">
                        下一题<t-icon name="arrow-right"></t-icon>
                    </button>
                </template>
                <template v-else>
                    <button class="show-result" :disabled="!userAnswer" @click="nextQuestion">
                        查看结果
                    </button>
                </template>

            </div>
        </div>
        
    </section>
</template>
<script>
import { mapState, mapGetters, mapActions, mapMutations } from 'vuex'
import pageShareMixin from '@/mixins/pageShare.js'

export default {
    mixins: [pageShareMixin],
    computed: {
        ...mapState({
            'pageInfo': 'pageLearnDetail'
        }),
        userAnswer: {
            set(userAnswer){
                let { question } = this;
                this.setQuestionUserAnswer({ question, userAnswer });
            },
            get(){
                let { question } = this;
                return question.userAnswer;
            }
        },
        questionIndex(){
            let { pageInfo } = this;
            return pageInfo.questionIndex || 0;
        },
        questionList(){
            let { pageInfo: { data } } = this;
            return data.evaluationQuestionDTOList || [];
        },
        question(){
            let { questionList, pageInfo: { questionIndex } } = this;
            return questionList[questionIndex];
        },
        questionLen(){
            let { questionList } = this;
            return questionList.length;
        }
    },
    created(){
        this.resetData();
        this.loadData();
    },
    methods: {
        ...mapMutations({
            'resetData': 'pageLearnDetail/resetData',
            'updateQuestionIndex': 'pageLearnDetail/updateQuestionIndex',
            'setQuestionUserAnswer': 'pageLearnDetail/setQuestionUserAnswer'
        }),
        ...mapActions({
            'loadData': 'pageLearnDetail/loadData',
            'commitResult': 'pageLearnDetail/commitResult'
        }),
        preQuestion(){
            this.updateQuestionIndex(-1);
        },
        nextQuestion(){
            let { questionIndex, questionLen, question: { answer, userAnswer } } = this;
            if(answer != userAnswer){
                this.actionVuexMessageShow('答错啦，请选择正确答案');
                return;
            }
            if(questionIndex < questionLen - 1){
                this.updateQuestionIndex(1);
            }else{
                this.showResult();
            }
        },
        showResult(){
            this.commitResult().then((res)=>{
                let { evaluationResult } = res || {};
                //1-通过, 2-不通过
                if(evaluationResult == 1){
                    this.$router.push({
                        path: '/distribution/learn/success'
                    });
                }else if(evaluationResult == 2){
                    this.actionVuexMessageShow('答错啦，请选择正确答案');
                }
            });
        }
    }
}
</script>
<style lang="less" scoped>
section{
    font-family: PingFangSC-Regular;
    .bg.question{
        position: absolute;
        left:0;
        top:0;
        width:100%;
        height: 100%;
        background:white;
        overflow-y: auto;
        .content{
            width:3.35rem;
            margin: 0 auto;
            padding-top:.21rem;
            p{
                line-height:.27rem;
                font-size:.19rem;
                word-break: break-all;
                font-family:PingFangSC-Medium;
                margin-bottom:.25rem;
                font{
                    color:#0EBDCA;
                    font-family: PingFangSC-Light;
                    margin-right: .1rem;
                    strong{
                        font-size:.22rem;
                    }
                }
            }
            .img{
                img{
                    display: block;
                    width:2.58rem;
                    height:1.415rem;
                    margin:0 auto;
                }
                margin-bottom:.325rem;
            }
            ul{
                li{
                    width:3.35rem;
                    height:.55rem;
                    border-radius:.04rem;
                    box-shadow:0 0 .075rem 0 rgba(22,30,110,0.08);
                    margin-bottom:.1rem;
                    line-height:.2rem;
                    font-size:.14rem;
                    padding-right: .21rem;
                    position: relative;
                    box-sizing:border-box;
                    label{
                        display: flex;
                        align-items: center;
                        position: absolute;
                        width:100%;
                        height:100%;
                        box-sizing:border-box;
                        &:before{
                            content: '';
                            position: absolute;
                            left:0;
                            top:0;
                            width:100%;
                            height:100%;
                        }
                        ._left{
                            width:.475rem;
                            flex: 0 0 .475rem;
                            position: relative;
                            input{
                                position: absolute;
                                left:-99999rem;
                                &:checked + span{
                                    background:url(../../../assets/images/distribution/learn/check.png) no-repeat center center;
                                    background-size:100%;
                                }
                            }
                            span{
                                position: absolute;
                                left:50%;
                                top:50%;
                                transform: translateX(-50%) translateY(-50%);
                                width:.25rem;
                                height:.25rem;
                                background:url(../../../assets/images/distribution/learn/uncheck.png) no-repeat center center;
                                background-size:100%;
                            }
                            
                        }
                        ._right{
                            flex: auto;
                            min-width: 0;
                        }
                    }
                }
            }
        }
        .btn-group{
            position: absolute;
            left:0;
            bottom:.28rem;
            width:100%;
            height:.225rem;
            button.page-btn{
                position: absolute;
                background:none;
                border:none;
                color:#0EBDCA;
                top:0;
                height:.225rem;
                i{
                    font-weight: bold;
                    position: relative;
                    top:0.01rem;
                    margin:0 .075rem;
                    line-height:.14rem;
                    &:before{
                        font-size:.14rem;
                    }
                }
            }
            .pre{
                left:.21rem;
                &:disabled{
                    color:#CCCCCC;
                }
            }
            .next{
                right:.21rem;
                &:disabled{
                    color:#CCCCCC;
                }
            }
            .show-result{
                position: absolute;
                right:.21rem;
                background:none;
                border:none;
                color:white;
                top:0;
                width:2.1rem;
                height:0.4rem;
                background:linear-gradient(135deg,rgba(255,226,89,1) 0%,rgba(255,167,81,1) 100%);
                border-radius:0.185rem;
                top:50%;
                transform: translateY(-50%);
            }
        }
    }
}
</style>