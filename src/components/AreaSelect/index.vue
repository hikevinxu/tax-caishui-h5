<template>
  <div class="areaSelect">
    <div class="areaSelect_header">
      <div class="areaSelect_title">请选择</div>
      <div class="areaSelect_step">
        <div class="areaSelect_step_line">
          <span></span>
          <span></span>
          <span></span>
        </div>
        <div class="areaSelect_step_name">
          <div class="province">浙江省</div>
          <div class="city">杭州市</div>
          <div class="area">请选择区/县</div>
        </div>
      </div>
    </div>
    <div class="areaSelect_body_title">选择区/县</div>
    <div class="areaSelect_body">
      <ul class="areaList">
        <li>西湖区</li>
        <li>西湖区</li>
        <li>西湖区</li>
        <li>西湖区</li>
        <li>西湖区</li>
        <li>西湖区</li>
        <li>西湖区</li>
        <li>西湖区</li>
        <li>西湖区</li>
        <li>西湖区</li>
        <li>西湖区</li>
        <li>西湖区</li>
        <li>西湖区</li>
        <li>西湖区</li>
        <li>西湖区</li>
        <li>西湖区</li>
        <li>西湖区</li>
        <li>西湖区</li>
        <li>西湖区</li>
        <li>西湖区</li>
      </ul>
    </div>
  </div>
</template>
<script>

export default {
  data() {
    return {

    }
  },
  methods: {

  }
}
</script>
<style lang="scss" scoped>
.areaSelect {
  height: 100%;
  background-color: #FAFAFA;
  display: flex;
  flex-direction: column;
  .areaSelect_header {
    width: 100%;
    border-bottom: 1px solid rgba(0,0,0,0.08);
    background-color: #fff;
    .areaSelect_title {
      text-align: center;
      padding-top: 20px;
      font-family: PingFangSC-Regular;
      font-size: 14px;
      color: rgba(0,0,0,0.87);
    }
    .areaSelect_step {
      margin-top: 8px;
      display: flex;
      .areaSelect_step_line {
        width: 46px;
        height: 100px;
        position: relative;
        span {
          display: block;
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background-color: #FF7F4A;
          position: absolute;
          top: 38px;
          left: 16px;
          &:first-child {
            top: 3px;
          }
          &:last-child {
            top: 70px;
          }
        }
        &:before {
          content: '';
          width: 2px;
          height: 70px;
          background-color: #FF7F4A;
          position: absolute;
          top: 3px;
          left: 18px;
        }
      }
      .areaSelect_step_name {
        flex: 1;
        font-family: PingFangSC-Regular;
        font-size: 14px;
        color: #FF7F4A;
        text-align: left;
        .province,
        .city {
          color: rgba(0,0,0,0.60);
        }
        >div {
          margin-bottom: 20px;
        }
      }
    }
  }
  .areaSelect_body_title {
    font-family: PingFangSC-Regular;
    font-size: 12px;
    color: rgba(0,0,0,0.38);
    text-align: left;
    margin: 0 16px;
    margin-top: 16px;
    margin-bottom: 8px;
  }
  .areaSelect_body {
    flex: 1;
    overflow: scroll;
    .areaList {
      padding: 0;
      margin: 0 16px;
      margin-bottom: 8px;
      li {
        font-family: PingFangSC-Regular;
        font-size: 14px;
        color: rgba(0,0,0,0.60);
        text-align: left;
        padding: 8px 0;
      }
    }
  }
}
</style>
