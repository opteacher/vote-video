import { message } from 'ant-design-vue'
import axios, { AxiosRequestConfig } from 'axios'
import qs from 'qs'

export interface RequestOptions {
  project?: string
  type?: string
  middles?: {
    before?: () => void
    after?: (resp: any) => void
  }
  messages?: {
    notShow?: boolean
    loading?: string
    succeed?: string
    failed?: string
  }
  ignores?: string[]
  axiosConfig?: AxiosRequestConfig<any>
  copy?: (src: any, tgt?: any) => any
  orgRes?: boolean
}

export async function makeRequest(pms: Promise<any>, options?: RequestOptions): Promise<any> {
  if (!options) {
    options = {}
  }
  if (!options.middles) {
    options.middles = {}
  }
  if (!options.messages) {
    options.messages = {}
  }
  options.middles.before && options.middles.before()
  if (!options.messages.notShow) {
    message.loading(options.messages.loading || '加载中……')
  }
  let resp = await pms
  if (!options.orgRes) {
    resp = resp.data
  }
  if (!options.messages.notShow) {
    message.destroy()
  }
  options.middles.after && options.middles.after(resp)
  let result = resp
  if (options.orgRes) {
    result = resp
  } else if (typeof resp.result !== 'undefined') {
    result = resp.result
  } else if (typeof resp.data !== 'undefined') {
    result = resp.data
  }
  if (resp.error || result.error) {
    if (!options.messages.notShow && options.messages.failed) {
      message.error(options.messages.failed)
    } else {
      message.error(resp.error || result.error)
    }
  } else {
    if (!options.messages.notShow && options.messages.succeed) {
      message.success(options.messages.succeed)
    } else if (result.message) {
      message.success(result.message)
    }
  }
  return Promise.resolve(result)
}

function reqType(options?: RequestOptions): string {
  return options && options.type ? options.type : 'mdl'
}

export const baseURL =
  typeof process.env.BASE_URL !== 'undefined'
    ? process.env.BASE_URL.endsWith('/')
      ? process.env.BASE_URL.substring(0, process.env.BASE_URL.length - 1)
      : process.env.BASE_URL
    : 'http://vote-video:9054'

export async function reqAll(path: string, options?: RequestOptions): Promise<any> {
  if (!options) {
    options = {}
  }
  if (!options.project) {
    options.project = ''
  } else {
    options.project = fixStartsWith(options.project, '/')
  }
  if (typeof options.orgRes === 'undefined') {
    options.orgRes = false
  }
  if (!options.messages) {
    options.messages = {}
  }
  if (!options.messages.loading) {
    options.messages.loading = '查询中……'
  }
  if (!options.messages.succeed) {
    options.messages.succeed = '查询成功！'
  }
  const result = await makeRequest(
    axios.get(
      `${baseURL}${options.project}/${reqType(options)}/v1/${path}/s`,
      options.axiosConfig && options.axiosConfig.params
        ? Object.assign(options.axiosConfig, {
            paramsSerializer: (params: any) => qs.stringify(params, { indices: false })
          })
        : undefined
    ),
    options
  )
  return result.map((item: any) => (options && options.copy ? options.copy(item) : item))
}

export async function reqGet(path: string, iden?: any, options?: RequestOptions): Promise<any> {
  if (!options) {
    options = {}
  }
  if (!options.project) {
    options.project = ''
  } else {
    options.project = fixStartsWith(options.project, '/')
  }
  if (typeof options.orgRes === 'undefined') {
    options.orgRes = false
  }
  if (!options.messages) {
    options.messages = {}
  }
  if (!options.messages.loading) {
    options.messages.loading = '查询中……'
  }
  if (!options.messages.succeed) {
    options.messages.succeed = '查询成功！'
  }
  const result = await makeRequest(
    axios.get(
      `${baseURL}${options.project}/${reqType(options)}/v1/${path}${iden ? '/' + iden : ''}`,
      options.axiosConfig && options.axiosConfig.params
        ? Object.assign(options.axiosConfig, {
            paramsSerializer: (params: any) => qs.stringify(params, { indices: false })
          })
        : undefined
    ),
    options
  )
  return options && options.copy ? options.copy(result) : result
}

export function reqPost(path: string, body?: any, options?: RequestOptions): Promise<any> {
  if (!options) {
    options = {}
  }
  if (!options.project) {
    options.project = ''
  } else {
    options.project = fixStartsWith(options.project, '/')
  }
  if (typeof options.orgRes === 'undefined') {
    options.orgRes = false
  }
  if (!options.messages) {
    options.messages = {}
  }
  if (!options.messages.loading) {
    options.messages.loading = '提交中……'
  }
  if (!options.messages.succeed) {
    options.messages.succeed = '提交成功！'
  }
  if (!options.ignores) {
    options.ignores = ['key']
  } else if (!options.ignores.includes('key')) {
    options.ignores.push('key')
  }
  return makeRequest(
    axios.post(
      `${baseURL}${options.project}/${reqType(options)}/v1/${path}`,
      body ? pickOrIgnore(body, options.ignores) : undefined,
      options.axiosConfig
    ),
    options
  )
}

export function reqDelete(path: string, iden: any, options?: RequestOptions): Promise<any> {
  if (!options) {
    options = {}
  }
  if (!options.project) {
    options.project = ''
  } else {
    options.project = fixStartsWith(options.project, '/')
  }
  if (typeof options.orgRes === 'undefined') {
    options.orgRes = false
  }
  if (!options.messages) {
    options.messages = {}
  }
  if (!options.messages.loading) {
    options.messages.loading = '删除中……'
  }
  if (!options.messages.succeed) {
    options.messages.succeed = '删除成功！'
  }
  return makeRequest(
    axios.delete(
      `${baseURL}${options.project}/${reqType(options)}/v1/${path}/${iden}`,
      options.axiosConfig && options.axiosConfig.params
        ? Object.assign(options.axiosConfig, {
            paramsSerializer: (params: any) => qs.stringify(params, { indices: false })
          })
        : undefined
    ),
    options
  )
}

export function reqPut(
  path: string,
  iden: any,
  body?: any,
  options?: RequestOptions
): Promise<any> {
  if (!options) {
    options = {}
  }
  if (!options.project) {
    options.project = ''
  } else {
    options.project = fixStartsWith(options.project, '/')
  }
  if (typeof options.orgRes === 'undefined') {
    options.orgRes = false
  }
  if (!options.messages) {
    options.messages = {}
  }
  if (!options.messages.loading) {
    options.messages.loading = '提交中……'
  }
  if (!options.messages.succeed) {
    options.messages.succeed = '提交成功！'
  }
  if (!options.ignores) {
    options.ignores = ['key']
  } else if (!options.ignores.includes('key')) {
    options.ignores.push('key')
  }
  return makeRequest(
    axios.put(
      `${baseURL}${options.project}/${reqType(options)}/v1/${path}/${iden}`,
      body ? pickOrIgnore(body, options.ignores) : undefined,
      options.axiosConfig
    ),
    options
  )
}

export function reqLink(
  body: {
    parent: [string, any]
    child: [string, any]
  },
  link = true,
  options?: RequestOptions
): Promise<any> {
  if (!options) {
    options = {}
  }
  if (!options.project) {
    options.project = ''
  } else {
    options.project = fixStartsWith(options.project, '/')
  }
  if (typeof options.orgRes === 'undefined') {
    options.orgRes = false
  }
  if (!options.messages) {
    options.messages = {}
  }
  if (!options.messages.loading) {
    options.messages.loading = '提交中……'
  }
  if (!options.messages.succeed) {
    options.messages.succeed = '提交成功！'
  }
  const url = [
    `${baseURL}${options.project}/${reqType(options)}/v1`,
    body.parent[0],
    body.parent[1],
    body.child[0],
    body.child[1]
  ].join('/')
  if (link) {
    return makeRequest(axios.put(url, options.axiosConfig), options)
  } else {
    return makeRequest(axios.delete(url, options.axiosConfig), options)
  }
}

export function getProperty(obj: any, props: string | string[]): any {
  if (typeof props === 'string') {
    props = props.split('.')
  }
  for (const prop of props) {
    if (!obj) {
      return null
    } else if (obj instanceof Array && prop.startsWith('[') && prop.endsWith(']')) {
      const key = prop.substring(1, prop.length - 1)
      obj = obj.find(el => el.key === key)
    } else if (prop in obj) {
      obj = obj[prop]
    } else {
      return null
    }
  }
  return obj
}

export function pickOrIgnore(obj: { [key: string]: any }, attrs: string[], ignore = true): any {
  return Object.fromEntries(
    Object.entries(obj).filter(([key]) => (ignore ? !attrs.includes(key) : attrs.includes(key)))
  )
}

export async function until(cdFun: () => boolean, lpLimit = 500) {
  for (let i = 0; i < lpLimit; ++i) {
    if (cdFun()) {
      return Promise.resolve()
    }
    await new Promise(res => setTimeout(res, 200))
  }
  return Promise.reject()
}

export async function waitFor(
  iden: string,
  options: {
    reqFun?: (el: any) => boolean
    loop?: number
    getBy?: 'id' | 'name'
  } = {}
) {
  if (!options.reqFun) {
    options.reqFun = () => true
  }
  if (!options.loop) {
    options.loop = 500
  }
  if (!options.getBy) {
    options.getBy = 'id'
  }
  let ret = null
  for (let i = 0; i < options.loop; ++i) {
    if (options.getBy === 'id') {
      ret = document.getElementById(iden)
    } else if (options.getBy === 'name') {
      ret = document.getElementsByName(iden)
      if (!ret || !ret.length) {
        await new Promise(res => setTimeout(res, 200))
        continue
      } else {
        ret = ret[0]
      }
    }
    if (ret) {
      if (options.reqFun(ret)) {
        return Promise.resolve(ret)
      }
    }
    await new Promise(res => setTimeout(res, 200))
  }
  return Promise.resolve(ret)
}

export function fixStartsWith(text: string, prefix: string) {
  return (text.substring(0, prefix.length) !== prefix ? prefix : '') + text
}

export function rmvStartsOf(text: string, prefix: string) {
  return text.substring(0, prefix.length) === prefix ? text.substring(prefix.length) : text
}

export function endsWith(text: string, suffix: string) {
  return text.toString().slice(-suffix.length) === suffix
}

export function fmtStrByObj(pattern: RegExp, obj: any, str: string) {
  let ret = str
  for (let result = pattern.exec(str); result; result = pattern.exec(str)) {
    ret = ret.replace(
      result[0] + ' ',
      getProperty(obj, result[0].substring(result[0].startsWith('@') ? 1 : 2))
    )
  }
  return ret
}

export function upperFirst(text: string): string {
  if (!text.length) {
    return ''
  }
  const char = text.charCodeAt(0)
  if (char >= 97 && char <= 122) {
    return String.fromCharCode(char - 32) + text.substring(1)
  }
  return text
}

export function lowerFirst(text: string): string {
  if (!text.length) {
    return ''
  }
  const char = text.charCodeAt(0)
  if (char >= 65 && char <= 90) {
    return String.fromCharCode(char + 32) + text.substring(1)
  }
  return text
}

export function charInc(str: string): string {
  if (!str.length) {
    return str
  }
  if (Array.from(str).every(c => c === 'Z')) {
    return new Array(str.length + 1).fill('A').join('')
  }
  if (str[str.length - 1] === 'Z') {
    return charInc(str.slice(0, -1)) + 'A'
  } else {
    return str.slice(0, -1) + String.fromCharCode(str.charCodeAt(str.length - 1) + 1)
  }
}

export function revsKeyVal(obj: any) {
  return Object.fromEntries(Object.entries(obj).map(([key, val]) => [val, key]))
}
