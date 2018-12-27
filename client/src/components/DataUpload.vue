<template>
  <div class="container">
    <!--UPLOAD-->
    <b-form-file v-model="file" :state="Boolean(file)" placeholder="Choose a file..."></b-form-file>
    <b-form-file v-model="file" enctype="multipart/form-data" novalidate v-if="isInitial || isSaving">
      <h1>Upload images</h1>
      <div class="dropbox">
        <input type="file" multiple :name="uploadFieldName" :disabled="isSaving" @change="filesChange($event.target.name, $event.target.files); fileCount = $event.target.files.length" accept="image/*" class="input-file">
          <p v-if="isInitial">
            Drag your file(s) here to begin<br> or click to browse
          </p>
          <p v-if="isSaving">
            Uploading {{ fileCount }} files...
          </p>
      </div>
    </b-form-file>
  </div>
</template>

<!-- Javascript -->
<script>
export default {
  name: 'DataUpload',
  data () {
    return {
      microPosts: [],
      error: ''
    }
  }
}
</script>

<!-- SASS styling -->
<style lang="scss">
</style>
