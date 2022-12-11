import Mapper from '@/types/mapper'
import { TinyEmitter as Emitter } from 'tiny-emitter'

export const EdtAtclEmitter = new Emitter()

export const EdtAtclMapper = new Mapper({
  title: {
    label: '标题',
    type: 'Input'
  },
  author: {
    label: '作者',
    type: 'Input'
  },
  video: {
    label: '视频链接',
    type: 'Input'
  },
  cover: {
    label: '封面链接',
    type: 'Input'
  }
})
