<template>
  <LytMain>
    <a-row :gutter="10">
      <a-col :span="18" class="flex flex-col space-y-3">
        <div class="w-full h-56 text-center leading-56 align-middle bg-primary text-white cursor-pointer">
          放投票规则
        </div>
        <a-button
          v-if="false"
          class="w-full"
          @click="EdtAtclEmitter.emit('update:show', { show: true })"
        >
          添加作品
        </a-button>
        <ComToolbx />
        <a-row :gutter="10">
          <a-col :span="8" v-for="article in articles" :key="article.key">
            <ComArticle :article="article" @refresh="refresh" />
          </a-col>
        </a-row>
      </a-col>
      <a-col :span="6">
        <ComRank :articles="articles" />
      </a-col>
    </a-row>
  </LytMain>
  <FormDialog
    title="增加/修改作品"
    width="40vw"
    :emitter="EdtAtclEmitter"
    :mapper="EdtAtclMapper"
    :copy="Article.copy"
    @submit="onArticleSubmit"
  />
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive } from 'vue'
import LytMain from '../layouts/LytMain.vue'
import api from '../api'
import Article from '@/types/article'
import ComArticle from '../components/ComArticle.vue'
import FormDialog from '@/components/com/FormDialog.vue'
import { EdtAtclEmitter, EdtAtclMapper } from './Home'
import { useStore } from 'vuex'
import ComRank from '../components/ComRank.vue'
import ComToolbx from '../components/ComToolbx.vue'

export default defineComponent({
  name: 'Home',
  components: {
    LytMain,
    ComArticle,
    ComRank,
    ComToolbx,
    FormDialog
  },
  setup() {
    const store = useStore()
    const articles = reactive([] as Article[])

    onMounted(refresh)

    async function refresh() {
      await store.dispatch('refresh')
      articles.splice(0, articles.length, ...(await api.article.all({ copy: Article.copy })))
    }
    async function onArticleSubmit(article: Article, next: () => void) {
      await api.article.add(article)
      next()
      await refresh()
    }
    return {
      Article,

      articles,
      EdtAtclMapper,
      EdtAtclEmitter,

      refresh,
      onArticleSubmit
    }
  }
})
</script>
