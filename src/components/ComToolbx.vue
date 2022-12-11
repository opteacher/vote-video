<template>
  <div class="flex justify-between">
    <a-button type="link">
      <template #icon><search-outlined /></template>
    </a-button>
    <a-select v-model:value="order" class="w-32" :options="options" @change="onOrderChange">
      <template #suffixIcon><sort-descending-outlined class="ant-select-suffix" /></template>
    </a-select>
  </div>
</template>

<script lang="ts">
import { SearchOutlined, SortDescendingOutlined } from '@ant-design/icons-vue'
import { defineComponent, reactive, ref } from 'vue'

export default defineComponent({
  name: 'ComToolbx',
  components: {
    SearchOutlined,
    SortDescendingOutlined
  },
  setup() {
    const order = ref(undefined as string | undefined)
    const options = reactive([
      { label: '按标题排序', value: 'title' },
      { label: '按发表日期排序', value: 'time' },
      { label: '按票数排序', value: 'vote' }
    ])

    function onOrderChange() {
      console.log(order.value)
    }
    return {
      order,
      options,

      onOrderChange
    }
  }
})
</script>
