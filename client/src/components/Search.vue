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
            - 총 데이터 수: 200000 개 <hr>
            - 평균 연령: 45세 <hr>
            - 평균 방문 횟수: 3.3회 <hr>
          </md-card-content>
        </md-ripple>
      </md-card>
    </div>
    <div class="md-layout" id="visualization">
      <md-card md-with-hover id="visualElement">
        <img src="https://cdn0.iconfinder.com/data/icons/data-visualization-color-1/64/line-graph-data-visualisation-512.png" alt="Skyscraper">
      </md-card>
      <md-card md-with-hover id="visualElement">
        <img src="https://cdn0.iconfinder.com/data/icons/data-visualization-color-1/64/line-graph-data-visualisation-512.png" alt="Skyscraper">
      </md-card>
      <md-card md-with-hover id="visualElement">
        <img src="https://cdn0.iconfinder.com/data/icons/data-visualization-color-1/64/line-graph-data-visualisation-512.png" alt="Skyscraper">
      </md-card>
      <md-card md-with-hover id="visualElement">
        <img src="https://cdn0.iconfinder.com/data/icons/data-visualization-color-1/64/line-graph-data-visualisation-512.png" alt="Skyscraper">
      </md-card>
      <md-card md-with-hover id="visualElement">
        <img src="https://cdn0.iconfinder.com/data/icons/data-visualization-color-1/64/line-graph-data-visualisation-512.png" alt="Skyscraper">
      </md-card>
      <md-card md-with-hover id="visualElement">
        <img src="https://cdn0.iconfinder.com/data/icons/data-visualization-color-1/64/line-graph-data-visualisation-512.png" alt="Skyscraper">
      </md-card>
    </div>
    <h2 align="left">- 데이터 검색</h2>
    <v-data-table 
      :headers="headers"
      :items="data"
      hide-actions
      class="elevator-1"
    >
      <template slot="items" slot-scope="props">
        <td>{{ props.item.NIHID }}</td>
        <td class="text-xs-right">{{ props.item.SEX }}</td>
        <td class="text-xs-right">{{ props.item.AGE }}</td>
        <td class="text-xs-right">{{ props.item.JOB }}</td>
        <td class="text-xs-right">{{ props.item.HEIGHT }}</td>
        <td class="text-xs-right">{{ props.item.WEIGHT }}</td>
        <td class="text-xs-right">{{ props.item.BMI }}</td>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import { getData } from '../file-upload.service'
export default {
  name: 'Search',
  data () {
    return {
      microPosts: [],
      headers: [
        {
          text: 'NIHID',
          align: 'left',
          sortable: false,
          value: 'NIHID'
        },
        { text: 'SEX', value: 'SEX' },
        { text: 'AGE', value: 'AGE' },
        { text: 'JOB', value: 'JOB' },
        { text: 'HEIGHT (cm)', value: 'HEIGHT'},
        { text: 'WEIGHT (kg)', value: 'WEIGHT'},
        { text: 'BMI', value: 'BMI'}
      ],
      data: [],
      errors: []
    }
  },
  created () {
    getData()
      .then(res => {
        this.data = res.data
        console.log(this.data)
      })
      .catch(e => {
        this.errors.push(e)
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
    width: 300px;
    margin: 4px;
    display: inline-block;
    vertical-align: top;
  }
  #visualElement{
    width: 200px;
    height: 50%;
  }
</style>
