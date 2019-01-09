<template>
  <div
    v-if="list.length"
    v-data-center-tab
    class="tab-wrap"
  >
    <div
      ref="tab"
      class="tab"
    >
      <span
        class="year"
        @click="showYearPopupVisible"
      >
        {{ year }}年<t-icon name="jiantx" />
      </span>
      <ul class="clearfixed">
        <li
          v-for="(item, i) in list"
          :key="item.month"
          :class="{'active': activeIndex == i}"
          :data-role="item.month"
          @click="changeActiveIndex(i)"
        >
          <span>{{ getMonth(item) }}月</span>
        </li>
      </ul>
    </div>

    <mt-popup
      v-model="yearPopupVisibleTemp"
      class="year-popup"
      position="bottom"
    >
      <div class="title">
        <div
          class="_left"
          @click="yearCancel"
        >
          <t-icon name="guanbi" />
        </div>
        <div class="_center">
          选择年份
        </div>
        <div
          class="_right"
          @click="yearConfirm"
        >
          <t-icon name="duigou" />
        </div>
      </div>
      <mt-picker
        :slots="yearSlots"
        @change="onValuesChange"
      />
    </mt-popup>
  </div>
</template>
<script>
import event from '@/tools/event'
// eslint-disable-next-line no-unused-vars
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'
import $ from 'jquery'
import { setTimeout } from 'timers'

export default {
  directives: {
    'dataCenterTab': {
      inserted: function (el, binding, vnode) {
        let self = vnode.context

        let tab = el.querySelector('.tab')

        let oLis = tab.querySelectorAll('li')

        let oItems = document.getElementsByClassName('data-center-list-item')

        el.scrollFn = function () {
          // 控制tab
          let top = $(el).offset().top - $(window).scrollTop()
          if (top <= 0 && $(window).scrollTop() > 0) {
            tab.style.position = 'fixed'
            tab.style.left = '50%'
            tab.style.webkitTransform = tab.style.transform = 'translateX(-50%)'
          } else {
            tab.style.position = 'inherit'
            tab.style.left = '0'
            tab.style.webkitTransform = tab.style.transform = 'translateX(0)'
          }
          // 控制tab自动切换
          let activeIndex = 0
          for (let i = 0; i < oItems.length; i++) {
            let oItem = oItems[i]
            if ($(oItem).offset().top - $(window).scrollTop() - tab.offsetHeight <= 0) {
              for (let i = 0; i < oLis.length; i++) {
                let oLi = oLis[i]
                if (oItem.dataset.role === oLi.dataset.role) {
                  activeIndex = i
                }
              }
            }
          }
          if (!self.animating) {
            self.setActiveIndex(activeIndex)
          }
        }
        el.scrollFn()

        self.event_bind(window, 'scroll', el.scrollFn)
      },
      unbind (el, binding, vnode) {
        let self = vnode.context
        self.event_unbind(window, 'scroll', el.scrollFn)
      }
    }
  },
  computed: {
    ...mapState({
      'pageInfo': 'pageDataCenterIndex'
    }),
    activeIndex () {
      let { pageInfo } = this
      return pageInfo.activeIndex || 0
    },
    year () {
      let { pageInfo } = this
      return pageInfo.year || 2018
    },
    tempYear () {
      let { pageInfo } = this
      return pageInfo.tempYear || 2018
    },
    yearPopupVisible () {
      let { pageInfo } = this
      return pageInfo.yearPopupVisible || false
    },
    yearPopupVisibleTemp: {
      set (val) {
        this.setYearPopupVisible(val)
      },
      get () {
        return this.yearPopupVisible
      }
    },
    yearSlots () {
      let { pageInfo } = this
      return pageInfo.yearSlots || []
    },
    list () {
      let { pageInfo } = this
      return pageInfo.list || []
    }
  },
  watch: {
    activeIndex (newVal, oldVal) {
      let { tab: oTab } = this.$refs
      let oUl = oTab.querySelector('ul')
      let oSpan = oTab.querySelector('span')
      let oLi = oTab.querySelectorAll('li')[newVal]
      let scrollLeft = (oLi.offsetLeft - oUl.offsetLeft) - ((oTab.offsetWidth - oSpan.offsetWidth) - oLi.offsetWidth) / 2
      $(oUl).stop().animate({ scrollLeft: scrollLeft + 'px' }, 300)
    }
  },
  methods: {
    ...event,
    ...mapMutations({
      'setYearPopupVisible': 'pageDataCenterIndex/setYearPopupVisible',
      'setYear': 'pageDataCenterIndex/setYear',
      'setTempYear': 'pageDataCenterIndex/setTempYear',
      'setActiveIndex': 'pageDataCenterIndex/setActiveIndex',
      'setDefaultIndex': 'pageDataCenterIndex/setDefaultIndex'
    }),
    ...mapActions({
      'loadList': 'pageDataCenterIndex/loadList'
    }),
    showYearPopupVisible () {
      let { year, yearSlots } = this
      // 显示弹窗之前设置defaultIndex
      this.setDefaultIndex(yearSlots[0].values.indexOf(year))
      this.setYearPopupVisible(true)
    },
    onValuesChange (picker, values) {
      this.setTempYear(values[0])
    },
    yearCancel () {
      this.setYearPopupVisible(false)
    },
    yearConfirm () {
      let { year, tempYear } = this
      this.setYearPopupVisible(false)
      if (year !== tempYear) {
        this.setYear(tempYear)
        // 如果日期发生变化，重置滚动条位置，重新还在列表数据
        window.scrollTo(0, 0)
        // 重新加载列表
        this.loadList()
      }
    },
    changeActiveIndex (index) {
      let oItems = document.getElementsByClassName('data-center-list-item')
      let { tab: oTab } = this.$refs
      let y = $(oItems[index]).offset().top - oTab.offsetHeight
      this.setActiveIndex(index)

      this.animating = true
      $('html,body').stop().animate({ scrollTop: y + 'px' }, 300, () => {
        setTimeout(() => {
          this.animating = false
        }, 100)
      })
    },
    getMonth ({ month }) {
      return parseInt((month + '').substring(4, 6))
    }
  }
}
</script>
<style lang="less" scoped>
.tab-wrap{
    height:0.66rem;
    .tab{
        width:100%;
        top:0;
        background:#F6F8FB;
        display: flex;
        height:0.66rem;
        position:relative;
        // &:before{
        //     content: '';
        //     position: absolute;
        //     z-index:1;
        //     left:0.8rem;
        //     top:0;
        //     height:100%;
        //     width:0.445rem;
        //     background:linear-gradient(90deg,rgba(245,247,250,1) 0%,rgba(245,246,248,0) 100%);
        // }
        &:after{
            content: '';
            position: absolute;
            z-index:1;
            right:0;
            top:0;
            height:100%;
            width:0.445rem;
            background:linear-gradient(90deg,rgba(245,246,248,0) 0%,rgba(245,247,250,1) 100%);
        }
    }
    span.year{
        flex: 0 0 0.8rem;
        width:0.8rem;
        height:0.66rem;
        line-height:0.66rem;
        text-align:right;
        font-weight: bold;
        i{
            margin-left:0.02rem;
            position: relative;
            top:0.02rem;
        }
    }
    ul{
        box-sizing: border-box;
        flex: 0 0 2.95rem;
        min-width:0;
        width:2.95rem;
        display: flex;
        flex-wrap:nowrap;
        overflow-x: auto;
        -webkit-overflow-scrolling: touch;
        &::-webkit-scrollbar {
            display:none;
        }
        li{
            flex: 0 0 0.4rem;
            width:0.4rem;
            text-align: center;
            height:0.66rem;
            display: flex;
            justify-content: center;
            white-space: nowrap;
            box-sizing: border-box;
            span{
                height:0.45rem;
                line-height:0.66rem;
                box-sizing: border-box;
                position:relative;
                &:after{
                    content: '';
                    position: absolute;
                    left:50%;
                    bottom:0;
                    transform: translateX(-50%);
                    height:0.02rem;
                    width:90%;
                    border-radius:0.015rem;
                }
            }
            &.active{
                span{
                    font-weight: bold;
                    &:after{
                        background:#636880;
                    }
                }
            }
        }
    }
    .year-popup{
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
