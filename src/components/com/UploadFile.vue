<template>
  <a-dropdown class="w-full" :disabled="validConds(valState, field.disabled) || !editable">
    <a-button>
      <template #icon><UploadOutlined /></template>
      选择上传的文件或文件夹
    </a-button>
    <template #overlay>
      <a-upload
        name="file"
        :multiple="false"
        :directory="uploadDir"
        :showUploadList="false"
        v-model:file-list="valState"
        :action="field.path"
        :headers="field.headers"
        @change="onUploadChange"
        :beforeUpload="field.onBeforeUpload"
      >
        <a-menu @click="onUploadClicked">
          <a-menu-item key="file">
            <FileAddOutlined />
            &nbsp;上传文件
          </a-menu-item>
          <a-menu-item key="folder">
            <FolderAddOutlined />
            &nbsp;上传文件夹
          </a-menu-item>
        </a-menu>
      </a-upload>
    </template>
  </a-dropdown>
  <a-list v-show="valState.length" class="mt-1.5" size="small" :data-source="valState">
    <template #renderItem="{ item: file }">
      <a-list-item>
        {{ file.originFileObj.webkitRelativePath || file.name }}
      </a-list-item>
    </template>
  </a-list>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue'
import { UploadOutlined, FileAddOutlined, FolderAddOutlined } from '@ant-design/icons-vue'
import { validConds } from './utils'

export default defineComponent({
  name: 'UploadFile',
  components: {
    UploadOutlined,
    FileAddOutlined,
    FolderAddOutlined
  },
  emits: ['update:value'],
  props: {
    field: { type: Object, required: true },
    form: { type: Object, required: true },
    value: { type: Object, required: true },
    editable: { type: Boolean, default: true }
  },
  setup(props, { emit }) {
    const uploadDir = ref(false)
    const valState = ref(props.value)

    watch(
      () => props.value,
      () => {
        valState.value = props.value
      }
    )

    function onUploadClicked(item: { key: string }) {
      uploadDir.value = item.key === 'folder'
    }
    function onUploadChange({ file }: { file: any }) {
      if (props.field.onChange) {
        props.field.onChange(props.form, file)
      }
      if (file.status === 'done') {
        emit('update:value', valState.value)
      }
    }
    return {
      uploadDir,
      valState,

      validConds,
      onUploadClicked,
      onUploadChange
    }
  }
})
</script>
