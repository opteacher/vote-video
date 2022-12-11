<template>
  <a-layout class="h-full flex flex-col">
    <a-layout-header class="bg-primary px-56 flex items-center justify-between text-white">
      <a class="flex items-center space-x-10" href="/">
        <img class="w-44" src="https://gaj.sh.gov.cn/jdga/resource/img/jdga.png" />
        <h1 class="text-white">分局投票</h1>
      </a>
      <a-space>
        <laptop-outlined />
        <div v-if="store.state.votable">未投票</div>
        <div v-else>已投票</div>
      </a-space>
    </a-layout-header>
    <a-layout-content class="flex-auto px-56 py-3 bg-transparent overflow-x-hidden overflow-y-auto">
      <slot />
    </a-layout-content>
    <a-layout-footer class="bg-footer px-56 text-white">Footer</a-layout-footer>
  </a-layout>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useStore } from 'vuex'
import { LaptopOutlined } from '@ant-design/icons-vue'

export default defineComponent({
  name: 'LytMain',
  components: {
    LaptopOutlined
  },
  setup() {
    const store = useStore()
    return {
      store
    }
  }
})
</script>
