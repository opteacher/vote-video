<template>
  <LytMain>
    <a-button class="w-full" @click="onGenTestClick">生成</a-button>
    <a-row :gutter="10">
      <a-col :span="6" v-for="article in articles" :key="article.key">
        <ComArticle :article="article" />
      </a-col>
    </a-row>
  </LytMain>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive } from 'vue'
import LytMain from '../layouts/LytMain.vue'
import api from '../api'
import Article from '@/types/article'
import ComArticle from '../components/ComArticle.vue'
import { message } from 'ant-design-vue'
import axios from 'axios'

export default defineComponent({
  name: 'Home',
  components: {
    LytMain,
    ComArticle
  },
  setup() {
    const articles = reactive([] as Article[])

    onMounted(refresh)

    async function refresh() {
      articles.splice(0, articles.length, ...(await api.all({ copy: Article.copy })))
    }
    async function onGenTestClick() {
      var xhr = new XMLHttpRequest()
      xhr.open('GET', '/vote-video/cors/rand_image', true)
      xhr.onload = function () {
        console.log(xhr.responseURL) // http://example.com/test
      }
      xhr.send(null)
      // try {
      //   const resp = await axios.get('/vote-video/cors/rand_image')
      //   console.log(resp)
      // } catch (err: any) {
      //   console.log(err.toJSON())
      // }
      // for (let i = 0; i < 100; ++i) {
      //   await api.add(
      //     Article.copy({
      //       title: `测试作品 #${i}`,
      //       cover: 'https://api.ixiaowai.cn/gqapi/gqapi.php',
      //       video: ''
      //     })
      //   )
      // }
      message.success('This is a success message')
    }
    return {
      articles,

      onGenTestClick
    }
  }
})
</script>
