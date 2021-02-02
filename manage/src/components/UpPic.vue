<template>
  <div>
    <el-upload
      class="avatar-uploader"
      :http-request="updata"
      :action="upurl"
      :show-file-list="false"
      :on-success="handleAvatarSuccess"
      :before-upload="beforeAvatarUpload"
    >
      <img v-if="imageUrl" :src="imageUrl" class="avatar">
      <i v-else class="el-icon-plus avatar-uploader-icon" />
    </el-upload>
  </div>
</template>

<script>
import { upPic } from '@/api/uppic'

export default {
  name: 'UnPic',
  props: {
    imageUrl: {
      default: ''
    }
  },
  data() {
    return {
      upurl: process.env.VUE_APP_BASE_API + '/upload/brandPic'
    }
  },
  methods: {
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw)
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    },
    updata(file) {
      const formData = new FormData()
      formData.append('brand_pic', file.file)
      upPic(formData).then(r => {
        if (!r.errno) {
          this.$emit('update:imageUrl', r.data.fileUrl)
          this.$message.success('上传成功！')
        }
        return true
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409EFF;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 50px;
  height: 50px;
  line-height: 50px;
  text-align: center;
}
.avatar {
  width: 160px;
  max-width: 100%;
  display: block;
}
</style>
