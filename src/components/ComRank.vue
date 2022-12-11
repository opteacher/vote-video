<template>
  <a-card :bordered="false" class="w-full" :bodyStyle="{ padding: 0 }" :headStyle="{ 'background-color': '#E10023', color: 'white' }">
    <template #title>
      <span><trophy-filled />&nbsp;排行榜</span>
    </template>
    <template #extra><a class="text-white hover:text-blue-400" href="/rank">更多作品</a></template>
    <a-list class="w-full" :data-source="sortAtcls">
      <template #renderItem="{ item: article }">
        <a-list-item class="hover:bg-gray-200 cursor-pointer px-5" @click="onRkItmClick(article)">
          <a-list-item-meta
            class="items-center flex-auto"
            :title="article.title"
            :description="article.author"
          >
            <template #avatar>
              <a-badge>
                <template #count><crown-filled /></template>
                <a-avatar :src="article.cover" />
              </a-badge>
            </template>
          </a-list-item-meta>
          <div class="text-right">
            <span class="text-red-500">
              <like-filled />
              &nbsp;{{ article.vote }}
            </span>
          </div>
        </a-list-item>
      </template>
    </a-list>
  </a-card>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import Article from '../types/article'
import { LikeFilled, CrownFilled, TrophyFilled } from '@ant-design/icons-vue'

export default defineComponent({
  name: 'ComRank',
  components: {
    LikeFilled,
    CrownFilled,
    TrophyFilled
  },
  props: {
    articles: { type: Array, required: true }
  },
  setup(props) {
    const sortAtcls = computed(() =>
      (props.articles as Article[]).sort((a, b) => a.vote - b.vote).slice(0, 10)
    )

    function onRkItmClick(article: Article) {
      window.open(article.video, '_blank')
    }
    return {
      sortAtcls,

      onRkItmClick
    }
  }
})
</script>
