export default class Article {
  key: string
  // 标题
  title: string
  // 视频URL
  video: string
  // 封面URL
  cover: string

  constructor() {
    this.key = ''
    this.title = ''
    this.video = ''
    this.cover = ''
  }

  reset() {
    this.key = ''
    this.title = ''
    this.video = ''
    this.cover = ''
  }

  static copy(src: any, tgt?: Article, force = false): Article {
    tgt = tgt || new Article()
    tgt.key = force ? (src.key || src.id || src._id) : (src.key || src.id || src._id || tgt.key)
    tgt.title = force ? src.title : (src.title || tgt.title)
    tgt.video = force ? src.video : (src.video || tgt.video)
    tgt.cover = force ? src.cover : (src.cover || tgt.cover)
    return tgt
  }
}
