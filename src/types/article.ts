export default class Article {
  key: string
  // 标题
  title: string
  // 视频URL
  video: string
  // 封面URL
  cover: string
  // 作者
  author: string
  // 投票数（非数据库字段）
  vote: number

  constructor() {
    this.key = ''
    this.title = ''
    this.video = ''
    this.cover = ''
    this.author = ''
    this.vote = 0
  }

  reset() {
    this.key = ''
    this.title = ''
    this.video = ''
    this.cover = ''
    this.author = ''
    this.vote = 0
  }

  static copy(src: any, tgt?: Article, force = false): Article {
    tgt = tgt || new Article()
    tgt.key = force ? (src.key || src.id || src._id) : (src.key || src.id || src._id || tgt.key)
    tgt.title = force ? src.title : (src.title || tgt.title)
    tgt.video = force ? src.video : (src.video || tgt.video)
    tgt.cover = force ? src.cover : (src.cover || tgt.cover)
    tgt.author = force ? src.author : (src.author || tgt.author)
    tgt.vote = force ? src.vote : (src.vote || tgt.vote)
    return tgt
  }
}
