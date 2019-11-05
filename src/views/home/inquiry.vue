<template>
  <div class="inquiry_page">
    <Header title="询价" />
    <div class="customer">
      <Official-Customer />
    </div>
    <No-Demand v-if="intentionList.length == 0" />
    <div v-else class="inquiryRecord">
      <div class="recordHeader">
        <span class="recordTitle">我的询价记录</span>
        <span class="history">历史记录</span>
      </div>
      <div class="recordList">
        <div class="demand">
          <span class="demandName">需求：公司注册</span>
          <span class="demandTime">09/20 12:23:33</span>
        </div>
        <No-Enquiry />
        <EnquiryListItem class="listItem" />
        <EnquiryListItem class="listItem" />
        <EnquiryListItem class="listItem" />
      </div>
      <div class="recordList">
        <div class="demand">
          <span class="demandName">需求：公司注册</span>
          <span class="demandTime">09/20 12:23:33</span>
        </div>
        <No-Enquiry />
        <EnquiryListItem class="listItem" />
        <EnquiryListItem class="listItem" />
        <EnquiryListItem class="listItem" />
      </div>
    </div>
  </div>
</template>
<script>
import Header from '@/components/Header/Header'
import OfficialCustomer from '@/components/OfficialCustomer/index'
import EnquiryListItem from '@/components/EnquiryListItem/index'
import NoDemand from '@/components/NoDemand/index'
import NoEnquiry from '@/components/NoEnquiry/index'
import enquiry from '@/api/enquiry'
export default {
  components: {
    Header,
    OfficialCustomer,
    EnquiryListItem,
    NoDemand,
    NoEnquiry
  },
  data() {
    return {
      intentionList: []
    }
  },
  created() {
    this.init()
  },
  methods: {
    init() {
      // 获取获取询价单列表-有效
      enquiry.intentionListNow().then(res => {
        if(res.code == 0){
          this.intentionList = res.data.items
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.inquiry_page {
  padding: 56px 0;
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
        border-bottom: 1px solid rgba(0,0,0,0.04);
        &:last-child {
          border-bottom: 0;
        }
      }
    }
  }
}
</style>
