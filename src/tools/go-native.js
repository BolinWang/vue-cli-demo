import system from '@/tools/system'

export default {
    goNativeBabyInfo(babyInfo){//宝宝资料
        this.goNativePage({
            iosParams: {
                "action": "fetchBabyInfoVC",
                "target": "PersonalCenter",
                "params": babyInfo
            },
            androidParams: {
                "target": "EditBabyInfoPage",
                "params": {
                    "babyInfo": babyInfo
                }
            }
        });
    },
    goNativeSearch(searchType, entranceType){//搜索
        this.goNativePage({
            iosParams: {
                "action": "fetchSearchMainVC",
                "target": "Common",
                "params": {
                    "searchType": searchType, //搜索结果展示内容。0：知识，1：笔记，2：商品，3：课程，4：用户
                    "entranceType": entranceType //从哪个页面进入搜索页的。0：首页，1：学院，2：社区，3：商城
                }
            },
            androidParams: {
                "target": "SearchPage"
            }
        });
    },
    goNativeMessage(){//消息列表首页
        this.goNativePage({
            iosParams: {
                "action": "fetchMessageMainVC",
                "target": "Common",
                "params": {
                    "index": 0
                }
            },
            androidParams: {
                "target": "MessagePage"
            }
        });
    },
    goNativePostShare(url){//文章详情
        let id = this._getNativePageId(url, /\/app\/postshare\/(\d+)/);
        if(id){
            this.goNativePage({
                iosParams: {
                    "action": "fetchArticleDetailVC",
                    "target": "Community",
                    "params": {
                        "postID": id
                    }
                },
                androidParams: {
                    "target":"PostDetailPage",
                    "params":{
                        "postId": id
                    }
                }
            });
        }
    },
    goNativeTopiclist(url){//话题
        let id = this._getNativePageId(url, /\/app\/topiclist\/(\d+)/);
        if(id){
            this.goNativePage({
                iosParams: {
                    "action": "fetchTopicDetailVC",
                    "target": "Community",
                    "params": {
                        "topicID": id
                    }
                },
                androidParams: {
                    "target":"TopicDetailPage",
                    "params":{
                        "topicId": id
                    }
                }
            });
        }
    },
    goNativeCollegeIndex(url){//学院首页
        this.goNativePage({
            iosParams: {
                "action": "fetchMainVC",
                "target": "College",
                "actionType": 2
            },
            androidParams: {
                "target":"CollegeHomePage"
            }
        });
    },
    goNativeCommunityIndex(url){//社区首页
        this.goNativePage({
            iosParams: {
                "action": "fetchMainVC",
                "target": "Community",
                "actionType": 2
            },
            androidParams: {
                "target":"CommunityHomePage"
            }
        });
    },
    goNativeRequiredParenting(){//养娃必读
        this.goNativePage({
            iosParams: {
                "action": "fetchBabyMustReadVC",
                "target": "Home",
            },
            androidParams: {
                "target": "RequiredParentingPage"
            }
        });
    },
    goNativeAllBabyKnowledgeHome(){//全部知识
        this.goNativePage({
            iosParams: {
                "action": "fetchBabyKonwledgeHomeVC",
                "target": "Home"
            },
            androidParams: {
                "target": "ParentingKnowledgeListPage"
            }
        });
    },
    goNativeZaojiaoAuditionIndex(){//早教试听主页 --这个兼容了正式，试听
        this.goNativePage({
            iosParams: {
                "action": "fetchAuditionHomeVC",
                "target": "EarlyEducation",
            },
            androidParams: {
                "target": "LearnHomePage"
            }
        });
    }, 
    goNativeZaojiaoStudyIndex(){//早教学习主页－－正式
        this.goNativePage({
            iosParams: {
                "action": "fetchStudyHomeVC",
                "target": "EarlyEducation",
            },
            androidParams: {
                "target": "LearnHomePage"
            }
        });
    },    
    goNativeZaojiaoDetail(params){//早教课程详情页
        this.goNativePage({
            iosParams: {
                "action": "fetchCourseDetailVC",
                "target": "EarlyEducation",
                "params": {
                    "courseID": params.courseID,
                    "subjectID": params.subjectID,
                }
            },
            androidParams: {
                "target": "LearnDetailPage",
                "params": {
                    "courseId": params.courseID,
                    "subjectId": params.subjectID,
                    'subjectName':params.subjectName
                }
            },

        });
    },
    goNativeZaojiaoBuy(){// 早教购买
        this.goNativePage({
            iosParams: {
                "action": "fetchBabyInfoVC",
                "target": "EarlyEducation"
            },
            androidParams: {
                "target": "LearnBeforeBuyPage"
            }
        });
    },
    goNativeZaojiaoPreview(params){// 早教预览
        this.goNativePage({
            iosParams: {
                "action": "fetchCoursePreviewVC",
                "target": "EarlyEducation",
                "params": {
                    "subjectID": params.subjectID
                }
            },
            androidParams: {
                "target": "LearnPreviewCoursePage",
                "params":{
                    "subjectId": params.subjectID
                }
            }
        });
    },
    goNativeZaojiaPay(params){// 早教收银台
        this.goNativePage({
            iosParams: {
                "action": "fetchCollegeCheckstandVC",
                "target": "Common",
                "params": {
                    "orderNo": params.tradeId, 
                    "goodsId": params.itemId, 
                    'isEailyEducation':true,
                }
            },
            androidParams: {
                "target": "fetchCollegeCheckstandVC",
                "params":{
                    "orderNo": params.tradeId, 
                    "goodsId": params.itemId, 
                }
            }
        });
    },
    goNativekefuPreview(){   // 客服跳转
        this.goNativePage({
            iosParams: {
                "action": "fetchOnLineServicePageVC",
                "target": "Common",

            },
            androidParams: {
                "target": "onLineServicePage",
            }
        });
    },
    goNativeEvaluationReport(id){   // 测评题目转跳
        this.goNativePage({
            iosParams: {
                "action": "fetchEvaluationReport",
                "target": "EarlyEducation",
                "params": {
                    "id": id,
                    'isFormH5':1
                }
            },
            androidParams: {
                "target": "fetchEvaluationReport",
                "params": {
                    "id": id,
                    'isFormH5':1
                }
            }
        });
    },
    goNativeEvaluationIntroduce(){   // 测评介绍页
        this.goNativePage({
            iosParams: {
                "action": "fetchEvaluationIntroduce",
                "target": "EarlyEducation",
            },
            androidParams: {
                "target": "fetchEvaluationIntroduce",
            }
        });
    },
    goNativeMathBoxDetail(url){//数学盒子详情页
        let id = this._getNativePageId(url, /\/knowledge\/detail\/(\d+)/);
        if(id){
            this.goNativePage({
                iosParams: {
                    "action": "fetchMathBoxBuyDetaiVC",
                    "target": "MathBox",
                    "params": {
                        "courseId": id
                    }
                },
                androidParams: {
                    "target": "mathDetail",
                    "params": {
                        "courseId": id
                    }
                }
            });
        }
    },
    goNativeMathBoxLearnDetail(id, fromPage){//数学盒子星球页面
        this.goNativePage({
            iosParams: {
                "action": "fetchMathBoxLoadingVC",
                "target": "MathBox",
                "actionType": "1",
                "params": {
                    "courseId": id,
                    "fromPage": fromPage
                }
            },
            androidParams: {
                "target": "mathLearn",
                "params": {
                    "courseId": id,
                    "fromPage": fromPage
                }
            }
        });
    },
    _getNativePageId(url, reg){
        let id;
        if(/^\d+$/.test(url)){
            id = url;
        }else{
            let result = reg.exec(url);
            if(result){
                id = result[1];
            }
        }
        return id;
    },
    goNativePage(obj){
        let data = {};
        if(system.isIos()){
            data.iosParams = obj.iosParams;
        }else if(system.isAndroid()){
            data.androidParams = obj.androidParams;
        }
        NGJsBridge.goNativePage(data);
    },
}






