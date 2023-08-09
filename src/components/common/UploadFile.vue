<template>
  <el-upload
    ref="uploadRef"
    v-model:file-list="filelist"
    class="upload"
    :disabled="disabled"
    :action="`${API}api/file/upload`"
    :headers="headers"
    :multiple="multiple"
    :limit="limit"
    :listType="listType"
    :accept="accept"
    :on-preview="handlePreview"
    :on-remove="handleRemove"
    :on-success="handleSuccess"
    :on-error="handleError"
    :on-progress="handleProgress"
    :on-change="handleChange"
    :on-exceed="handleExceed"
    :before-upload="beforeUpload"
    :before-remove="beforeRemove"
  >
    <slot />
  </el-upload>
</template>

<script setup lang="ts">
import type {
  UploadProps,
  UploadRawFile,
  UploadUserFile,
  UploadFile,
  UploadFiles,
  UploadProgressEvent,
  UploadInstance
} from 'element-plus'

interface Props {
  multiple?: boolean
  accept?: string
  disabled?: boolean
  limit?: number
  listType?: 'text' | 'picture' | 'picture-card'
  fileList?: UploadUserFile[] | undefined // 默认上传文件
}

// @ts-ignore
const API = import.meta.env.VITE_API_URL

const props = withDefaults(defineProps<Props>(), {
  multiple: true,
  accept: undefined,
  disabled: false,
  limit: undefined,
  listType: undefined,
  fileList: undefined
})

const uploadRef = ref<UploadInstance>()
const adminStore = useAdminStore()

const headers = {
  Authorization: adminStore.token
}

const filelist = computed({
  get() {
    return props.fileList
  },
  set(val) {
    return val
  }
})

const emit = defineEmits<{
  (e: 'upload', value: string, ref?: UploadInstance): void
  (e: 'uploadList', value: UploadFiles): void
}>()

/**
 * 文件预览钩子
 */
const handlePreview: UploadProps['onPreview'] = (uploadFile: UploadFile): void => {}

/**
 * 文件列表移除文件时的钩子
 */
const handleRemove: UploadProps['onRemove'] = (
  uploadFile: UploadFile,
  uploadFiles: UploadFiles
): void => {}

/**
 * 文件上传成功时的钩子
 */
const handleSuccess: UploadProps['onSuccess'] = (
  response: RES<{ path: string }>,
  uploadFile: UploadFile,
  uploadFiles: UploadFiles
): void => {
  if (response.code === 200) {
    ElMessage.success(response.msg)
    emit('upload', response.data.path, uploadRef.value)
    emit('uploadList', uploadFiles)
  } else {
    ElMessage.error(response.msg)
  }
}

/**
 * 文件上传失败时的钩子
 */
const handleError: UploadProps['onError'] = (
  error: any,
  uploadFile: UploadFile,
  uploadFiles: UploadFiles
): void => {
  ElMessage.error('上传失败,请检查后端存储配置是否最正常')
}

/**
 * 文件上传时钩子
 */
const handleProgress: UploadProps['onProgress'] = (
  evt: UploadProgressEvent,
  uploadFile: UploadFile,
  uploadFiles: UploadFiles
): void => {}

/**
 * 文件状态改变时的钩子，添加文件、上传成功和上传失败时都会被调用
 */
const handleChange: UploadProps['onChange'] = (
  uploadFile: UploadFile,
  uploadFiles: UploadFiles
): void => {}

/**
 * 当超出限制时，执行的钩子函数
 */
const handleExceed: UploadProps['onExceed'] = (
  files: File[],
  uploadFiles: UploadUserFile[]
): void => {
  ElMessage.warning(`最多只能上传${props.limit}个文件`)
}

/**
 * 上传文件之前的钩子，参数为上传的文件， 若返回false或者返回 Promise 且被 reject，则停止上传。
 */
const beforeUpload: UploadProps['beforeUpload'] = (rawFile: UploadRawFile) => {
  // console.log(rawFile);
}

/**
 * 删除文件之前的钩子，参数为上传的文件和文件列表， 若返回 false 或者返回 Promise 且被 reject，则停止删除。
 */
const beforeRemove: UploadProps['beforeRemove'] = (uploadFile, uploadFiles) => {
  return ElMessageBox.confirm(`确定删除文件 ${uploadFile.name} ?`, '删除文件', {
    confirmButtonText: '确认',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(
    () => true,
    () => false
  )
}
</script>

<style lang="scss" scoped>
.upload {
}
</style>
