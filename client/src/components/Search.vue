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
    <md-table>
      <md-table-row>
        <md-table-head md-numeric>ID</md-table-head>
        <md-table-head>Name</md-table-head>
        <md-table-head>Email</md-table-head>
        <md-table-head>Gender</md-table-head>
        <md-table-head>Job Title</md-table-head>
      </md-table-row>

      <md-table-row>
        <md-table-cell md-numeric>1</md-table-cell>
        <md-table-cell>Shawna Dubbin</md-table-cell>
        <md-table-cell>sdubbin0@geocities.com</md-table-cell>
        <md-table-cell>Male</md-table-cell>
        <md-table-cell>Assistant Media Planner</md-table-cell>
      </md-table-row>

      <md-table-row>
        <md-table-cell md-numeric>2</md-table-cell>
        <md-table-cell>Odette Demageard</md-table-cell>
        <md-table-cell>odemageard1@spotify.com</md-table-cell>
        <md-table-cell>Female</md-table-cell>
        <md-table-cell>Account Coordinator</md-table-cell>
      </md-table-row>

      <md-table-row>
        <md-table-cell md-numeric>3</md-table-cell>
        <md-table-cell>Vera Taleworth</md-table-cell>
        <md-table-cell>vtaleworth2@google.ca</md-table-cell>
        <md-table-cell>Male</md-table-cell>
        <md-table-cell>Community Outreach Specialist</md-table-cell>
      </md-table-row>
      <md-table-row>
        <md-table-cell md-numeric>3</md-table-cell>
        <md-table-cell>Vera Taleworth</md-table-cell>
        <md-table-cell>vtaleworth2@google.ca</md-table-cell>
        <md-table-cell>Male</md-table-cell>
        <md-table-cell>Community Outreach Specialist</md-table-cell>
      </md-table-row>
      <md-table-row>
        <md-table-cell md-numeric>3</md-table-cell>
        <md-table-cell>Vera Taleworth</md-table-cell>
        <md-table-cell>vtaleworth2@google.ca</md-table-cell>
        <md-table-cell>Male</md-table-cell>
        <md-table-cell>Community Outreach Specialist</md-table-cell>
      </md-table-row>
      <md-table-row>
        <md-table-cell md-numeric>3</md-table-cell>
        <md-table-cell>Vera Taleworth</md-table-cell>
        <md-table-cell>vtaleworth2@google.ca</md-table-cell>
        <md-table-cell>Male</md-table-cell>
        <md-table-cell>Community Outreach Specialist</md-table-cell>
      </md-table-row>
      <md-table-row>
        <md-table-cell md-numeric>3</md-table-cell>
        <md-table-cell>Vera Taleworth</md-table-cell>
        <md-table-cell>vtaleworth2@google.ca</md-table-cell>
        <md-table-cell>Male</md-table-cell>
        <md-table-cell>Community Outreach Specialist</md-table-cell>
      </md-table-row>
      <md-table-row>
        <md-table-cell md-numeric>3</md-table-cell>
        <md-table-cell>Vera Taleworth</md-table-cell>
        <md-table-cell>vtaleworth2@google.ca</md-table-cell>
        <md-table-cell>Male</md-table-cell>
        <md-table-cell>Community Outreach Specialist</md-table-cell>
      </md-table-row>
      <md-table-row>
        <md-table-cell md-numeric>3</md-table-cell>
        <md-table-cell>Vera Taleworth</md-table-cell>
        <md-table-cell>vtaleworth2@google.ca</md-table-cell>
        <md-table-cell>Male</md-table-cell>
        <md-table-cell>Community Outreach Specialist</md-table-cell>
      </md-table-row>
      <md-table-row>
        <md-table-cell md-numeric>3</md-table-cell>
        <md-table-cell>Vera Taleworth</md-table-cell>
        <md-table-cell>vtaleworth2@google.ca</md-table-cell>
        <md-table-cell>Male</md-table-cell>
        <md-table-cell>Community Outreach Specialist</md-table-cell>
      </md-table-row>
    </md-table>
  </div>
</template>

<script>
export default {
  name: 'Search',
  data () {
    return {
      microPosts: [],
      error: ''
    }
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
