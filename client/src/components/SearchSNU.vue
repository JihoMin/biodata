<template>
  <div>
    <h1>데이터 조회하기</h1>
    <br>
    <h2 align="left">- 데이터 요약</h2>
    <div class="md-layout" id="dataSummary">
      <md-card md-with-hover>
        <md-ripple>
          <md-card-header>
            <div class="md-title">Summary</div>
          </md-card-header>
          <md-card-content align="left">
            <ul>
              <li>super-control:  {{supercontrol.super_control}}명</li> <br>
              <li>NAFLD(case/control):  {{na.NAFLD_case}}명 / {{na.NAFLD_control}}명</li> <br>
              <li>내당기능장애-당뇨-정상:  {{dang.내당능장애}}명 / {{dang.당뇨}}명 / {{dang.정상}}명</li>
            </ul>
          </md-card-content>
        </md-ripple>
      </md-card>
    </div>
    <div class="md-layout" id="visualization">
      <md-card md-with-hover id="visualElement">
        <md-card-header>
            <div class="md-title">체중</div>
        </md-card-header>
        <img src="../assets/fwd8curvechart/WEIGHT.png">
      </md-card>
      <md-card md-with-hover id="visualElement">
        <md-card-header>
            <div class="md-title">BMI</div>
        </md-card-header>
        <img src="../assets/fwd8curvechart/BMI.png">
      </md-card>
      <md-card md-with-hover id="visualElement">
        <md-card-header>
            <div class="md-title">혈당</div>
        </md-card-header>
        <img src="../assets/fwd8curvechart/GLUCOSE.png" alt="Skyscraper">
      </md-card>
      <md-card md-with-hover id="visualElement">
        <md-card-header>
            <div class="md-title">이완기 혈압</div>
        </md-card-header>
        <img src="../assets/fwd8curvechart/DBP.png">
      </md-card>
      <md-card md-with-hover id="visualElement">
        <md-card-header>
            <div class="md-title">수축기 혈압</div>
        </md-card-header>
        <img src="../assets/fwd8curvechart/SBP.png">
      </md-card>
      <md-card md-with-hover id="visualElement">
        <md-card-header>
            <div class="md-title">Total Cholesterol</div>
        </md-card-header>
        <img src="../assets/fwd8curvechart/TCHL.png" alt="Skyscraper">
      </md-card>
      <md-card md-with-hover id="visualElement">
        <md-card-header>
            <div class="md-title">HDL</div>
        </md-card-header>
        <img src="../assets/fwd8curvechart/HDL.png">
      </md-card>
      <md-card md-with-hover id="visualElement">
        <md-card-header>
            <div class="md-title">중성지방</div>
        </md-card-header>
        <img src="../assets/fwd8curvechart/TG.png">
      </md-card>
    </div>
    <br>
    <h2 align="left">- 데이터 검색</h2>
    <b-row>
      <b-col md="6" class="my-1">
        <b-pagination :total-rows="totalRows" :per-page="100" v-model="currentPage" class="my-0" />
      </b-col>
    </b-row>
    <b-table
      bordered
      striped
      hover
      :items="data"
      :fields="fields"
      :per-page="100"
      :current-page = "currentPage">
    </b-table>
  </div>
</template>

<script>
import { getDataSNU, getSummary } from '../file-upload.service'

export default {
  name: 'SearchSNU',
  data () {
    return {
      microPosts: [],
      data: [],
      summary: [],
      supercontrol: [],
      na: [],
      dang: [],
      fields: ['바코드', '날짜', '음주량', '흡연', 'HBsAg', 'Anti_HCV', 'WBC', 'RBC', 'HB', 'HCT'],
      currentPage: 1,
      totalRows: 1
      // errors: []
    }
  },
  methods: {
    getData () {
      getDataSNU()
        .then(res => {
          this.data = res.data
          console.log(this.data)
          this.totalRows = res.data.length
        })
        .catch(e => {
          this.errors.push(e)
        })
    },
    toLower (text) {
      return text.toString().toLowerCase()
    },
    searchByName (items, term) {
      if (term) {
        return items.filter(item => this.toLower(item.name).includes(this.toLower(term)))
      }
      return items
    }
  },
  created () {
    this.getData()
    getSummary()
      .then(res => {
        this.summary = res.data
        this.supercontrol = this.summary[0][0]
        this.na = this.summary[1][0]
        this.dang = this.summary[2][0]
        console.log(this.dang)
      })
      .catch(e => {
        this.error.push(e)
      })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .md-card-content {
    font-size: 20px;
  }
  .md-card {
    width: 500px;
    margin: 4px;
    display: inline-block;
    vertical-align: top;
  }
  #visualElement{
    width: 400px;
  }
  .md-field {
    max-width: 300px;
  }
</style>
