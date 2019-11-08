<template>
  <div class="area_page">
    <div class="header">
      <span class="back" @click="back">
        <img src="@/assets/global/ic_arrow_back.png" alt="">
      </span>
      <div class="tabs">
        <div :class="countryActive == 1 ? 'tab active' : 'tab'" @click="changeCountry(1)">国内</div>
        <div :class="countryActive == 2 ? 'tab active' : 'tab'" @click="changeCountry(2)">海外</div>
      </div>
    </div>
    <div class="body">
      <div class="body_header">
        <div class="searchBar">
          <span class="searchIcon">
            <img src="@/assets/global/ic_search.png" alt="">
          </span>
          <input ref="getBlur" v-model="searchText" @input="searchChange" type="text" placeholder="请输入城市名称或首字母查询" @keyup.13="searchChange">
        </div>
      </div>
      <div class="areaList">
        <div class="hotCity" v-if="countryActive == 1">
          <div class="hotCityTitle">热门城市</div>
          <van-row class="hotCityList" gutter="20">
            <van-col v-for="(item, index) in hotCityList" :key="'hotCity' + index" class="hotCityItem" span="8">
              <span @click="selectCity(item)">{{item.name}}</span>
            </van-col>
          </van-row>
        </div>
        <van-index-bar :index-list="indexList" :sticky="true" :sticky-offset-top="0" highlight-color="#FF7F4A">
          <div v-for="(cityIndex, index) in cityList" :key="'cityIndex' + index">
            <van-index-anchor :index="cityIndex.indexBar" />
            <ul>
              <li v-for="(city, index) in cityIndex.childs" :key="'city' + index" @click="selectCity(city)">{{city.name}}</li>
            </ul>
          </div>
        </van-index-bar>
      </div>
    </div>
    <van-popup
      v-model="areaShow"
      round
      closeable
      position="bottom"
      :style="{ height: '80%' }"
    >
      <Area-Select :areaSelectData="areaSelectData" @areaSelect="selectCityChange" />
    </van-popup>
  </div>
</template>
<script>

import AreaSelect from '@/components/AreaSelect/index'
import Vue from 'vue'
import { IndexBar, IndexAnchor, Row, Col, Popup } from 'vant'
Vue.use(IndexBar).use(IndexAnchor).use(Row).use(Col).use(Popup)
import globalApi from '@/api/globalApi'
import { eventManager } from '@/utils/global'

export default {
  components: {
    AreaSelect
  },
  data() {
    return {
      countryActive: 1,
      searchText: '',
      indexList: [],
      hotCityList: [],
      cityList: [],
      searchList: [],
      cityTree: [],
      overseaCityList: [],
      areaShow: false,
      areaSelectData: {}
    }
  },
  created() {
    this.getAddressHotCitys()
    this.getAddressTrees()
    document.onkeydown = (e) => {
      let key = window.event.keyCode
      if (key == 13) {
        this.$refs.getBlur.blur()
      }
    }
  },
  methods: {
    back(){
      // this.$router.go(-1)
      this.$emit('closeAreaSelect')
    },
    getAddressHotCitys() {
      globalApi.addressHotCitys().then(res => {
        if(res.code == 0){
          this.hotCityList = res.data
        }
      })
    },
    getAddressTrees() {
      globalApi.addressTrees().then(res => {
        if(res.code == 0){
          this.cityTree= res.data
          let cityTree = res.data
          let searchList = []
          for(let i=0;i<cityTree.length;i++) {
            for(let j=0;j<cityTree[i].childs.length;j++) {
              cityTree[i].childs[j].parentName = cityTree[i].name
              searchList.push(cityTree[i].childs[j])
            }
          }
          this.searchList = searchList
          this.getCityListBySearchList(searchList)
        }
      })
    },
    // 把城市列表转成indexBar数据格式
    getCityListBySearchList(searchList) {
      let citySP = []
      let citySPList = []
      for(var i=0;i<26;i++){
        let obj = {
          indexBar: String.fromCharCode(65+i),
          childs: []
        }
        for(let j=0;j<searchList.length;j++) {
          if(searchList[j].firstPinYin == String.fromCharCode(65+i)){
            obj.childs.push(searchList[j])
          }
        }
        if (obj.childs.length > 0) {
          citySPList.push(obj)
          citySP.push(String.fromCharCode(65+i))
        }
      }
      this.indexList = citySP
      this.cityList = citySPList
    },
    getAddressOverseasTree() {
      globalApi.addressOverseasTree().then(res => {
        if(res.code == 0){
          this.overseaCityList = res.data
          let overseaCityTree = res.data
          let searchList = []
          for(let i=0;i<overseaCityTree.length;i++) {
            if(overseaCityTree[i].childs && overseaCityTree[i].childs.length > 0) {
              searchList.push(...overseaCityTree[i].childs)
            } else {
              searchList.push(overseaCityTree[i])
            }
          }
          this.searchList = searchList
          this.getCityListBySearchList(searchList)
        }
      })
    },
    selectCity(val) {
      if(this.countryActive == 2) {
        // eventManager.returnEvent('selectArea', val)
        // this.$router.back(-1)
        this.$emit('selectCityChange', val)
      } else {
        for(let i=0;i<this.searchList.length;i++){
          if(this.searchList[i].code == val.code) {
            this.areaSelectData = this.searchList[i]
          }
        }
        this.areaShow = true
      }
    },
    selectCityChange(val) {
      console.log(val)
      val.area = val.provinceName + '-' + val.cityName + '-' + val.name
      // eventManager.returnEvent('selectArea', val)
      this.$emit('selectCityChange', val)
      this.areaShow = false
      // this.$router.back(-1)
    },
    changeCountry(index) {
      this.countryActive = index
      if (index == 1) {
        this.getAddressTrees()
      }else if(index == 2) {
        this.getAddressOverseasTree()
      }
    },
    searchChange() {
      console.log(this.searchText.substring(0, 1))
      let engReg = /[[a-zA-Z]/
      let chiReg = /[\u4e00-\u9fa5]/
      if (engReg.test(this.searchText.substring(0, 1))) {
        let arr = []
        for(let i=0;i<this.searchList.length;i++) {
          if(this.searchText.substring(0, 1).toLocaleUpperCase() == this.searchList[i].firstPinYin) {
            arr.push(this.searchList[i])
          }
        }
        this.getCityListBySearchList(arr)
      } else {
        let arr = []
        for(let i=0;i<this.searchList.length;i++) {
          if(this.searchList[i].name.indexOf(this.searchText) != -1) {
            arr.push(this.searchList[i])
          }
        }
        this.getCityListBySearchList(arr)
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.area_page {
  padding-top: 56px;
  box-sizing: border-box;
  width: 100vw;
  height: 100vh;
  position: relative;
  display: flex;
  flex-direction: column;
  .header {
    width: 100%;
    height: 56px;
    line-height: 56px;
    background-color: #fff;
    font-family: PingFangSC-Medium;
    font-size: 16px;
    color: rgba(0,0,0,0.87);
    text-align: center;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 999;
    .back {
      display: block;
      width: 24px;
      height: 24px;
      position: absolute;
      top: 16px;
      left: 16px;
      img {
        display: block;
        width: 100%;
        height: 100%;
      }
    }
    .tabs {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      overflow: hidden;
      .tab {
        float: left;
        width: 59px;
        box-sizing: border-box;
        height: 28px;
        line-height: 28px;
        border-radius: 4px 0 0 4px;
        cursor: pointer;
        border: 1px solid rgba(0,0,0,0.26);
        border-right: 0;
        font-family: PingFangSC-Medium;
        font-size: 14px;
        color: rgba(0,0,0,0.26);
        text-align: center;
        &:last-child {
          border-radius: 0 4px 4px 0;
          border: 1px solid rgba(0,0,0,0.26);
          border-left: 0;
        }
      }
      .tab.active {
        border-color: #FF7F4A;
        background: #FF7F4A;
        color: #fff;
      }
    }
  }
  .body {
    flex: 1;
    overflow: scroll;
    position: relative;
    background: #FAFAFA;
    .body_header {
      padding: 10px 0;
      background: #fff;
    }
  }
  .searchBar {
    margin: 0 16px;
    height: 32px;
    background: #FAFAFA;
    border-radius: 4px;
    border-radius: 4px;
    position: relative;
    .searchIcon {
      width: 20px;
      height: 20px;
      position: absolute;
      top: 6px;
      left: 8px;
      img {
        display: block;
        width: 100%;
        height: 100%;
      }
    }
    input {
      box-sizing: border-box;
      width: 100%;
      height: 100%;
      padding: 6px 0 6px 36px;
      background: #FAFAFA;
      outline: none;
      font-family: PingFangSC-Regular;
      font-size: 12px;
      text-align: left;
      line-height: 20px;
    }
  }
}
input::-webkit-input-placeholder, textarea::-webkit-input-placeholder {
  font-family: PingFangSC-Regular;
  font-size: 12px;
  color: rgba(0,0,0,0.26);
  text-align: left;
  line-height: 20px;
}
input:-moz-placeholder, textarea:-moz-placeholder {
  font-family: PingFangSC-Regular;
  font-size: 12px;
  color: rgba(0,0,0,0.26);
  text-align: left;
  line-height: 20px;
}

input::-moz-placeholder, textarea::-moz-placeholder {
  font-family: PingFangSC-Regular;
  font-size: 12px;
  color: rgba(0,0,0,0.26);
  text-align: left;
  line-height: 20px;
}

input:-ms-input-placeholder, textarea:-ms-input-placeholder {
  font-family: PingFangSC-Regular;
  font-size: 12px;
  color: rgba(0,0,0,0.26);
  text-align: left;
  line-height: 20px;
}
</style>
<style lang="scss">
.area_page {
  .areaList {
    background: #FAFAFA;
    margin-top: 16px;
    padding-top: 16px;
    position: relative;
    .van-index-bar {
      .van-index-anchor {
        padding: 0 16px;
        font-family: PingFangSC-Regular;
        font-size: 12px;
        color: rgba(0,0,0,0.38);
        text-align: left;
      }
    }
    .hotCity {
      padding: 0 16px;
      .hotCityTitle {
        font-family: PingFangSC-Regular;
        font-size: 12px;
        color: rgba(0,0,0,0.38);
        text-align: left;
      }
      .hotCityList {
        padding: 0 16px;
        .hotCityItem {
          height: 33px;
          margin-top: 16px;
          span {
            display: block;
            height: 100%;
            margin: 0 5px;
            background-color: #fff;
            border-radius: 1px;
            font-family: PingFangSC-Regular;
            font-size: 14px;
            color: rgba(0,0,0,0.60);
            text-align: center;
            line-height: 33px;
          }
        }
      }
    }
    ul {
      margin: 0 20px;
      li {
        height: 33px;
        border-radius: 1px;
        font-family: PingFangSC-Regular;
        font-size: 14px;
        color: rgba(0,0,0,0.60);
        line-height: 33px;
        text-align: left;
      }
    }
  }
}
</style>
