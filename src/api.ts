import Article from './types/article'
import { reqAll, reqGet, reqPost, RequestOptions } from './utils'

export default {
  all: (options?: RequestOptions) => reqAll('article', options),
  add: (article: Article, options?: RequestOptions) => reqPost('article', article, options),
}
