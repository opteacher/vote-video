<template>
  <a-card
    hoverable
    class="w-full mb-2.5"
    :bodyStyle="{ display: 'flex', 'align-items': 'center', padding: '1.25rem' }"
    @click="onAtclClick"
  >
    <template #cover>
      <img alt="example" :src="article.cover" />
    </template>
    <a-card-meta>
      <template #title>
        <div class="whitespace-normal">{{ article.title }}</div>
      </template>
      <template #description v-if="article.author">{{ article.author }}</template>
    </a-card-meta>
    <div class="flex-auto text-right">
      <a-tooltip title="你已经投过票了" color="#faad14">
        <a-button type="primary" danger @click.stop="onVoteClick" :disabled="!store.state.votable">
          <template #icon>
            <like-outlined />
            {{ article.vote }}
          </template>
          投票
        </a-button>
      </a-tooltip>
    </div>
  </a-card>
</template>

<script lang="ts">
import Article from '@/types/article'
import Vote from '@/types/vote'
import { createVNode, defineComponent } from 'vue'
import { ExclamationCircleOutlined, LikeOutlined } from '@ant-design/icons-vue'
import api from '../api'
import { Modal } from 'ant-design-vue'
import { useStore } from 'vuex'

export default defineComponent({
  name: 'ComArticle',
  components: {
    LikeOutlined
  },
  emits: ['refresh'],
  props: {
    article: { type: Article, required: true }
  },
  setup(props, { emit }) {
    const store = useStore()

    function onAtclClick() {
      window.open(props.article.video, '_blank')
    }
    function onVoteClick() {
      Modal.confirm({
        title: '确定投票给该作品吗？',
        icon: createVNode(ExclamationCircleOutlined),
        content: createVNode('div', { class: 'text-red' }, '每台机器只能投票一次！'),
        async onOk() {
          await api.vote.add(Vote.copy({ article: props.article.key, ip: store.state.ip }))
          emit('refresh')
        }
      })
    }
    return {
      store,

      onAtclClick,
      onVoteClick
    }
  }
})
</script>
