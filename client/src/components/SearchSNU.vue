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
              <li>내당능장애-당뇨-정상:  {{dang.내당능장애}}명 / {{dang.당뇨}}명 / {{dang.정상}}명</li>
            </ul>
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
    </div>
    <h2 align="left">- 데이터 검색</h2>
    <v-data-table
      :headers="headers"
      :items="data"
      hide-actions
      class="elevator-1"
    >
      <template slot="items" slot-scope="props">
        <td>{{ props.item.바코드 }}</td>
        <td class="text-xs-right">{{ props.item.날짜 }}</td>
        <td class="text-xs-right">{{ props.item.고혈압 }}</td>
        <td class="text-xs-right">{{ props.item.당뇨 }}</td>
        <td class="text-xs-right">{{ props.item.당뇨병가족력 }}</td>
        <td class="text-xs-right">{{ props.item.암과거력 }}</td>
        <td class="text-xs-right">{{ props.item.약복용력 }}</td>
        <td class="text-xs-right">{{ props.item.여성호르몬제제_또는_경구피임제__복용한적_또는_현재복용중_여부 }}</td>
        <td class="text-xs-right">{{ props.item.내부_장기_맹장_제외__수술력 }}</td>
        <td class="text-xs-right">{{ props.item.음주량 }}</td>
        <td class="text-xs-right">{{ props.item.흡연 }}</td>
        <td class="text-xs-right">{{ props.item.HBsAg }}</td>
        <td class="text-xs-right">{{ props.item.Anti_HIV }}</td>
        <td class="text-xs-right">{{ props.item.Anti_HCV }}</td>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import { getDataSNU, getSummary } from '../file-upload.service'
export default {
  name: 'SearchSNU',
  data () {
    return {
      microPosts: [],
      headers: [
        {
          text: '바코드',
          align: 'left',
          sortable: false,
          value: '바코드'
        },
        {text: '날짜', value: '날짜'},
        { text: '고혈압', value: '고혈압' },
        { text: '당뇨', value: '당뇨' },
        { text: '당뇨병 가족력', value: '당뇨병가족력' },
        { text: '암과거력', value: '암과거력' },
        { text: '약복용력', value: '약복용력' },
        { text: '여성호르몬제제(또는 경구피임제) 복용한적 또는 현재복용중 여부', value: '여성호르몬제제_또는_경구피임제__복용한적_또는_현재복용중_여부' },
        { text: '내부 장기(맹장 제외) 수술력', value: '내부_장기_맹장_제외__수술력' },
        { text: '음주량', value: '음주량' },
        { text: '흡연', value: '흡연' },
        { text: 'HBsAg', value: 'HBsAg' },
        { text: 'Anti-HIV', value: 'Anti_HIV' },
        { text: 'Anti_HCV', value: 'Anti_HCV' }
      ],
      data: [],
      summary: [],
      supercontrol: [],
      na: [],
      dang: [],
      errors: []
    }
  },
  created () {
    getDataSNU()
      .then(res => {
        this.data = res.data
        console.log(this.data)
      })
      .catch(e => {
        this.errors.push(e)
      })
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
    width: 400px;
    margin: 4px;
    display: inline-block;
    vertical-align: top;
  }
  #visualElement{
    width: 200px;
    height: 50%;
  }
</style>
