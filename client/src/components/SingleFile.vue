<template>
  <div class="container">
    <div class="large-12 medium-12 small-12 cell">
      <label>
        <input type="file" id="file" ref="file" v-on:change="handleFileUpload()"/>
      </label>
      <br>
      <progress max="100" :value.prop="uploadPercentage"></progress>
      <br>
      <button v-on:click="submitFile()">Submit</button>
    </div>
  </div>
</template>

<script>
import { upload2 } from '../file-upload.service'

export default {
  name: 'singleFile',
  data () {
    return {
      file: '',
      uploadPercentage: 0
    }
  },
  methods: {
    handleFileUpload () {
      this.file = this.$refs.file.files[0]
    },
    submitFile () {
      let formData = new FormData()
      formData.append('file', this.file)
      upload2(formData)
      /*
      axios.post('/single-file',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
      ).then(function (res) {
        console.log('SUCESS')
        console.log('res: ', res)
      }).catch(function (err) {
        console.log('FAILURE!!')
        console.log('post err: ', err)
      })
      */
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
