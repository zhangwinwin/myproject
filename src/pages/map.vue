<template>
  <div class="page">
    <!-- 地图容器 -->
    <div id="container" class="map" tabindex="0"></div>
    <!-- 搜索框 -->
    <div id="searchBox">
      <input type="input" id="tipinput" placeholder="请输入关键字搜索" v-model="Mtext"/>
      <div id="clearSearchBtn" @click="clearBtn">
        <div class="del">&#10005;</div>
      </div>
    </div>
    <!-- 结果面板 -->
    <div id="panel" :class="{hidden: !searching, empty: searched}">
      <!-- 隐藏按钮 -->
      <a id="showHideBtn" @click="showBtn"></a>
      <div id="emptyTip">没有内容</div>
      <!-- 搜索结果列表 -->
      <div id="poiList"></div>
    </div>
  </div>
</template>

<script>
import AMap from 'AMap'
import AMapUI from 'AMapUI'
export default {
  data(){
    return {
      searching: false,
      Mtext: '',
      searched: false,
    }
  },
  mounted(){
    this.init()
  },
  methods: {
    showBtn(){
      this.searching = !this.searching
    },
    clearBtn(){
      this.Mtext = '',
      placeSearch.clear()
      this.seaerching = false
    },
    init(){
      let mapObj = new AMap.Map('container', {
        center: [113.104142, 23.030102],
        zoom: 6
      })
      mapObj.plugin(['AMap.ToolBar', 'AMap.MapType'], () => {
        mapObj.addControl(new AMap.ToolBar())
        mapObj.addControl(new AMap.MapType({showTraffic: false, showRoad: false}))
      })
      mapObj.plugin(['AMap.Geolocation'], () => {
        let geolocation = new AMap.Geolocation({
          enableHighAccuracy: true, //  是否使用高精度定位，默认:true
          timeout: 10000, //  超过10秒后停止定位，默认：无穷大
          maximumAge: 0, // 定位结果缓存0毫秒，默认：0
          convert: true, // 自动偏移坐标，偏移后的坐标为高德坐标，默认：true
          showButton: true, //  显示定位按钮，默认：true
          buttonPosition: 'LB',  // 定位按钮停靠位置，默认：'LB'，左下角
          buttonOffset: new AMap.Pixel(10, 20), //  定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
          showMarker: true, //  定位成功后在定位到的位置显示点标记，默认：true
          showCircle: true, //  定位成功后用圆圈表示定位精度范围，默认：true
          panToLocation: true,  //  定位成功后将定位到的位置作为地图中心点，默认：true
          zoomToAccuracy: true  //  定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
        })
        mapObj.addControl(geolocation)
        geolocation.getCurrentPosition()
        AMap.event.addListener(geolocation, 'complete', (result) => {
          mapObj.setCenter(result.position)
        })// 返回定位信息
        AMap.event.addListener(geolocation, 'error', (result) => {
          console.log(result)
        })
      })
      AMap.service(['AMap.PlaceSearch', 'AMap.Autocomplete'], () => {
        let auto = new AMap.Autocomplete({
          input: 'tipinput'
        })
        let placeSearch = new AMap.PlaceSearch({
          pageSize: 5,
          pageIndex: 1,
          map: mapObj,
          panel: 'poiList'
        })
        AMap.event.addListener(auto, 'select', (e) => {
          placeSearch.setCity(e.poi.adcode)
          placeSearch.search(e.poi.name, (status, result) => {
            if(result.pois && result.pois.length > 0){
              this.searched = !this.searched
            }
            this.searching = true
          })
        })
      })
    }
  }
}
</script>

<style scoped>
body{
  height: 100%;
  width: 100%;
  overflow: hidden;
  padding: 0;
  margin: 0;
}
.page{
  margin-top: 43px;
  width: 100%;
  height: 94%;
  position: fixed;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}
#container {
flex: 1;
}
#panel {
  height: 43%;
  flex: 0 0 auto;
  overflow: visible;
  border-top: 1px solid #ccc;
  position: relative;
  z-index: 999;
  /*-webkit-transition: all 0.2s;*/
}

#showHideBtn {
  display: block;
  position: absolute;
  width: 63px;
  height: 32px;
  text-align: center;
  margin: 0 auto;
  left: 0;
  right: 0;
  top: -25px;
}

#showHideBtn:after,
#showHideBtn:before {
  content: "";
  width: 0;
  height: 0;
  position: absolute;
  left: 0;
  right: 0;
  margin: auto;
  cursor: pointer;
}

#showHideBtn:before {
  width: 60px;
  height: 30px;
  background: rgba(255, 255, 255, 0.9);
  top: 0;
  border-radius: 30px 30px 0 0;
  border: 1px solid #ccc;
  border-bottom: 0;
}

#showHideBtn:after {
  content: "";
  top: 7px;
  border: 10px solid rgba(255, 0, 0, 0);
  z-index: 99999;
  border-top-color: #ccc;
  /* -webkit-transition: all 0.2s;*/
}

#poiList {
  -webkit-overflow-scrolling: touch;
  width: 100%;
  height: 100%;
  overflow: scroll;
  position: relative;
  background: #fff;
}

#poiList .amap_lib_placeSearch {
  border: none;
}

#panel.hidden {
  height: 0;
  top: 1px;
}

#panel.hidden #showHideBtn:after {
  /*  -webkit-transform: rotate(180deg);
-webkit-transform-origin: 50% 4px;*/
  top: -5px;
  border-bottom-color: #ccc;
  border-top-color: transparent;
}

#panel .amap_lib_placeSearch .pageLink {
  font-size: 120%;
  margin: 0 3px;
}

#searchBox {
  position: fixed;
  width: 90%;
  margin: 0 auto;
  left: 0;
  right: 0;
  z-index: 999;
  top: 50px;
  height: 30px;
}

#tipinput {
  width: 100%;
  height: 30px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
  line-height: 30px;
  padding: 0 7px;
  box-sizing: border-box;
}

#clearSearchBtn {
  position: absolute;
  right: 0;
  top: 0;
  margin: auto;
  width: 20px;
  height: 20px;
  padding: 5px;
  text-align: center;
  vertical-align: middle;
  font-size: 14px;
  color: #999;
}

#clearSearchBtn .del {
  background: #eee;
  border-radius: 12px;
  width: 100%;
  height: 100%;
}

#page.searching #clearSearchBtn {
  display: none;
}

#loader {
  position: absolute;
  left: 50%;
  top: 50%;
  z-index: 1;
  margin: -75px 0 0 -75px;
  border: 16px solid #eee;
  border-radius: 50%;
  border-top: 16px solid #0b83ea;
  width: 120px;
  height: 120px;
  -webkit-animation: spin 2s linear infinite;
  animation: spin 2s linear infinite;
  display: none;
}

@-webkit-keyframes spin {
  0% {
    -webkit-transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
  }
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.searching #loader {
  display: block;
}

.searching #page {
  filter: grayscale(1);
  opacity: 0.5;
}

#panel.empty #showHideBtn {
  opacity: 0.5;
}

#emptyTip {
  display: none;
}

#panel.empty #emptyTip {
  display: block;
  position: relative;
  background: #fff;
  width: 100%;
  text-align: center;
  padding: 30px 0;
  color: #666;
}

.poi-more{
  display: none!important;
}
</style>

