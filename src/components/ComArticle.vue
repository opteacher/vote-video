<template>
  <a-card hoverable class="w-full mb-2.5">
    <template #cover>
      <img alt="example" :src="article.cover" />
    </template>
    <a-card-meta :title="article.title">
      <template #description>www.instagram.com</template>
    </a-card-meta>
  </a-card>
</template>

<script lang="ts">
import Article from '@/types/article'
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'ComArticle',
  props: {
    article: { type: Article, required: true }
  }
})
</script>
