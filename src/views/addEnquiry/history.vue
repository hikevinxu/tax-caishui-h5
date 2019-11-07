<template>
  <div class="inquiry_page">
    <Header title="历史记录" :isBack="true" />
    <Empty-List message="暂无记录" v-if="total == 0" />
    <div class="inquiryRecord">
        <van-list
          v-model="loading"
          :offset="50"
          :finished="finished"
          finished-text=""
          @load="onLoad"
        >
        <div class="recordList" v-for="(item, index) in intentionList" :key="'intention' + index">
          <div class="demand">
            <span class="demandName">需求：{{item.intention}}</span>
            <span class="demandTime">{{item.lastModifyTime}}</span>
          </div>
          <No-Enquiry v-if="item.serviceIntentionListH5.length == 0" :page="page" />
          <div class="listItem" v-for="(enquiryItem, enquiryIndex) in item.serviceIntentionListH5" :key="'enquiry' + enquiryIndex" >
            <EnquiryListItem :enquiryData="enquiryItem"  class="listItem_inner" />
          </div>
        </div>
      </van-list>
    </div>
  </div>
</template>
<script>
import Header from '@/components/Header/Header'
import EnquiryListItem from '@/components/EnquiryListItem/index'
import EmptyList from '@/components/EmptyList/EmptyList'
import NoEnquiry from '@/components/NoEnquiry/index'
import enquiry from '@/api/enquiry'
import sa from 'sa-sdk-javascript'
import Vue from 'vue'
import { List } from 'vant'

Vue.use(List)
export default {
  components: {
    Header,
    EnquiryListItem,
    EmptyList,
    NoEnquiry
  },
  data() {
    return {
      page: 'history',
      listQuery: {
        pageNum: 1,
        pageSize: 10
      },
      intentionList: [],
      total: undefined,
      loading: false,
      finished: false
    }
  },
  created() {
    // this.getList()
    sa.quick("autoTrackSinglePage",{
      $title: '询价历史列表页',
      $screen_name: `enquiry_history_page`
    })
  },
  methods: {
    getList() {
      // 获取获取询价单列表-历史记录
      this.finished = true
      enquiry.intentionListHistory(this.listQuery).then(res => {
        if(res.code == 0){
          for(let i=0;i<res.data.items.length;i++) {
            let serviceIntentionListH5 = []
            for(let j=0;j<res.data.items[i].serviceIntentionList.length;j++) {
              if (res.data.items[i].serviceIntentionList[j].quotedPrice || res.data.items[i].serviceIntentionList[j].status == 3) {
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
        }
      }).catch(err => {
        this.finished = true
        console.log(err)
      })
    },
    onLoad() {
      // 异步更新数据
      setTimeout(() => {
        if (!this.finished) {
          this.getList()
        }
        // 加载状态结束
        this.loading = false
      }, 500)
    }
  }
}
</script>
<style lang="scss" scoped>
.inquiry_page {
  padding-top: 56px;
  min-width: 100vw;
  min-height: 100vh;
  box-sizing: border-box;
  .customer {
    margin: 0 16px;
    margin-top: 16px;
  }
  .inquiryRecord {
    margin-top: 20px;
    .recordHeader {
      font-family: PingFangSC-Medium;
      margin: 0 16px;
      font-size: 16px;
      color: rgba(0,0,0,0.87);
      line-height: 22px;
      text-align: left;
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
    .recordList {
      .demand {
        margin: 0 16px;
        overflow: hidden;
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
    }
  }
}
</style>
