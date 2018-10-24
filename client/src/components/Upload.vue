<template>
  <div class="container">
    <!--UPLOAD-->
    <form enctype="multipart/form-data" novalidate v-if="isInitial || isSaving">
      <h1>데이터 입력하기</h1>
      <div class="dropbox">
        <input type="file" :name="uploadFieldName" :disabled="isSaving" @change="filesChange($event.target.name, $event.target.files); fileCount = $event.target.files.length" accept="image/*, .csv, .xls, .xlsx" class="input-file">
        <p class="status" v-if="isInitial">
          입력할 데이터 파일을 선택해주세요
        </p>
        <p class="status" v-if="isSaving">
          Uploading {{ fileCount }} files...
        </p>
      </div>
    </form>
    <!--SUCESS-->
    <div v-if="isSuccess">
      <h2> Uploaded {{ uploadedFiles.length }} files successfully.</h2>
      <p>
        <a href="javascript:void(0)" @click="reset()">Upload again</a>
      </p>
    </div>
    <!--FAILED-->
    <div v-if="isFailed">
      <h2>Uploaded failed.</h2>
      <p>
        <a href="javascript:void(0)" @click="reset()">Try again</a>
      </p>
      <pre>{{ uploadError }}</pre>
    </div>
  </div>
</template>

<script>
import { upload2 } from '../file-upload.service'

const STATUS_INITIAL = 0
const STATUS_SAVING = 1
const STATUS_SUCCESS = 2
const STATUS_FAILED = 3

export default {
  name: 'Upload',
  data () {
    return {
      uploadedFiles: [],
      uploadError: null,
      currentStatus: null,
      uploadFieldName: 'file'
    }
  },
  computed: {
    isInitial () {
      return this.currentStatus === STATUS_INITIAL
    },
    isSaving () {
      return this.currentStatus === STATUS_SAVING
    },
    isSuccess () {
      return this.currentStatus === STATUS_SUCCESS
    },
    isFailed () {
      return this.currentStatus === STATUS_FAILED
    }
  },
  methods: {
    reset () {
      // reset form to initial state
      this.currentStatus = STATUS_INITIAL
      this.uploadedFiles = []
      this.uploadError = null
    },
    save (formData) {
      // upload data to the server
      this.currentStatus = STATUS_SAVING

      upload2(formData)
        .then((x) => {
          this.uploadedFiles = [].concat(x)
          this.currentStatus = STATUS_SUCCESS
        })
        .catch(err => {
          this.uploadError = err.response
          this.currentStatus = STATUS_FAILED
        })
    },
    filesChange (fieldName, fileList) {
      // handle file changes
      const formData = new FormData()

      if (!fileList.length) return

      // append the files to FormData
      Array
        .from(Array(fileList.length).keys())
        .map(x => {
          formData.append(fieldName, fileList[x])
        })

      // save it
      this.save(formData)
    }
  },
  mounted () {
    this.reset()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
  // .dropbox {
  //   width: 100%;
  //   outline: 2px dashed grey; /* the dash box */
  //   outline-offset: -10px;
  //   background: lightcyan;
  //   color: dimgray;
  //   padding: 10px 10px;
  //   height: 200px; /* minimum height */
  //   position: relative;
  //   cursor: pointer;
  // }

  // .input-file {
  //   opacity: 0; /* invisible but it's there! */
  //   width: 100%;
  //   float:left;
  //   box-sizing: border-box;
  //   height: 200px;
  //   padding-left: 0px;
  //   margin-left: 0px;
  //   cursor: pointer;
  //   position: relative;
  // }

  .dropbox:hover {
    background: lightblue; /* when mouse over to the drop zone, change color */
  }

  .dropbox p {
    position: absolute;
    left: 30%;
    font-size: 1.2em;
    text-align: center;
    padding: 50px 0;
  }
</style>
