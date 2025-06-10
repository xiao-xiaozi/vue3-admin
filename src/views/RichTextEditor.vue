<script setup>
import Editor from "@tinymce/tinymce-vue"

const initOptions = ref({
  promotion: false, // 隐藏右上角的 Get all features
  branding: false, // 隐藏右下角的 Build with tinyMCE
  language: 'zh_CN',
  // plugins: 'advlist anchor autolink charmap code fullscreen help image insertdatetime link lists media preview searchreplace table visualblocks wordcount',
  // toolbar: 'undo redo | styles | bold italic underline strikethrough | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image',
  plugins: 'advlist anchor autolink charmap code fullscreen help insertdatetime lists preview searchreplace table visualblocks wordcount',
  toolbar: 'undo redo | styles | bold italic underline strikethrough | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent',
  height: 700,
  resize: false
})

const dir = import.meta.env.VITE_APP_BASE  + "tinymce/tinymce.min.js"

</script>
<template>
  <editor
    id="uuid"
    api-key="no-api-key"
    license-key="gpl"
    :tinymce-script-src="dir"
    :init="initOptions" />
</template>