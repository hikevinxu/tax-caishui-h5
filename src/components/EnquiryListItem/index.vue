<template>
  <div class="EnquiryListItem">
    <div class="info">
      <div class="companyLogo">
        <img v-if="enquiryData.company.logo != ''" :src="enquiryData.company.logo" alt="" />
        <img v-if="enquiryData.company.logo == '' && enquiryData.company.id % 3 == 0" src="../../assets/InquiryImg/company1.png" alt="" />
        <img v-if="enquiryData.company.logo == '' && enquiryData.company.id % 3 == 1" src="../../assets/InquiryImg/company2.png" alt="" />
        <img v-if="enquiryData.company.logo == '' && enquiryData.company.id % 3 == 2" src="../../assets/InquiryImg/company3.png" alt="" />
        <div class="markLogo" v-if="enquiryData.company.bindMerchant">
          <img src="../../assets/InquiryImg/ic_list_tag.png" alt="" />
        </div>
        <!-- <div class="recommend">客服推荐</div> -->
      </div>
      <div class="companyInfo">
        <div class="title">
          <span>{{enquiryData.company.name}}</span>
          <img v-if="enquiryData.company.level == 1" src="../../assets/InquiryImg/V1_12.png" alt="" />
          <img v-if="enquiryData.company.level == 2" src="../../assets/InquiryImg/V2_12.png" alt="" />
          <img v-if="enquiryData.company.level == 3" src="../../assets/InquiryImg/V3_12.png" alt="" />
        </div>
        <div class="otherInfo">
          <div class="companyAddress">
            <span class="companyStatus" v-if="enquiryData.company.bindMerchant">已认证</span>
            <img src="../../assets/InquiryImg/firm_ic_address.png" alt="" />
            <span>{{enquiryData.company.areaName}}</span>
          </div>
          <div class="companyService">
            <span>主营:{{enquiryData.company.mainServiceString}}</span>
          </div>
        </div>
      </div>
      <span class="halvingLine"></span>
      <div class="status">
        <!-- <span v-if="enquiryData.intentionInfoBo.status == 1">报价中</span>
        <span v-if="enquiryData.intentionInfoBo.status == 2">超时<br />未报价</span>
        <span v-if="enquiryData.intentionInfoBo.status == 3">已报价</span>
        <span v-if="enquiryData.intentionInfoBo.status == 4">{{enquiryData.intentionInfoBo.quotedPrice}}</span> -->
        <span v-if="enquiryData.intentionInfoBo.quotedPrice">{{enquiryData.intentionInfoBo.quotedPrice/100}}元</span>
        <span v-if="enquiryData.intentionInfoBo.status == 3" style="color: rgba(0,0,0,0.26);">已报价</span>
      </div>
    </div>
    <p class="notifyMessage" v-if="enquiryData.tips">{{enquiryData.tips}}</p>
  </div>
</template>
<script>
export default {
  props: {
    enquiryData: {
      type: Object,
      default: {}
    }
  },
  data() {
    return {

    }
  },
  created() {
    console.log(this.enquiryData)
    let mainServiceList = []
    for(let i=0;i<this.enquiryData.company.mainServiceList.length;i++) {
      mainServiceList.push(this.enquiryData.company.mainServiceList[i].name)
    }
    this.enquiryData.company.mainServiceString = mainServiceList.join('/')
  }
}
</script>
<style lang="scss" scoped>
.EnquiryListItem {
  margin: 20px 16px;
  padding-bottom: 10px;
  .info {
    display: flex;
    flex-direction: row;
    position: relative;
    .companyLogo {
      margin-left: 4px;
      width: 60px;
      height: 60px;
      box-sizing: border-box;
      background: #FFFFFF;
      border: 1px solid rgba(0,0,0,0.04);
      border-radius: 4px;
      position: relative;
      img {
        display: block;
        width: 100%;
        height: 100%;
      }
      .markLogo {
        width: 20px;
        height: 20px;
        position: absolute;
        top: -4px;
        left: -4px;
        img {
          display: block;
          width: 100%;
          height: 100%;
        }
      }
      .recommend {
        width: 60px;
        height: 16px;
        position: absolute;
        bottom: -1px;
        left: -1px;
        background-image: linear-gradient(135deg, #FFAD71 0%, #FF7F4A 100%);
        border-radius: 0 0 4px 4px;
        font-family: PingFangSC-Regular;
        font-size: 9px;
        color: #FFFFFF;
        line-height: 18px;
        text-align: center;
      }
    }
    .companyInfo {
      flex: 1;
      min-width: 0;
      padding-left: 12px;
      text-align: left;
      .title {
        font-family: PingFangSC-Regular;
        font-size: 14px;
        color: rgba(0,0,0,0.87);
        line-height: 22px;
        img {
          display: inline-block;
          margin-left: 4px;
          width: 12px;
          height: 12px;
        }
      }
      .otherInfo {
        width: 100%;
        float: left;
        font-family: PingFangSC-Regular;
        font-size: 12px;
        color: rgba(0,0,0,0.38);
        line-height: 22px;
        .companyAddress {
          width: 100%;
          margin-top: 5px;
          line-height: 18px;
          img {
            display: inline-block;
            margin-right: 4px;
            width: 12px;
            height: 12px;
            position: relative;
            top: 1px;
          }
          .companyStatus {
            display: inline-block;
            width: 40px;
            height: 20px;
            line-height: 20px;
            margin-right: 8px;
            font-family: PingFangSC-Regular;
            font-size: 11px;
            color: #FEA25F;
            text-align: center;
            background: rgba(255, 173, 113, 0.26);
            border-radius: 2px;
          }
        }
        .companyService {
          width: 100%;
          margin-top: 5px;
          span {
            display: block;
            width: 100%;
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow: hidden;
          }
          img {
            display: inline-block;
            margin-left: 4px;
            width: 12px;
            height: 12px;
            position: relative;
            top: 1px;
          }
        }
      }
    }
    .halvingLine {
      width: 1px;
      height: 16px;
      position: absolute;
      top: 50%;
      right: 54px;
      transform: translate(0, -50%);
      background-color: rgba(0,0,0,0.04);
    }
    .status {
      box-sizing: border-box;
      width: 54px;
      padding-left: 15px;
      margin: auto 0;
      text-align: center;
      font-family: PingFangSC-Medium;
      font-size: 13px;
      color: #FF7F4A;
      line-height: 16px;
    }
  }
  .notifyMessage {
    width: 100%;
    text-align: right;
    font-family: PingFangSC-Regular;
    font-size: 10px;
    color: #FFAD71;
    line-height: 16px;
    margin-top: 4px;
  }
}
</style>
