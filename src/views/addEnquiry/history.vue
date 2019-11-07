<template>
  <div class="inquiry_page">
    <Header title="历史记录" :isBack="true" />
    <Empty-List message="暂无记录" v-if="total == 0" />
    <div class="inquiryRecord" ref="scroll" @scroll="loadMore">
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
      <div class="finish" v-if="intentionList.length == total">已经到底了</div>
      <div class="loadingList" v-else>正在加载中...</div>
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
      finished: false,
      timer: undefined
    }
  },
  created() {
    this.getList()
    sa.quick("autoTrackSinglePage",{
      $title: '询价历史列表页',
      $screen_name: `enquiry_history_page`
    })
    window.addEventListener('scroll',this.loadMore)
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
    .finish {
      font-family: PingFangSC-Regular;
      font-size: 14px;
      color: rgba(0,0,0,0.60);
      padding-bottom: 30px;
    }
    .loadingList {
      font-family: PingFangSC-Regular;
      font-size: 14px;
      color: rgba(0,0,0,0.60);
      padding-bottom: 30px;
    }
  }
}
</style>
