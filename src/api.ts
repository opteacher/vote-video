import Article from './types/article'
import Vote from './types/vote'
import { reqAll, reqGet, reqPost, RequestOptions } from './utils'

export default {
  client: () => reqGet('client', null, { type: 'api' }),
  article: {
    all: (options?: RequestOptions) => reqAll('article', Object.assign({ type: 'api' }, options || {})),
    add: (article: Article, options?: RequestOptions) => reqPost('article', article, options)
  },
  vote: {
    add: (vote: Vote, options?: RequestOptions) => reqPost('vote', vote, options)
  }
}
