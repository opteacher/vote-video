export default class Vote {
  key: string
  // 投票的IP
  ip: string
  // 作品ID
  article: string

  constructor() {
    this.key = ''
    this.ip = ''
    this.article = ''
  }

  reset() {
    this.key = ''
    this.ip = ''
    this.article = ''
  }

  static copy(src: any, tgt?: Vote, force = false): Vote {
    tgt = tgt || new Vote()
    tgt.key = force ? (src.key || src.id || src._id) : (src.key || src.id || src._id || tgt.key)
    tgt.ip = force ? src.ip : (src.ip || tgt.ip)
    tgt.article = force ? src.article : (src.article || tgt.article)
    return tgt
  }
}
