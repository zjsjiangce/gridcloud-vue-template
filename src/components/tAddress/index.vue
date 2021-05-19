<template>
  <div class="t-address">
    <div v-if="type==='input'">
      <Input v-model="lonLat" v-show="false" />
      <Input v-model="address" placeholder="根据地图定位读取" />
      <span class="icon" @click="showMap = !showMap" />
    </div>

    <!-- 地图容器 -->
    <div class="map-wrapper" v-if="type === 'simple'">
      <iframe
        :src="mapUrl"
        frameborder="0"
        class="select-point-iframe" />
    </div>

    <!-- 地图取点弹框 -->
    <drawer-modal
      width="680"
      v-model="showMap"
      title="地图定位"
      class="gis-modal">
      <iframe
        v-if="showMap"
        :src="mapUrl"
        frameborder="0"
        class="select-point-iframe" />
      <div slot="footer">
        <Button @click="showMap=false">取消</Button>
        <Button type="primary" @click="lonLat=localLonLat,showMap=false">保存</Button>
      </div>
    </drawer-modal>
</div>
</template>
<script>
import { http } from '@/lib/http'

export default {
  name: 'TAddress',
  props: {
    value: {
      type: [String, Object],
      default: '',
    },
    type: {
      type: String,
      default: 'input', //simple input
    },
    gispage: {
      type: String,
      default: 'select_point', //select_point show_point
    },
    orgCode: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      lonLat: '', //地图取点坐标
      address: '', //地图经纬度转地址
      localLonLat: '', //地图取点暂存坐标
      mapUrl: '',
      showMap: false,
    }
  },
  computed: {
    gisInfo() {
      const { nacosInfo } = this.$store.getters['globe/user/userInfo']
      const { gisInfo } = nacosInfo || { gisInfo: {}}
      return gisInfo
    },
    httpUrl() {
      return this.gisInfo.apiUrl
    },
    appUrl() {
      return this.gisInfo.gisUrl
    },
    appKey() {
      return this.gisInfo.appKey
    },
    currentOrg() {
      return this.$store.getters['globe/org/currentOrg']
    },
  },
  watch: {
    value: {
      handler(newVal) {
        if (typeof newVal === 'string') {
          this.lonLat = newVal
        } else {
          const { address, lonLat } = newVal
          this.address = address || ''
          this.lonLat = lonLat || ''
        }
      },
      deep: true,
    },
    address: {
      handler(newVal) {
        this.$emit('input', { lonLat: this.lonLat, address: newVal })
      },
      deep: true,
    },
    lonLat: {
      handler(newVal) {
        if (typeof this.value === 'string') {
          this.$emit('input', newVal)
        } else {
          // this.getAddressText()
          this.$emit('input', { lonLat: newVal, address: this.address })
        }
      },
      deep: true,
    },
  },
  mounted() {
    if (typeof this.value === 'string') {
      this.lonLat = this.value
    } else {
      const { address, lonLat } = this.value
      this.address = address || ''
      this.lonLat = lonLat || ''
    }

    const [lat, lon] = this.lonLat.split(',')
    const address = lat ? `&lat=${lon}&lon=${lat}` : ''
    // return `${this.appUrl}/tq-gis-data/index.html?appKey=${this.appKey}&orgCode=${this.orgCode ? this.orgCode : this.currentOrg.orgCode}#/iframe/${this.gispage}${address ? address : ''}`
    this.mapUrl = this.gispage === 'select_point' ?
      `${this.appUrl}/tq-gis-map-page/choose-point/index.html?appKey=${this.appKey}&orgCode=${this.orgCode ? this.orgCode : this.currentOrg.orgCode}${address ? address : ''}` :
      `${this.appUrl}/tq-gis-map-page/show-point/index.html?appKey=${this.appKey}${address}&zoom=10`

    window.onmessage = (event) => {
      if (!event.data) { return }
      const { target: { address, location }, type } = event.data
      if (type === 'getPoint') {
        if (this.type === 'input') {
          this.localLonLat = location.join(',')
          this.address = address
        } else {
          this.lonLat = location.join(',')
        }
      }
    }
  },
  methods: {
    // 经纬度转中文地址
    async getAddressText() {
      if (!this.lonLat) { return '' }
      const [lon, lat] = this.lonLat.split(',')
      const rst = await http.get(`${this.httpUrl}/web/appcloud/api/gis_data/geocode/getAddress`, { appKey: this.appKey, location: `${Number(lon).toFixed(6)},${Number(lat).toFixed(6)}` })
      this.address = rst.data
      this.$emit('input', { lonLat: this.lonLat, address: this.address })
    },
  },
}
</script>
<style lang="scss" scoped>
.t-address{
  height: 100%;
  &>div{
    position: relative;
  }
  .ivu-input-wrapper{
    width: 100%;
  }
  .icon{
    display: inline-block;
    width: 30px;
    height: 30px;
    background: #fff url('./img/map-address-icon.png') no-repeat center;
    background-size: 16px 16px;
    position: absolute;
    right: 1px;
    top: 1px;
    cursor: pointer;
  }

  .map-wrapper{
    width: 100%;
    height: 100%;
    z-index: 999;
    iframe{
      width: 100%;
      height: 100%;
    }
  }
}
</style>
<style lang="scss">
.gis-modal{
  .drawer-modal-content{
    padding: 0px;
    overflow: hidden;
    iframe{
      width: 100%;
      height: 100%;
    }
  }
}
</style>