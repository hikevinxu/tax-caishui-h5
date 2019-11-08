<template>
  <div class="inquiry_page">
    <!-- <Header title="询价" /> -->
    <div class="customer">
      <Official-Customer />
    </div>
    <div class="recordHeader">
      <span class="recordTitle">我的询价记录</span>
      <span class="history" @click="goHistory">历史记录</span>
    </div>
    <div class="loadingList" v-if="!loadingData">正在加载中...</div>
    <No-Demand v-if="loadingData && intentionList.length == 0" />
    <div v-else class="inquiryRecord" ref="scroll" @scroll="loadMore">
      <div class="recordList" v-for="(item, index) in intentionList" :key="'intention' + index">
        <div class="demand">
          <span class="demandName">需求：{{item.intention}}</span>
          <span class="demandTime">{{item.lastModifyTime}}</span>
        </div>
        <No-Enquiry :num="item.serviceIntentionList.length - item.serviceIntentionListH5.length" v-if="item.serviceIntentionListH5.length == 0" />
        <div class="listItem" v-else v-for="(enquiryItem, enquiryIndex) in item.serviceIntentionListH5" :key="'enquiry' + enquiryIndex" >
          <EnquiryListItem :enquiryData="enquiryItem"  class="listItem_inner" />
        </div>
        <Demand-Loading :num="item.serviceIntentionList.length - item.serviceIntentionListH5.length" v-if="item.serviceIntentionListH5.length != 0 && (item.serviceIntentionList.length - item.serviceIntentionListH5.length) > 0" />
      </div>
    </div>
  </div>
</template>
<script>
// import Header from '@/components/Header/Header'
import OfficialCustomer from '@/components/OfficialCustomer/index'
import EnquiryListItem from '@/components/EnquiryListItem/index'
import NoDemand from '@/components/NoDemand/index'
import NoEnquiry from '@/components/NoEnquiry/index'
import DemandLoading from '@/components/DemandLoading/index'
import enquiry from '@/api/enquiry'
import sa from 'sa-sdk-javascript'
import Vue from 'vue'
import { List } from 'vant'

Vue.use(List)
export default {
  components: {
    OfficialCustomer,
    EnquiryListItem,
    NoDemand,
    NoEnquiry,
    DemandLoading
  },
  data() {
    return {
      listQuery: {
        pageNum: 1,
        pageSize: 10
      },
      intentionList: [],
      total: 0,
      loading: false,
      finished: false,
      over: false,
      timer: undefined,
      loadingData: false
    }
  },
  created() {
    sa.quick("autoTrackSinglePage",{
      $title: '询价页',
      $screen_name: `enquiry_page`
    })
    window.addEventListener('scroll',this.loadMore)
    this.getList()
  },
  methods: {
    getList() {
      // 获取获取询价单列表-有效
      this.finished = true
      enquiry.intentionListNow(this.listQuery).then(res => {
        if(res.code == 0){
          this.loadingData = true
          if(res.data.items.length > 0){
            for(let i=0;i<res.data.items.length;i++) {
              let serviceIntentionListH5 = []
              for(let j=0;j<res.data.items[i].serviceIntentionList.length;j++) {
                if (res.data.items[i].serviceIntentionList[j].intentionInfoBo.quotedPrice || res.data.items[i].serviceIntentionList[j].status == 3) {
                  serviceIntentionListH5.push(res.data.items[i].serviceIntentionList[j])
                }
              }
              res.data.items[i].serviceIntentionListH5 = serviceIntentionListH5
            }
            this.intentionList = this.intentionList.concat(res.data.items)
            this.total = res.data.total
            this.listQuery.pageNum++
            // 数据全部加载完成
            if (this.intentionList.length >= this.total) {
              this.finished = true
            } else {
              this.finished = false
            }
          } else {
            this.finished = true
            this.over = true
          }
        }
      }).catch(err => {
        this.finished = true
        console.log(err)
      })
    },
    loadMore(e) {
      // 卷去的高度   当前可见区域  总高
      // 触发scroll事件 可能触发n次  先进来开一个定时器，下次触发时将上一次定时器清除掉
      if(!this.finished) {
        clearTimeout(this.timer)  // 节流
        this.timer = setTimeout(()=>{
          let {scrollTop,clientHeight,scrollHeight} = e.target.scrollingElement
          if(scrollTop + clientHeight + 20 > scrollHeight){
            this.getList()  // 获取更多
          }
        },60)
      }
    },
    goHistory() {
      this.$router.push('history')
    }
  }
}
</script>
<style lang="scss" scoped>
.inquiry_page {
  padding: 56px 0;
  padding-top: 10px;
  padding-bottom: 70px;
  .customer {
    margin: 0 16px;
    margin-top: 16px;
  }
  .recordHeader {
    font-family: PingFangSC-Medium;
    margin: 0 16px;
    font-size: 16px;
    color: rgba(0,0,0,0.87);
    line-height: 22px;
    text-align: left;
    margin-top: 20px;
    .history {
      display: block;
      float: right;
      width: 58px;
      height: 22px;
      border: 1px solid #FFAD71;
      border-radius: 2px;
      font-family: PingFangSC-Regular;
      font-size: 11px;
      color: #FFAD71;
      line-height: 22px;
      text-align: center;
    }
  }
  .loadingList {
    font-family: PingFangSC-Regular;
    font-size: 14px;
    color: rgba(0,0,0,0.60);
    padding-bottom: 30px;
    padding-top: 50px;
  }
  .inquiryRecord {
    .recordList {
      // padding-bottom: 20px;
      .demand {
        margin: 0 16px;
        margin-top: 12px;
        overflow: hidden;
        padding-top: 11px;
        border-top: 1px solid rgba(0,0,0,0.04);
        .demandName {
          float: left;
          font-family: PingFangSC-Medium;
          font-size: 14px;
          color: #FF7F4A;
        }
        .demandTime {
          float: right;
          font-family: PingFangSC-Regular;
          font-size: 12px;
          color: rgba(0,0,0,0.38);
        }
      }
      .listItem {
        .listItem_inner {
          border-bottom: 1px solid rgba(0,0,0,0.04);
        }
      }
      .listItem:nth-last-child(1) {
        .listItem_inner {
          border-bottom: 0;
        }
      }
      .listItem:nth-last-child(2) {
        .listItem_inner {
          border-bottom: 0;
        }
      }
    }
  }
}
</style>
